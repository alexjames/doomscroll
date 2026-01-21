import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { StackItemsQuestion, OrderItem } from '@/types/question';
import { useTheme } from '@/context/ThemeContext';
import { ColorScheme } from '@/constants/Colors';
import { shuffleArray } from '@/utils/shuffle';

interface StackItemsProps {
  question: StackItemsQuestion;
  stackedItemIds: string[];
  onAddItem: (itemId: string) => void;
  onRemoveItem: (index: number) => void;
  onClear: () => void;
  isSubmitted: boolean;
}

export function StackItems({
  question,
  stackedItemIds,
  onAddItem,
  onRemoveItem,
  onClear,
  isSubmitted,
}: StackItemsProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const safeStackedItemIds = stackedItemIds ?? [];

  const allItems = useMemo(() => {
    const items = [...question.items];
    if (question.distractors) {
      items.push(...question.distractors);
    }
    return shuffleArray(items);
  }, [question.items, question.distractors]);

  const isItemUsed = (itemId: string) => safeStackedItemIds.includes(itemId);

  const getItemById = (itemId: string): OrderItem | undefined =>
    allItems.find((item) => item.id === itemId);

  const isCorrectOrder = useMemo(() => {
    if (safeStackedItemIds.length !== question.correctOrder.length) return false;
    return safeStackedItemIds.every((id, index) => id === question.correctOrder[index]);
  }, [safeStackedItemIds, question.correctOrder]);

  const getCorrectPreview = () => {
    return question.correctOrder
      .map((id) => {
        const item = allItems.find((i) => i.id === id);
        return item?.text || '';
      })
      .reverse()
      .join(' → ');
  };

  return (
    <View style={styles.container}>
      {/* Upper half - Question and Stack Zone */}
      <ScrollView
        style={styles.upperSection}
        contentContainerStyle={styles.upperSectionContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.question}>{question.question}</Text>
        <Text style={styles.hint}>Tap cards to stack from bottom to top</Text>

        {/* Stack Zone - items displayed in reverse order (top to bottom visually) */}
        <View style={styles.stackSection}>
          <View style={styles.stackHeader}>
            <Text style={styles.stackLabel}>Your Stack (Top):</Text>
            {safeStackedItemIds.length > 0 && !isSubmitted && (
              <Pressable onPress={onClear}>
                <Text style={styles.clearButtonText}>Clear</Text>
              </Pressable>
            )}
          </View>
          <View
            style={[
              styles.stackZone,
              isSubmitted && (isCorrectOrder ? styles.stackZoneCorrect : styles.stackZoneIncorrect),
            ]}
          >
            {safeStackedItemIds.length === 0 ? (
              <Text style={styles.placeholderText}>Tap cards below to stack them here</Text>
            ) : (
              <View style={styles.stackedCards}>
                {/* Reverse the array to show top item first visually */}
                {[...safeStackedItemIds].reverse().map((itemId, visualIndex) => {
                  const actualIndex = safeStackedItemIds.length - 1 - visualIndex;
                  const item = getItemById(itemId);
                  const isTop = visualIndex === 0;
                  const isBottom = visualIndex === safeStackedItemIds.length - 1;

                  return (
                    <View key={`${itemId}-${actualIndex}`} style={styles.stackedItemWrapper}>
                      <Pressable
                        style={[
                          styles.stackedCard,
                          isTop && styles.stackedCardTop,
                          isBottom && styles.stackedCardBottom,
                        ]}
                        onPress={() => !isSubmitted && onRemoveItem(actualIndex)}
                        disabled={isSubmitted}
                      >
                        <Text style={styles.stackedCardText}>{item?.text}</Text>
                        {isTop && <Text style={styles.topLabel}>(Top)</Text>}
                        {isBottom && <Text style={styles.bottomLabel}>(Bottom)</Text>}
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>

        {/* Show correct answer after submission */}
        {isSubmitted && !isCorrectOrder && (
          <View style={styles.correctAnswerBox}>
            <Text style={styles.correctAnswerLabel}>Correct order (bottom to top):</Text>
            <Text style={styles.correctAnswerText}>{getCorrectPreview()}</Text>
          </View>
        )}
      </ScrollView>

      {/* Lower half - Available Cards */}
      <View style={styles.lowerSection}>
        <View style={styles.availableCards}>
          {allItems.map((item) => {
            const used = isItemUsed(item.id);
            return (
              <Pressable
                key={item.id}
                style={[styles.availableCard, used && styles.availableCardUsed]}
                onPress={() => !isSubmitted && !used && onAddItem(item.id)}
                disabled={isSubmitted || used}
              >
                <Text
                  style={[
                    styles.availableCardText,
                    used && styles.availableCardTextUsed,
                  ]}
                >
                  {item.text}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

function createStyles(colors: ColorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    upperSection: {
      flex: 1,
    },
    upperSectionContent: {
      flexGrow: 1,
    },
    lowerSection: {
      minHeight: 120,
      justifyContent: 'center',
      paddingTop: 12,
    },
    question: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
      lineHeight: 28,
    },
    hint: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 16,
    },
    // Stack Section
    stackSection: {
      marginBottom: 20,
    },
    stackHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    stackLabel: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    clearButtonText: {
      fontSize: 13,
      color: colors.error,
      fontWeight: '500',
    },
    stackZone: {
      backgroundColor: colors.surface,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: colors.border,
      borderStyle: 'dashed',
      padding: 12,
      minHeight: 80,
      justifyContent: 'center',
    },
    stackZoneCorrect: {
      borderColor: colors.success,
      borderStyle: 'solid',
      backgroundColor: colors.successLight,
    },
    stackZoneIncorrect: {
      borderColor: colors.error,
      borderStyle: 'solid',
      backgroundColor: colors.errorLight,
    },
    placeholderText: {
      fontSize: 13,
      color: colors.textLight,
      textAlign: 'center',
    },
    stackedCards: {
      gap: 8,
    },
    stackedItemWrapper: {
      width: '100%',
    },
    stackedCard: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderWidth: 2,
      borderColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    stackedCardTop: {
      borderTopWidth: 3,
      borderTopColor: colors.success,
    },
    stackedCardBottom: {
      borderBottomWidth: 3,
      borderBottomColor: colors.warning,
    },
    stackedCardText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.white,
      flex: 1,
    },
    topLabel: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.white + 'CC',
      marginLeft: 8,
    },
    bottomLabel: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.white + 'CC',
      marginLeft: 8,
    },
    // Correct Answer
    correctAnswerBox: {
      backgroundColor: colors.successLight,
      borderRadius: 24,
      padding: 12,
      marginBottom: 16,
    },
    correctAnswerLabel: {
      fontSize: 11,
      fontWeight: '600',
      color: colors.success,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 4,
    },
    correctAnswerText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.success,
    },
    // Available Cards Section
    availableCards: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    availableCard: {
      backgroundColor: colors.surfaceSecondary,
      borderRadius: 16,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderWidth: 0,
    },
    availableCardUsed: {
      backgroundColor: colors.border,
      opacity: 0.4,
    },
    availableCardText: {
      fontSize: 13,
      fontWeight: '500',
      color: colors.text,
    },
    availableCardTextUsed: {
      color: colors.textLight,
    },
  });
}
