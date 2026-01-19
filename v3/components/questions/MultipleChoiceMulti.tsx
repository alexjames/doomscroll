import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MultipleChoiceMultiQuestion } from '@/types/question';
import { Colors } from '@/constants/Colors';

interface MultipleChoiceMultiProps {
  question: MultipleChoiceMultiQuestion;
  selectedIndices: number[];
  onToggle: (index: number) => void;
  isSubmitted: boolean;
}

export function MultipleChoiceMulti({
  question,
  selectedIndices,
  onToggle,
  isSubmitted,
}: MultipleChoiceMultiProps) {
  const isSelected = (index: number) => selectedIndices?.includes(index) ?? false;
  const isCorrectOption = (index: number) =>
    question.correctAnswerIndices.includes(index);

  const getOptionStyle = (index: number) => {
    const selected = isSelected(index);
    const correct = isCorrectOption(index);

    if (!isSubmitted) {
      return selected ? styles.optionSelected : styles.option;
    }

    if (correct) {
      return styles.optionCorrect;
    }
    if (selected && !correct) {
      return styles.optionIncorrect;
    }
    return styles.option;
  };

  const getCheckboxStyle = (index: number) => {
    const selected = isSelected(index);
    const correct = isCorrectOption(index);

    if (!isSubmitted) {
      return selected ? styles.checkboxSelected : styles.checkbox;
    }

    if (correct) {
      return styles.checkboxCorrect;
    }
    if (selected && !correct) {
      return styles.checkboxIncorrect;
    }
    return styles.checkbox;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      <Text style={styles.hint}>Select all that apply</Text>
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <Pressable
            key={index}
            style={getOptionStyle(index)}
            onPress={() => !isSubmitted && onToggle(index)}
            disabled={isSubmitted}
          >
            <View style={getCheckboxStyle(index)}>
              {isSelected(index) && <View style={styles.checkmark} />}
            </View>
            <Text style={styles.optionText}>{option}</Text>
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
    marginBottom: 8,
    lineHeight: 28,
  },
  hint: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: Colors.primary + '15',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionCorrect: {
    backgroundColor: Colors.successLight,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.success,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIncorrect: {
    backgroundColor: Colors.errorLight,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.error,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCorrect: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.success,
    backgroundColor: Colors.success,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxIncorrect: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.error,
    backgroundColor: Colors.error,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: Colors.white,
  },
  optionText: {
    fontSize: 16,
    color: Colors.text,
    flex: 1,
  },
});
