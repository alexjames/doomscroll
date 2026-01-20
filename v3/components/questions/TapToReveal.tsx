import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { TapToRevealQuestion } from '@/types/question';
import { useTheme } from '@/context/ThemeContext';
import { ColorScheme } from '@/constants/Colors';

interface TapToRevealProps {
  question: TapToRevealQuestion;
  isRevealed: boolean;
  onReveal: () => void;
  selfMarkedCorrect: boolean | null;
  onSelfAssess: (correct: boolean) => void;
  isSubmitted: boolean;
}

export function TapToReveal({
  question,
  isRevealed,
  onReveal,
  selfMarkedCorrect,
  onSelfAssess,
  isSubmitted,
}: TapToRevealProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(flipAnim, {
      toValue: isRevealed ? 1 : 0,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  }, [isRevealed, flipAnim]);

  const frontRotation = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backRotation = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>

      <Pressable
        style={styles.cardContainer}
        onPress={() => !isRevealed && onReveal()}
        disabled={isRevealed}
      >
        <Animated.View
          style={[
            styles.card,
            styles.cardFront,
            {
              transform: [{ perspective: 1000 }, { rotateY: frontRotation }],
              opacity: frontOpacity,
            },
          ]}
        >
          <Text style={styles.tapHint}>Tap to reveal answer</Text>
          <View style={styles.iconContainer}>
            <Text style={styles.questionMark}>?</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            {
              transform: [{ perspective: 1000 }, { rotateY: backRotation }],
              opacity: backOpacity,
            },
          ]}
        >
          <Text style={styles.answerLabel}>Answer</Text>
          <Text style={styles.answer}>{question.answer}</Text>
        </Animated.View>
      </Pressable>

      {isRevealed && !isSubmitted && (
        <View style={styles.selfAssessContainer}>
          <Text style={styles.selfAssessLabel}>Did you know the answer?</Text>
          <View style={styles.selfAssessButtons}>
            <Pressable
              style={[
                styles.selfAssessButton,
                selfMarkedCorrect === true && styles.selfAssessButtonCorrect,
              ]}
              onPress={() => onSelfAssess(true)}
            >
              <Text
                style={[
                  styles.selfAssessButtonText,
                  selfMarkedCorrect === true && styles.selfAssessButtonTextActive,
                ]}
              >
                I knew it
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.selfAssessButton,
                selfMarkedCorrect === false && styles.selfAssessButtonIncorrect,
              ]}
              onPress={() => onSelfAssess(false)}
            >
              <Text
                style={[
                  styles.selfAssessButtonText,
                  selfMarkedCorrect === false && styles.selfAssessButtonTextActive,
                ]}
              >
                I didn't know
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      {isSubmitted && (
        <View
          style={[
            styles.resultContainer,
            selfMarkedCorrect
              ? styles.resultContainerCorrect
              : styles.resultContainerIncorrect,
          ]}
        >
          <Text style={styles.resultText}>
            {selfMarkedCorrect
              ? 'Marked as correct'
              : 'Marked as incorrect'}
          </Text>
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
    cardContainer: {
      height: 200,
      marginBottom: 24,
    },
    card: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      backfaceVisibility: 'hidden',
    },
    cardFront: {
      backgroundColor: colors.primary,
    },
    cardBack: {
      backgroundColor: colors.surface,
      borderWidth: 2,
      borderColor: colors.success,
    },
    tapHint: {
      fontSize: 14,
      color: colors.white + 'CC',
      marginBottom: 12,
    },
    iconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.white + '30',
      alignItems: 'center',
      justifyContent: 'center',
    },
    questionMark: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.white,
    },
    answerLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    answer: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      textAlign: 'center',
    },
    selfAssessContainer: {
      alignItems: 'center',
    },
    selfAssessLabel: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 16,
    },
    selfAssessButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    selfAssessButton: {
      flex: 1,
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 24,
      borderWidth: 0,
      backgroundColor: colors.surface,
      alignItems: 'center',
    },
    selfAssessButtonCorrect: {
      borderColor: colors.success,
      backgroundColor: colors.successLight,
    },
    selfAssessButtonIncorrect: {
      borderColor: colors.error,
      backgroundColor: colors.errorLight,
    },
    selfAssessButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    selfAssessButtonTextActive: {
      fontWeight: '700',
    },
    resultContainer: {
      padding: 16,
      borderRadius: 24,
      alignItems: 'center',
    },
    resultContainerCorrect: {
      backgroundColor: colors.successLight,
    },
    resultContainerIncorrect: {
      backgroundColor: colors.errorLight,
    },
    resultText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
  });
}
