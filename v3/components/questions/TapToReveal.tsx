import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';
import { TapToRevealQuestion } from '@/types/question';
import { Colors } from '@/constants/Colors';

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
  const flip = useSharedValue(0);

  React.useEffect(() => {
    flip.value = withSpring(isRevealed ? 1 : 0, { damping: 15 });
  }, [isRevealed, flip]);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flip.value, [0, 1], [0, 180]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flip.value, [0, 1], [180, 360]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>

      <Pressable
        style={styles.cardContainer}
        onPress={() => !isRevealed && onReveal()}
        disabled={isRevealed}
      >
        <Animated.View style={[styles.card, styles.cardFront, frontAnimatedStyle]}>
          <Text style={styles.tapHint}>Tap to reveal answer</Text>
          <View style={styles.iconContainer}>
            <Text style={styles.questionMark}>?</Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
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
  cardContainer: {
    height: 200,
    marginBottom: 24,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  cardFront: {
    backgroundColor: Colors.primary,
  },
  cardBack: {
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.success,
  },
  tapHint: {
    fontSize: 14,
    color: Colors.white + 'CC',
    marginBottom: 12,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white + '30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionMark: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.white,
  },
  answerLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  answer: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  selfAssessContainer: {
    alignItems: 'center',
  },
  selfAssessLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
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
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    alignItems: 'center',
  },
  selfAssessButtonCorrect: {
    borderColor: Colors.success,
    backgroundColor: Colors.successLight,
  },
  selfAssessButtonIncorrect: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorLight,
  },
  selfAssessButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  selfAssessButtonTextActive: {
    fontWeight: '700',
  },
  resultContainer: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  resultContainerCorrect: {
    backgroundColor: Colors.successLight,
  },
  resultContainerIncorrect: {
    backgroundColor: Colors.errorLight,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
});
