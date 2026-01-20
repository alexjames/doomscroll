import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MultipleChoiceMultiQuestion } from '@/types/question';
import { useTheme } from '@/context/ThemeContext';
import { ColorScheme } from '@/constants/Colors';
import { shuffleArray } from '@/utils/shuffle';

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
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const shuffledOptions = useMemo(() => {
    const optionsWithIndices = question.options.map((option, originalIndex) => ({
      option,
      originalIndex,
    }));
    return shuffleArray(optionsWithIndices);
  }, [question.options]);

  const getOriginalIndex = (shuffledIndex: number) => {
    return shuffledOptions[shuffledIndex].originalIndex;
  };

  const isSelected = (shuffledIndex: number) => {
    const originalIndex = getOriginalIndex(shuffledIndex);
    return selectedIndices?.includes(originalIndex) ?? false;
  };

  const isCorrectOption = (shuffledIndex: number) => {
    const originalIndex = getOriginalIndex(shuffledIndex);
    return question.correctAnswerIndices.includes(originalIndex);
  };

  const getOptionStyle = (shuffledIndex: number) => {
    const selected = isSelected(shuffledIndex);
    const correct = isCorrectOption(shuffledIndex);

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

  const getCheckboxStyle = (shuffledIndex: number) => {
    const selected = isSelected(shuffledIndex);
    const correct = isCorrectOption(shuffledIndex);

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
        {shuffledOptions.map((item, shuffledIndex) => (
          <Pressable
            key={shuffledIndex}
            style={getOptionStyle(shuffledIndex)}
            onPress={() => !isSubmitted && onToggle(item.originalIndex)}
            disabled={isSubmitted}
          >
            <View style={getCheckboxStyle(shuffledIndex)}>
              {isSelected(shuffledIndex) && <View style={styles.checkmark} />}
            </View>
            <Text style={styles.optionText}>{item.option}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function createStyles(colors: ColorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
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
      marginBottom: 20,
    },
    optionsContainer: {
      gap: 12,
    },
    option: {
      backgroundColor: colors.surface,
      borderRadius: 24,
      borderWidth: 0,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    optionSelected: {
      backgroundColor: colors.primary + '15',
      borderRadius: 24,
      borderWidth: 2,
      borderColor: colors.primary,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    optionCorrect: {
      backgroundColor: colors.successLight,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: colors.success,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    optionIncorrect: {
      backgroundColor: colors.errorLight,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: colors.error,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: colors.border,
      marginRight: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxSelected: {
      width: 24,
      height: 24,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: colors.primary,
      backgroundColor: colors.primary,
      marginRight: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxCorrect: {
      width: 24,
      height: 24,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: colors.success,
      backgroundColor: colors.success,
      marginRight: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxIncorrect: {
      width: 24,
      height: 24,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: colors.error,
      backgroundColor: colors.error,
      marginRight: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkmark: {
      width: 10,
      height: 10,
      borderRadius: 2,
      backgroundColor: colors.white,
    },
    optionText: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
  });
}
