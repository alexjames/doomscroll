import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { ProgressDots } from '../../../components/ProgressDots';
import { courses } from '../../../data/courses';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ReadingScreen() {
  const { courseId, sectionId } = useLocalSearchParams<{ courseId: string; sectionId: string }>();
  const { colors, isDark, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const course = courses.find((c) => c.id === courseId);
  const section = course?.sections.find((s) => s.id === sectionId);

  if (!course || !section) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Section not found</Text>
      </SafeAreaView>
    );
  }

  const pages = section.pages;
  const totalPages = pages.length;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / SCREEN_WIDTH);
    if (pageIndex !== currentPage && pageIndex >= 0 && pageIndex < totalPages) {
      setCurrentPage(pageIndex);
    }
  };

  const goToPage = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      scrollViewRef.current?.scrollTo({ x: pageIndex * SCREEN_WIDTH, animated: true });
      setCurrentPage(pageIndex);
    }
  };

  const handleExit = () => {
    router.back();
  };

  const handlePrevious = () => {
    goToPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage === totalPages - 1) {
      // Last page - go back to course
      router.back();
    } else {
      goToPage(currentPage + 1);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      {/* Top Bar */}
      <View style={[styles.topBar, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        <ProgressDots total={totalPages} current={currentPage} />
        <View style={styles.placeholder} />
      </View>

      {/* Page Content - Swipeable */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {pages.map((page, index) => (
          <View key={page.id} style={[styles.pageContainer, { width: SCREEN_WIDTH }]}>
            <ScrollView
              style={styles.pageScroll}
              contentContainerStyle={styles.pageScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Content Card */}
              <View style={[styles.contentCard, { backgroundColor: colors.card }]}>
                <Text style={[styles.categoryLabel, { color: colors.textMuted }]}>
                  {course.category}
                </Text>
                <Text style={[styles.sectionTitle, { color: colors.primary }]}>
                  {section.title}
                </Text>
                <Text style={[styles.pageIndicator, { color: colors.textMuted }]}>
                  Page {index + 1} / {totalPages}
                </Text>
              </View>

              {/* Page Content */}
              <View style={styles.contentBody}>
                <Text style={[styles.pageTitle, { color: colors.text }]}>{page.title}</Text>
                <Text style={[styles.pageContent, { color: colors.textSecondary }]}>
                  {page.content}
                </Text>
              </View>
            </ScrollView>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Bar */}
      <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="volume-high-outline" size={24} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="create-outline" size={24} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={[styles.fontSizeText, { color: colors.textMuted }]}>Aa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={toggleTheme}>
            <Ionicons
              name={isDark ? 'sunny-outline' : 'moon-outline'}
              size={24}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navButtons}>
          <TouchableOpacity
            style={[
              styles.navButton,
              { backgroundColor: colors.border },
              currentPage === 0 && styles.navButtonDisabled,
            ]}
            onPress={handlePrevious}
            disabled={currentPage === 0}
          >
            <Ionicons
              name="arrow-back"
              size={20}
              color={currentPage === 0 ? colors.textMuted : colors.text}
            />
            <Text
              style={[
                styles.navButtonText,
                { color: currentPage === 0 ? colors.textMuted : colors.text },
              ]}
            >
              Previous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, { backgroundColor: colors.primary }]}
            onPress={handleNext}
          >
            <Text style={styles.navButtonTextLight}>
              {currentPage === totalPages - 1 ? 'Finish' : 'Next'}
            </Text>
            <Ionicons
              name={currentPage === totalPages - 1 ? 'checkmark' : 'arrow-forward'}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  exitButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    flexGrow: 1,
  },
  pageContainer: {
    flex: 1,
  },
  pageScroll: {
    flex: 1,
  },
  pageScrollContent: {
    padding: 24,
  },
  contentCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  pageIndicator: {
    fontSize: 14,
  },
  contentBody: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  pageContent: {
    fontSize: 16,
    lineHeight: 26,
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 16,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontSizeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  navButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  navButtonTextLight: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
});
