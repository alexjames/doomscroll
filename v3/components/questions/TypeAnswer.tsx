import React, { useMemo } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { TypeAnswerQuestion } from '@/types/question';
import { useTheme } from '@/context/ThemeContext';
import { ColorScheme } from '@/constants/Colors';

interface TypeAnswerProps {
  question: TypeAnswerQuestion;
  enteredText: string;
  onTextChange: (text: string) => void;
  isSubmitted: boolean;
  isCorrect?: boolean;
}

export function TypeAnswer({
  question,
  enteredText,
  onTextChange,
  isSubmitted,
  isCorrect,
}: TypeAnswerProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const getInputStyle = () => {
    if (!isSubmitted) {
      return styles.input;
    }
    return isCorrect ? styles.inputCorrect : styles.inputIncorrect;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={getInputStyle()}
          value={enteredText}
          onChangeText={onTextChange}
          placeholder="Type your answer here..."
          placeholderTextColor={colors.textLight}
          editable={!isSubmitted}
          autoCapitalize="none"
          autoCorrect={false}
          multiline={false}
        />
      </View>
      {isSubmitted && !isCorrect && (
        <View style={styles.correctAnswerContainer}>
          <Text style={styles.correctAnswerLabel}>Correct answer:</Text>
          <Text style={styles.correctAnswer}>{question.correctAnswer}</Text>
        </View>
      )}
      {isSubmitted && isCorrect && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>Correct!</Text>
        </View>
      )}
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
    inputContainer: {
      backgroundColor: colors.surface,
      borderRadius: 24,
      borderWidth: 0,
      overflow: 'hidden',
    },
    input: {
      fontSize: 16,
      color: colors.text,
      padding: 20,
      minHeight: 60,
    },
    inputCorrect: {
      fontSize: 18,
      color: colors.success,
      fontWeight: '600',
      padding: 20,
      minHeight: 60,
      backgroundColor: colors.successLight,
    },
    inputIncorrect: {
      fontSize: 18,
      color: colors.error,
      fontWeight: '600',
      padding: 20,
      minHeight: 60,
      backgroundColor: colors.errorLight,
    },
    correctAnswerContainer: {
      marginTop: 20,
      padding: 16,
      backgroundColor: colors.successLight,
      borderRadius: 24,
    },
    correctAnswerLabel: {
      fontSize: 14,
      color: colors.success,
      marginBottom: 4,
    },
    correctAnswer: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.success,
    },
    successContainer: {
      marginTop: 20,
      padding: 16,
      backgroundColor: colors.successLight,
      borderRadius: 24,
      alignItems: 'center',
    },
    successText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.success,
    },
  });
}
