import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { OrderItemsQuestion, OrderItem } from '@/types/question';
import { useTheme } from '@/context/ThemeContext';
import { ColorScheme } from '@/constants/Colors';
import { shuffleArray } from '@/utils/shuffle';

interface OrderItemsProps {
  question: OrderItemsQuestion;
  orderedItemIds: string[];
  onAddItem: (itemId: string) => void;
  onRemoveItem: (index: number) => void;
  onClear: () => void;
  isSubmitted: boolean;
}

export function OrderItems({
  question,
  orderedItemIds,
  onAddItem,
  onRemoveItem,
  onClear,
  isSubmitted,
}: OrderItemsProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const safeOrderedItemIds = orderedItemIds ?? [];

  const allItems = useMemo(() => {
    const items = [...question.items];
    if (question.distractors) {
      items.push(...question.distractors);
    }
    return shuffleArray(items);
  }, [question.items, question.distractors]);

  const isItemUsed = (itemId: string) => safeOrderedItemIds.includes(itemId);

  const getItemById = (itemId: string): OrderItem | undefined =>
    allItems.find((item) => item.id === itemId);

  const isCorrectOrder = useMemo(() => {
    if (safeOrderedItemIds.length !== question.correctOrder.length) return false;
    return safeOrderedItemIds.every((id, index) => id === question.correctOrder[index]);
  }, [safeOrderedItemIds, question.correctOrder]);

  const getCorrectPreview = () => {
    return question.correctOrder.map((id) => {
      const item = allItems.find((i) => i.id === id);
      return item?.text || '';
    }).join(' ');
  };

  return (
    <View style={styles.container}>
      {/* Upper half - Question and Answer Zone */}
      <View style={styles.upperSection}>
        <Text style={styles.question}>{question.question}</Text>
        <Text style={styles.hint}>Tap cards to build your answer</Text>

        {/* Answer Zone */}
        <View style={styles.answerSection}>
          <View style={styles.answerHeader}>
            <Text style={styles.answerLabel}>Your Answer:</Text>
            {safeOrderedItemIds.length > 0 && !isSubmitted && (
              <Pressable onPress={onClear}>
                <Text style={styles.clearButtonText}>Clear</Text>
              </Pressable>
            )}
          </View>
          <View
            style={[
              styles.dropZone,
              isSubmitted && (isCorrectOrder ? styles.dropZoneCorrect : styles.dropZoneIncorrect),
            ]}
          >
            {safeOrderedItemIds.length === 0 ? (
              <Text style={styles.placeholderText}>Tap cards below to add them here</Text>
            ) : (
              <View style={styles.placedCards}>
                {safeOrderedItemIds.map((itemId, index) => {
                  const item = getItemById(itemId);
                  return (
                    <Pressable
                      key={`${itemId}-${index}`}
                      style={styles.placedCard}
                      onPress={() => !isSubmitted && onRemoveItem(index)}
                      disabled={isSubmitted}
                    >
                      <Text style={styles.placedCardText}>{item?.text}</Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>
        </View>

        {/* Show correct answer after submission */}
        {isSubmitted && !isCorrectOrder && (
          <View style={styles.correctAnswerBox}>
            <Text style={styles.correctAnswerLabel}>Correct answer:</Text>
            <Text style={styles.correctAnswerText}>{getCorrectPreview()}</Text>
          </View>
        )}
      </View>

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
    lowerSection: {
      flex: 1,
      justifyContent: 'center',
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
    // Answer Section
    answerSection: {
      marginBottom: 20,
    },
    answerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    answerLabel: {
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
    dropZone: {
      backgroundColor: colors.surface,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: colors.border,
      borderStyle: 'dashed',
      padding: 12,
      minHeight: 60,
      justifyContent: 'center',
    },
    dropZoneCorrect: {
      borderColor: colors.success,
      borderStyle: 'solid',
      backgroundColor: colors.successLight,
    },
    dropZoneIncorrect: {
      borderColor: colors.error,
      borderStyle: 'solid',
      backgroundColor: colors.errorLight,
    },
    placeholderText: {
      fontSize: 13,
      color: colors.textLight,
      textAlign: 'center',
    },
    placedCards: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    placedCard: {
      backgroundColor: colors.primary,
      borderRadius: 6,
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    placedCardText: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.white,
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
      fontFamily: 'monospace',
    },
    // Available Cards Section
    availableLabel: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 10,
    },
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
    // Preview Hint
    previewHint: {
      backgroundColor: colors.surfaceSecondary,
      borderRadius: 6,
      padding: 10,
    },
    previewHintLabel: {
      fontSize: 11,
      fontWeight: '600',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 4,
    },
    previewHintText: {
      fontSize: 13,
      fontFamily: 'monospace',
      color: colors.textSecondary,
    },
  });
}
