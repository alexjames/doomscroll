import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuiz } from '@/context/QuizContext';
import { QuestionContainer } from '@/components/questions';
import { ProgressBar } from '@/components/common';
import { Colors } from '@/constants/Colors';

export default function QuizScreen() {
  const {
    session,
    currentQuestion,
    currentAnswer,
    isLastQuestion,
    submitAnswer,
    nextQuestion,
    finishQuiz,
  } = useQuiz();

  useEffect(() => {
    if (!session || session.status !== 'in_progress') {
      router.replace('/');
    }
  }, [session]);

  if (!session || !currentQuestion) {
    return null;
  }

  const progress = (session.currentQuestionIndex + 1) / session.questions.length;

  const handleNext = () => {
    if (isLastQuestion) {
      finishQuiz();
      router.replace('/quiz/results');
    } else {
      nextQuestion();
    }
  };

  const handleExit = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleExit} style={styles.exitButton}>
          <Ionicons name="close" size={24} color={Colors.textSecondary} />
        </Pressable>
        <View style={styles.progressInfo}>
          <Text style={styles.questionNumber}>
            Question {session.currentQuestionIndex + 1} of {session.questions.length}
          </Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.progressContainer}>
        <ProgressBar progress={progress} />
      </View>

      {currentQuestion.category && (
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{currentQuestion.category}</Text>
        </View>
      )}

      <View style={styles.content}>
        <QuestionContainer
          question={currentQuestion}
          currentAnswer={currentAnswer}
          onSubmitAnswer={(answer) => submitAnswer(currentQuestion.id, answer)}
          onNext={handleNext}
          isLastQuestion={isLastQuestion}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  exitButton: {
    padding: 8,
  },
  exitText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  progressInfo: {
    alignItems: 'center',
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  placeholder: {
    width: 50,
  },
  progressContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  categoryContainer: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
