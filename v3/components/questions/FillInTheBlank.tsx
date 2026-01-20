import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FillInTheBlankQuestion } from '@/types/question';
import { Colors } from '@/constants/Colors';

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
              placeholderTextColor={Colors.textLight}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  question: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  sentenceContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 0,
  },
  sentenceText: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.text,
    lineHeight: 36,
  },
  inputWrapper: {
    transform: [{ translateY: 4 }],
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    minWidth: 120,
    paddingVertical: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  inputCorrect: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.success,
    backgroundColor: Colors.successLight,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.success,
    minWidth: 120,
    paddingVertical: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    borderRadius: 4,
  },
  inputIncorrect: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.error,
    backgroundColor: Colors.errorLight,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.error,
    minWidth: 120,
    paddingVertical: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    borderRadius: 4,
  },
  correctAnswerContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: Colors.successLight,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  correctAnswerLabel: {
    fontSize: 14,
    color: Colors.success,
    marginRight: 8,
  },
  correctAnswer: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.success,
  },
});
