import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { OrderItemsQuestion, OrderItem } from '@/types/question';
import { Colors } from '@/constants/Colors';
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

      {/* Available Cards */}
      <View style={styles.availableSection}>
        <Text style={styles.availableLabel}>Available:</Text>
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

      {question.preview && (
        <View style={styles.previewHint}>
          <Text style={styles.previewHintLabel}>Expected format:</Text>
          <Text style={styles.previewHintText}>{question.preview}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    lineHeight: 28,
  },
  hint: {
    fontSize: 14,
    color: Colors.textSecondary,
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
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  clearButtonText: {
    fontSize: 13,
    color: Colors.error,
    fontWeight: '500',
  },
  dropZone: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    padding: 12,
    minHeight: 60,
    justifyContent: 'center',
  },
  dropZoneCorrect: {
    borderColor: Colors.success,
    borderStyle: 'solid',
    backgroundColor: Colors.successLight,
  },
  dropZoneIncorrect: {
    borderColor: Colors.error,
    borderStyle: 'solid',
    backgroundColor: Colors.errorLight,
  },
  placeholderText: {
    fontSize: 13,
    color: Colors.textLight,
    textAlign: 'center',
  },
  placedCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  placedCard: {
    backgroundColor: Colors.primary,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  placedCardText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.white,
  },
  // Correct Answer
  correctAnswerBox: {
    backgroundColor: Colors.successLight,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  correctAnswerLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.success,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  correctAnswerText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.success,
    fontFamily: 'monospace',
  },
  // Available Cards Section
  availableSection: {
    marginBottom: 16,
  },
  availableLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
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
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  availableCardUsed: {
    backgroundColor: Colors.border,
    opacity: 0.4,
  },
  availableCardText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text,
  },
  availableCardTextUsed: {
    color: Colors.textLight,
  },
  // Preview Hint
  previewHint: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 6,
    padding: 10,
  },
  previewHintLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  previewHintText: {
    fontSize: 13,
    fontFamily: 'monospace',
    color: Colors.textSecondary,
  },
});
