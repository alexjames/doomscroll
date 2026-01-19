import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MultipleChoiceSingleQuestion } from '@/types/question';
import { Colors } from '@/constants/Colors';

interface MultipleChoiceSingleProps {
  question: MultipleChoiceSingleQuestion;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  isSubmitted: boolean;
}

export function MultipleChoiceSingle({
  question,
  selectedIndex,
  onSelect,
  isSubmitted,
}: MultipleChoiceSingleProps) {
  const getOptionStyle = (index: number) => {
    const isSelected = selectedIndex === index;
    const isCorrect = index === question.correctAnswerIndex;

    if (!isSubmitted) {
      return isSelected ? styles.optionSelected : styles.option;
    }

    if (isCorrect) {
      return styles.optionCorrect;
    }
    if (isSelected && !isCorrect) {
      return styles.optionIncorrect;
    }
    return styles.option;
  };

  const getOptionTextStyle = (index: number) => {
    const isSelected = selectedIndex === index;
    const isCorrect = index === question.correctAnswerIndex;

    if (!isSubmitted) {
      return isSelected ? styles.optionTextSelected : styles.optionText;
    }

    if (isCorrect || (isSelected && !isCorrect)) {
      return styles.optionTextHighlighted;
    }
    return styles.optionText;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <Pressable
            key={index}
            style={getOptionStyle(index)}
            onPress={() => !isSubmitted && onSelect(index)}
            disabled={isSubmitted}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionLetter}>
                <Text style={styles.optionLetterText}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text style={getOptionTextStyle(index)}>{option}</Text>
            </View>
          </Pressable>
        ))}
      </View>
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
    marginBottom: 24,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    padding: 16,
  },
  optionSelected: {
    backgroundColor: Colors.primary + '15',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    padding: 16,
  },
  optionCorrect: {
    backgroundColor: Colors.successLight,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.success,
    padding: 16,
  },
  optionIncorrect: {
    backgroundColor: Colors.errorLight,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.error,
    padding: 16,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionLetterText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  optionText: {
    fontSize: 16,
    color: Colors.text,
    flex: 1,
  },
  optionTextSelected: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
    flex: 1,
  },
  optionTextHighlighted: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
    flex: 1,
  },
});
