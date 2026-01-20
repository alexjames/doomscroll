import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuiz } from '@/context/QuizContext';
import { Button, Card } from '@/components/common';
import { useTheme } from '@/context/ThemeContext';
import { ColorScheme } from '@/constants/Colors';

export default function ResultsScreen() {
  const { result, session, resetQuiz, startQuiz } = useQuiz();
  const { colors, isDark } = useTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const scoreScale = useRef(new Animated.Value(0)).current;
  const scoreOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!result) {
      router.replace('/');
      return;
    }

    Animated.sequence([
      Animated.timing(scoreOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scoreScale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [result, scoreOpacity, scoreScale]);

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
    if (result.percentage >= 70) return colors.success;
    if (result.percentage >= 50) return colors.warning;
    return colors.error;
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

        <Animated.View
          style={[
            styles.scoreContainer,
            {
              opacity: scoreOpacity,
              transform: [{ scale: scoreScale }],
            },
          ]}
        >
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
              <Text style={[styles.statValue, { color: colors.error }]}>
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
                        ? colors.success
                        : colors.error,
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
                      { color: qResult.isCorrect ? colors.success : colors.error },
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

function createStyles(colors: ColorScheme, isDark: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
      color: colors.text,
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
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.4 : 0.1,
      shadowRadius: 12,
      elevation: 5,
    },
    scorePercentage: {
      fontSize: 48,
      fontWeight: '700',
    },
    scoreLabel: {
      fontSize: 16,
      color: colors.textSecondary,
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
      color: colors.success,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    statDivider: {
      width: 1,
      height: 40,
      backgroundColor: colors.border,
    },
    reviewSection: {
      marginBottom: 16,
    },
    reviewTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
    },
    reviewItem: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
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
      color: colors.text,
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
}
