import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { CourseCard } from '../../components/CourseCard';
import { courses } from '../../data/courses';
import { Course } from '../../types/course';

export default function ExploreScreen() {
  const { colors } = useTheme();

  const handleCoursePress = (course: Course) => {
    router.push(`/course/${course.id}`);
  };

  const renderCourseItem = ({ item }: { item: Course }) => (
    <CourseCard course={item} onPress={() => handleCoursePress(item)} />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Explore</Text>
        </View>

        {/* All Courses Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            All courses
          </Text>
          <FlatList
            data={courses}
            renderItem={renderCourseItem}
            keyExtractor={(item) => `all-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  horizontalList: {
    paddingHorizontal: 24,
  },
  bottomPadding: {
    height: 32,
  },
});
