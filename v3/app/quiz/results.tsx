import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useQuiz } from '@/context/QuizContext';
import { Button, Card } from '@/components/common';
import { Colors } from '@/constants/Colors';

export default function ResultsScreen() {
  const { result, session, resetQuiz, startQuiz } = useQuiz();

  const scoreScale = useSharedValue(0);
  const scoreOpacity = useSharedValue(0);

  useEffect(() => {
    if (!result) {
      router.replace('/');
      return;
    }

    scoreOpacity.value = withTiming(1, { duration: 300 });
    scoreScale.value = withDelay(
      200,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.2)) })
    );
  }, [result]);

  const scoreAnimatedStyle = useAnimatedStyle(() => ({
    opacity: scoreOpacity.value,
    transform: [{ scale: scoreScale.value }],
  }));

  if (!result || !session) {
    return null;
  }

  const getScoreMessage = () => {
    if (result.percentage >= 90) return 'Excellent!';
    if (result.percentage >= 70) return 'Great job!';
    if (result.percentage >= 50) return 'Good effort!';
    return 'Keep practicing!';
  };

  const getScoreColor = () => {
    if (result.percentage >= 70) return Colors.success;
    if (result.percentage >= 50) return Colors.warning;
    return Colors.error;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const handlePlayAgain = () => {
    resetQuiz();
    startQuiz();
    router.replace('/quiz');
  };

  const handleGoHome = () => {
    resetQuiz();
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Quiz Complete!</Text>

        <Animated.View style={[styles.scoreContainer, scoreAnimatedStyle]}>
          <View style={[styles.scoreCircle, { borderColor: getScoreColor() }]}>
            <Text style={[styles.scorePercentage, { color: getScoreColor() }]}>
              {result.percentage}%
            </Text>
            <Text style={styles.scoreLabel}>{getScoreMessage()}</Text>
          </View>
        </Animated.View>

        <Card style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{result.correctAnswers}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: Colors.error }]}>
                {result.incorrectAnswers}
              </Text>
              <Text style={styles.statLabel}>Incorrect</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatTime(result.timeTaken)}</Text>
              <Text style={styles.statLabel}>Time</Text>
            </View>
          </View>
        </Card>

        <View style={styles.reviewSection}>
          <Text style={styles.reviewTitle}>Question Review</Text>
          {result.questionResults.map((qResult, index) => {
            const question = session.questions.find(
              (q) => q.id === qResult.questionId
            );
            return (
              <View key={qResult.questionId} style={styles.reviewItem}>
                <View
                  style={[
                    styles.reviewIndicator,
                    {
                      backgroundColor: qResult.isCorrect
                        ? Colors.success
                        : Colors.error,
                    },
                  ]}
                />
                <View style={styles.reviewContent}>
                  <Text style={styles.reviewQuestion} numberOfLines={2}>
                    {index + 1}. {question?.question}
                  </Text>
                  <Text
                    style={[
                      styles.reviewStatus,
                      { color: qResult.isCorrect ? Colors.success : Colors.error },
                    ]}
                  >
                    {qResult.isCorrect ? 'Correct' : 'Incorrect'}
                    {qResult.pointsEarned > 0 && ` (+${qResult.pointsEarned} pts)`}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Play Again"
          onPress={handlePlayAgain}
          fullWidth
          size="large"
        />
        <Button
          title="Back to Home"
          onPress={handleGoHome}
          variant="outline"
          fullWidth
          size="medium"
          style={styles.secondaryButton}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 8,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  scorePercentage: {
    fontSize: 48,
    fontWeight: '700',
  },
  scoreLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  statsCard: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.success,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  reviewSection: {
    marginBottom: 16,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  reviewItem: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
  },
  reviewIndicator: {
    width: 6,
    height: '100%',
    minHeight: 40,
    borderRadius: 3,
    marginRight: 14,
  },
  reviewContent: {
    flex: 1,
  },
  reviewQuestion: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  reviewStatus: {
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    paddingTop: 16,
    gap: 12,
  },
  secondaryButton: {
    marginTop: 0,
  },
});
