import React, { useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { useStudy } from '@/context/StudyContext';
import { getSubTopicById } from '@/data/studyContent';
import { ColorScheme } from '@/constants/Colors';

export default function ReadingScreen() {
  const { topicId, subtopicId } = useLocalSearchParams<{
    topicId: string;
    subtopicId: string;
  }>();
  const { colors } = useTheme();
  const { getPageIndex, setPageIndex } = useStudy();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const data = getSubTopicById(topicId!, subtopicId!);
  const currentPageIndex = getPageIndex(subtopicId!);

  useEffect(() => {
    // Ensure page index is valid
    if (data && currentPageIndex >= data.subtopic.pages.length) {
      setPageIndex(subtopicId!, 0);
    }
  }, [data, currentPageIndex, subtopicId, setPageIndex]);

  if (!data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Content not found</Text>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const { subtopic } = data;
  const totalPages = subtopic.pages.length;
  const safePageIndex = Math.min(currentPageIndex, totalPages - 1);
  const currentPage = subtopic.pages[safePageIndex];

  const canGoPrevious = safePageIndex > 0;
  const canGoNext = safePageIndex < totalPages - 1;

  const handlePrevious = () => {
    if (canGoPrevious) {
      setPageIndex(subtopicId!, safePageIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setPageIndex(subtopicId!, safePageIndex + 1);
    }
  };

  const handleExit = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleExit} style={styles.exitButton}>
          <Ionicons name="close" size={24} color={colors.textSecondary} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {subtopic.title}
          </Text>
        </View>
        <View style={styles.pageIndicator}>
          <Text style={styles.pageIndicatorText}>
            {safePageIndex + 1} / {totalPages}
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>{currentPage.title}</Text>
        <Text style={styles.pageContent}>{currentPage.content}</Text>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.navButton, !canGoPrevious && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={!canGoPrevious}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={canGoPrevious ? colors.primary : colors.textLight}
          />
          <Text
            style={[
              styles.navButtonText,
              !canGoPrevious && styles.navButtonTextDisabled,
            ]}
          >
            Previous
          </Text>
        </Pressable>

        <Pressable
          style={[styles.navButton, !canGoNext && styles.navButtonDisabled]}
          onPress={handleNext}
          disabled={!canGoNext}
        >
          <Text
            style={[
              styles.navButtonText,
              !canGoNext && styles.navButtonTextDisabled,
            ]}
          >
            Next
          </Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={canGoNext ? colors.primary : colors.textLight}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function createStyles(colors: ColorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    errorContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    errorText: {
      fontSize: 18,
      color: colors.textSecondary,
      marginBottom: 16,
    },
    backButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    backButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '600',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    exitButton: {
      padding: 8,
      width: 60,
    },
    headerCenter: {
      flex: 1,
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    pageIndicator: {
      width: 60,
      alignItems: 'flex-end',
    },
    pageIndicatorText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.textSecondary,
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      padding: 24,
      paddingBottom: 40,
    },
    pageTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 20,
    },
    pageContent: {
      fontSize: 16,
      lineHeight: 26,
      color: colors.text,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.background,
    },
    navButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      backgroundColor: colors.surface,
      gap: 4,
    },
    navButtonDisabled: {
      opacity: 0.5,
    },
    navButtonText: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.primary,
    },
    navButtonTextDisabled: {
      color: colors.textLight,
    },
  });
}
