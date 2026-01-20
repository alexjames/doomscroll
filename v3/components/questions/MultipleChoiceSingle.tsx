import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MultipleChoiceSingleQuestion } from '@/types/question';
import { useTheme } from '@/context/ThemeContext';
import { ColorScheme } from '@/constants/Colors';
import { shuffleArray } from '@/utils/shuffle';

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

  const getShuffledIndex = (originalIndex: number | null) => {
    if (originalIndex === null) return null;
    return shuffledOptions.findIndex((item) => item.originalIndex === originalIndex);
  };

  const getOptionStyle = (shuffledIndex: number) => {
    const originalIndex = getOriginalIndex(shuffledIndex);
    const isSelected = getShuffledIndex(selectedIndex) === shuffledIndex;
    const isCorrect = originalIndex === question.correctAnswerIndex;

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

  const getOptionTextStyle = (shuffledIndex: number) => {
    const originalIndex = getOriginalIndex(shuffledIndex);
    const isSelected = getShuffledIndex(selectedIndex) === shuffledIndex;
    const isCorrect = originalIndex === question.correctAnswerIndex;

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
        {shuffledOptions.map((item, shuffledIndex) => (
          <Pressable
            key={shuffledIndex}
            style={getOptionStyle(shuffledIndex)}
            onPress={() => !isSubmitted && onSelect(item.originalIndex)}
            disabled={isSubmitted}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionLetter}>
                <Text style={styles.optionLetterText}>
                  {String.fromCharCode(65 + shuffledIndex)}
                </Text>
              </View>
              <Text style={getOptionTextStyle(shuffledIndex)}>{item.option}</Text>
            </View>
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
      marginBottom: 24,
      lineHeight: 28,
    },
    optionsContainer: {
      gap: 12,
    },
    option: {
      backgroundColor: colors.surface,
      borderRadius: 24,
      borderWidth: 0,
      padding: 16,
    },
    optionSelected: {
      backgroundColor: colors.primary + '15',
      borderRadius: 24,
      borderWidth: 2,
      borderColor: colors.primary,
      padding: 16,
    },
    optionCorrect: {
      backgroundColor: colors.successLight,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: colors.success,
      padding: 16,
    },
    optionIncorrect: {
      backgroundColor: colors.errorLight,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: colors.error,
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
      backgroundColor: colors.surfaceSecondary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    optionLetterText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    optionText: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    optionTextSelected: {
      fontSize: 16,
      color: colors.primary,
      fontWeight: '500',
      flex: 1,
    },
    optionTextHighlighted: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '600',
      flex: 1,
    },
  });
}
