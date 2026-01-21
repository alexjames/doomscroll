import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { useStudy } from '@/context/StudyContext';
import { studyTopics } from '@/data/studyContent';
import { ColorScheme } from '@/constants/Colors';

export default function StudyScreen() {
  const { colors } = useTheme();
  const { toggleTopic, isTopicExpanded, getPageIndex } = useStudy();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleSubtopicPress = (topicId: string, subtopicId: string) => {
    router.push(`/(tabs)/study/${topicId}/${subtopicId}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Study</Text>
        <Text style={styles.subtitle}>Learn at your own pace</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {studyTopics.map((topic) => {
          const expanded = isTopicExpanded(topic.id);

          return (
            <View key={topic.id} style={styles.topicContainer}>
              <Pressable
                style={styles.topicHeader}
                onPress={() => toggleTopic(topic.id)}
              >
                <View style={styles.topicLeft}>
                  <Ionicons
                    name="folder-outline"
                    size={22}
                    color={colors.primary}
                    style={styles.topicIcon}
                  />
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                </View>
                <View style={styles.topicRight}>
                  <Text style={styles.subtopicCount}>
                    {topic.subtopics.length} topics
                  </Text>
                  <Ionicons
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={colors.textSecondary}
                  />
                </View>
              </Pressable>

              {expanded && (
                <View style={styles.subtopicsContainer}>
                  {topic.subtopics.map((subtopic, index) => {
                    const pageIndex = getPageIndex(subtopic.id);
                    const totalPages = subtopic.pages.length;
                    const hasProgress = pageIndex > 0;
                    const isComplete = pageIndex >= totalPages - 1;

                    return (
                      <Pressable
                        key={subtopic.id}
                        style={[
                          styles.subtopicItem,
                          index === topic.subtopics.length - 1 && styles.subtopicItemLast,
                        ]}
                        onPress={() => handleSubtopicPress(topic.id, subtopic.id)}
                      >
                        <View style={styles.subtopicLeft}>
                          <Ionicons
                            name={
                              isComplete
                                ? 'checkmark-circle'
                                : hasProgress
                                ? 'ellipse-outline'
                                : 'document-text-outline'
                            }
                            size={18}
                            color={
                              isComplete
                                ? colors.success
                                : hasProgress
                                ? colors.primary
                                : colors.textSecondary
                            }
                            style={styles.subtopicIcon}
                          />
                          <Text style={styles.subtopicTitle}>{subtopic.title}</Text>
                        </View>
                        <View style={styles.subtopicRight}>
                          <Text style={styles.pageCount}>
                            {hasProgress ? `${pageIndex + 1}/` : ''}
                            {totalPages} pages
                          </Text>
                          <Ionicons
                            name="chevron-forward"
                            size={16}
                            color={colors.textLight}
                          />
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ColorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
    },
    topicContainer: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      marginBottom: 12,
      overflow: 'hidden',
    },
    topicHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
    },
    topicLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    topicIcon: {
      marginRight: 12,
    },
    topicTitle: {
      fontSize: 17,
      fontWeight: '600',
      color: colors.text,
    },
    topicRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    subtopicCount: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    subtopicsContainer: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    subtopicItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    subtopicItemLast: {
      borderBottomWidth: 0,
    },
    subtopicLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    subtopicIcon: {
      marginRight: 12,
      marginLeft: 8,
    },
    subtopicTitle: {
      fontSize: 15,
      color: colors.text,
    },
    subtopicRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    pageCount: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    bottomPadding: {
      height: 24,
    },
  });
}
