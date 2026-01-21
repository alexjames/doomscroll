import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StackItemsQuestion } from '@/types/question';

interface StackItemsProps {
  question: StackItemsQuestion;
  orderedItemIds: string[];
  onAddItem: (itemId: string) => void;
  onRemoveItem: (index: number) => void;
  onClear: () => void;
  isSubmitted: boolean;
}

export function StackItems({
  question,
  orderedItemIds,
  onAddItem,
  onRemoveItem,
  onClear,
  isSubmitted,
}: StackItemsProps) {
  const availableItems = question.items.filter(
    (item) => !orderedItemIds.includes(item.id)
  );

  const getOrderedItems = () => {
    return orderedItemIds
      .map((id) => question.items.find((item) => item.id === id))
      .filter((item): item is typeof question.items[0] => !!item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.question}</Text>
      
      <View style={styles.stackContainer}>
        <Text style={styles.label}>Your Stack (Bottom to Top):</Text>
        <View style={styles.stackArea}>
          {orderedItemIds.length === 0 ? (
            <Text style={styles.placeholderText}>Tap items below to stack them</Text>
          ) : (
            <ScrollView contentContainerStyle={styles.stackContent}>
              {/* Render in reverse order to visualize stack building up */}
              {[...getOrderedItems()].reverse().map((item, reverseIndex) => {
                const originalIndex = orderedItemIds.length - 1 - reverseIndex;
                return (
                  <TouchableOpacity
                    key={`stack-${item.id}`}
                    style={styles.stackItem}
                    onPress={() => !isSubmitted && onRemoveItem(originalIndex)}
                    disabled={isSubmitted}
                  >
                    <Text style={styles.itemText}>{item.text}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>
        <View style={styles.stackBase} />
      </View>

      {!isSubmitted && (
        <View style={styles.poolContainer}>
          <View style={styles.poolHeader}>
            <Text style={styles.label}>Available Items:</Text>
            {orderedItemIds.length > 0 && (
              <TouchableOpacity onPress={onClear}>
                <Text style={styles.clearText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.poolItems}>
            {availableItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.poolItem}
                onPress={() => onAddItem(item.id)}
              >
                <Text style={styles.itemText}>{item.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  stackContainer: {
    flex: 1,
    marginBottom: 20,
  },
  stackArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'flex-end', // Items stick to bottom
  },
  stackContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  stackBase: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginTop: 4,
    marginHorizontal: 20,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  stackItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  poolContainer: {
    minHeight: 150,
  },
  poolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  clearText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '500',
  },
  poolItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  poolItem: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});