import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Flashcard } from '../types/flashcard';

interface FlashCardProps {
  card: Flashcard;
  isRevealed: boolean;
  onTap: () => void;
}

export function FlashCard({ card, isRevealed, onTap }: FlashCardProps) {
  const renderContent = () => {
    if (card.type === 'tap_reveal') {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.category}>{card.category}</Text>
          <Text style={styles.question}>{card.question}</Text>
          {isRevealed ? (
            <View style={styles.answerContainer}>
              <Text style={styles.answer}>{card.answer}</Text>
            </View>
          ) : (
            <Text style={styles.tapHint}>Tap to reveal</Text>
          )}
        </View>
      );
    }

    // Fill in the blank
    if (card.type === 'fill_blank') {
      const parts = card.question.split('_____');
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.category}>{card.category}</Text>
          <Text style={styles.fillBlankText}>
            {parts[0]}
            {isRevealed ? (
              <Text style={styles.revealedWord}>{card.answer}</Text>
            ) : (
              <Text style={styles.blank}>_____</Text>
            )}
            {parts[1]}
          </Text>
          {!isRevealed && <Text style={styles.tapHint}>Tap to reveal</Text>}
        </View>
      );
    }

    return null;
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: card.color }]}
      onPress={onTap}
      activeOpacity={0.95}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 16,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  category: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 24,
  },
  question: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 34,
  },
  fillBlankText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 34,
  },
  blank: {
    color: '#9CA3AF',
    fontWeight: '700',
  },
  revealedWord: {
    color: '#8B5CF6',
    fontWeight: '700',
  },
  answerContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 16,
  },
  answer: {
    fontSize: 28,
    fontWeight: '700',
    color: '#8B5CF6',
    textAlign: 'center',
  },
  tapHint: {
    position: 'absolute',
    bottom: 48,
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});
