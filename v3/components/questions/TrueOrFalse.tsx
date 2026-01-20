import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { TrueOrFalseQuestion } from '@/types/question';
import { useTheme } from '@/context/ThemeContext';
import { ColorScheme } from '@/constants/Colors';

interface TrueOrFalseProps {
  question: TrueOrFalseQuestion;
  selectedAnswer: boolean | null;
  onSelect: (value: boolean) => void;
  isSubmitted: boolean;
}

export function TrueOrFalse({
  question,
  selectedAnswer,
  onSelect,
  isSubmitted,
}: TrueOrFalseProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const shuffledOptions = useMemo(() => {
    const options = [
      { value: true, label: 'True' },
      { value: false, label: 'False' },
    ];
    return Math.random() < 0.5 ? options : [options[1], options[0]];
  }, []);

  const getButtonStyle = (value: boolean) => {
    const isSelected = selectedAnswer === value;
    const isCorrect = value === question.correctAnswer;

    if (!isSubmitted) {
      return [styles.button, isSelected && styles.buttonSelected];
    }

    if (isCorrect) {
      return [styles.button, styles.buttonCorrect];
    }
    if (isSelected && !isCorrect) {
      return [styles.button, styles.buttonIncorrect];
    }
    return styles.button;
  };

  const getButtonTextStyle = (value: boolean) => {
    const isSelected = selectedAnswer === value;
    const isCorrect = value === question.correctAnswer;

    if (!isSubmitted) {
      return isSelected ? styles.buttonTextSelected : styles.buttonText;
    }

    if (isCorrect || (isSelected && !isCorrect)) {
      return styles.buttonTextHighlighted;
    }
    return styles.buttonText;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      <View style={styles.buttonsContainer}>
        {shuffledOptions.map((option) => (
          <Pressable
            key={option.label}
            style={getButtonStyle(option.value)}
            onPress={() => !isSubmitted && onSelect(option.value)}
            disabled={isSubmitted}
          >
            <Text style={getButtonTextStyle(option.value)}>{option.label}</Text>
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
      marginBottom: 32,
      lineHeight: 28,
    },
    buttonsContainer: {
      flexDirection: 'row',
      gap: 16,
    },
    button: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: 24,
      borderWidth: 0,
      paddingVertical: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonSelected: {
      backgroundColor: colors.primary + '15',
      borderColor: colors.primary,
    },
    buttonCorrect: {
      backgroundColor: colors.successLight,
      borderColor: colors.success,
    },
    buttonIncorrect: {
      backgroundColor: colors.errorLight,
      borderColor: colors.error,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    buttonTextSelected: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.primary,
    },
    buttonTextHighlighted: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
    },
  });
}
