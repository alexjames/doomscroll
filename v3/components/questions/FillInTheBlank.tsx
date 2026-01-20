import React, { useMemo } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FillInTheBlankQuestion } from '@/types/question';
import { useTheme } from '@/context/ThemeContext';
import { ColorScheme } from '@/constants/Colors';

interface FillInTheBlankProps {
  question: FillInTheBlankQuestion;
  enteredText: string;
  onTextChange: (text: string) => void;
  isSubmitted: boolean;
  isCorrect?: boolean;
}

export function FillInTheBlank({
  question,
  enteredText,
  onTextChange,
  isSubmitted,
  isCorrect,
}: FillInTheBlankProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const parts = question.questionWithBlank.split('___');

  const getInputStyle = () => {
    if (!isSubmitted) {
      return styles.input;
    }
    return isCorrect ? styles.inputCorrect : styles.inputIncorrect;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      <View style={styles.sentenceContainer}>
        <Text style={styles.sentenceText}>
          {parts[0]}
          <View style={styles.inputWrapper}>
            <TextInput
              style={getInputStyle()}
              value={enteredText}
              onChangeText={onTextChange}
              placeholder="Type answer"
              placeholderTextColor={colors.textLight}
              editable={!isSubmitted}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {parts[1]}
        </Text>
      </View>
      {isSubmitted && !isCorrect && (
        <View style={styles.correctAnswerContainer}>
          <Text style={styles.correctAnswerLabel}>Correct answer:</Text>
          <Text style={styles.correctAnswer}>{question.correctAnswer}</Text>
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
      fontSize: 16,
      fontWeight: '500',
      color: colors.textSecondary,
      marginBottom: 16,
    },
    sentenceContainer: {
      backgroundColor: colors.surface,
      borderRadius: 24,
      padding: 24,
      borderWidth: 0,
    },
    sentenceText: {
      fontSize: 20,
      fontWeight: '500',
      color: colors.text,
      lineHeight: 36,
    },
    inputWrapper: {
      transform: [{ translateY: 4 }],
    },
    input: {
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
      fontSize: 16,
      fontWeight: '600',
      color: colors.primary,
      minWidth: 120,
      paddingVertical: 4,
      paddingHorizontal: 8,
      textAlign: 'center',
    },
    inputCorrect: {
      borderBottomWidth: 2,
      borderBottomColor: colors.success,
      backgroundColor: colors.successLight,
      fontSize: 16,
      fontWeight: '600',
      color: colors.success,
      minWidth: 120,
      paddingVertical: 4,
      paddingHorizontal: 8,
      textAlign: 'center',
      borderRadius: 4,
    },
    inputIncorrect: {
      borderBottomWidth: 2,
      borderBottomColor: colors.error,
      backgroundColor: colors.errorLight,
      fontSize: 16,
      fontWeight: '600',
      color: colors.error,
      minWidth: 120,
      paddingVertical: 4,
      paddingHorizontal: 8,
      textAlign: 'center',
      borderRadius: 4,
    },
    correctAnswerContainer: {
      marginTop: 20,
      padding: 16,
      backgroundColor: colors.successLight,
      borderRadius: 24,
      flexDirection: 'row',
      alignItems: 'center',
    },
    correctAnswerLabel: {
      fontSize: 14,
      color: colors.success,
      marginRight: 8,
    },
    correctAnswer: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.success,
    },
  });
}
