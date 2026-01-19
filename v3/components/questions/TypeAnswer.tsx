import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { TypeAnswerQuestion } from '@/types/question';
import { Colors } from '@/constants/Colors';

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
          placeholderTextColor={Colors.textLight}
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
  inputContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  input: {
    fontSize: 18,
    color: Colors.text,
    padding: 20,
    minHeight: 60,
  },
  inputCorrect: {
    fontSize: 18,
    color: Colors.success,
    fontWeight: '600',
    padding: 20,
    minHeight: 60,
    backgroundColor: Colors.successLight,
  },
  inputIncorrect: {
    fontSize: 18,
    color: Colors.error,
    fontWeight: '600',
    padding: 20,
    minHeight: 60,
    backgroundColor: Colors.errorLight,
  },
  correctAnswerContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: Colors.successLight,
    borderRadius: 12,
  },
  correctAnswerLabel: {
    fontSize: 14,
    color: Colors.success,
    marginBottom: 4,
  },
  correctAnswer: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.success,
  },
  successContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: Colors.successLight,
    borderRadius: 12,
    alignItems: 'center',
  },
  successText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.success,
  },
});
