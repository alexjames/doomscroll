import React, { useState, useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { MatchTheFollowingQuestion } from '@/types/question';
import { useTheme } from '@/context/ThemeContext';
import { ColorScheme } from '@/constants/Colors';
import { shuffleArray } from '@/utils/shuffle';

interface MatchTheFollowingProps {
  question: MatchTheFollowingQuestion;
  matches: Record<string, string>;
  onMatch: (leftId: string, rightId: string) => void;
  isSubmitted: boolean;
}

export function MatchTheFollowing({
  question,
  matches,
  onMatch,
  isSubmitted,
}: MatchTheFollowingProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  const shuffledRight = useMemo(
    () => shuffleArray(question.pairs.map((p) => ({ id: p.id, text: p.right }))),
    [question.pairs]
  );

  const handleLeftPress = (id: string) => {
    if (isSubmitted) return;
    setSelectedLeft(id);
  };

  const handleRightPress = (rightId: string) => {
    if (isSubmitted || !selectedLeft) return;
    onMatch(selectedLeft, rightId);
    setSelectedLeft(null);
  };

  const getMatchedRightId = (leftId: string) => matches?.[leftId];

  const isRightMatched = (rightId: string) =>
    matches ? Object.values(matches).includes(rightId) : false;

  const getLeftStyle = (id: string) => {
    const isSelected = selectedLeft === id;
    const matchedRightId = getMatchedRightId(id);
    const isCorrect = matchedRightId === id;

    if (isSubmitted && matchedRightId) {
      return isCorrect ? styles.itemCorrect : styles.itemIncorrect;
    }
    if (isSelected) {
      return styles.itemSelected;
    }
    if (matchedRightId) {
      return styles.itemMatched;
    }
    return styles.item;
  };

  const getRightStyle = (id: string) => {
    const matched = isRightMatched(id);
    const leftId = matches ? Object.keys(matches).find((key) => matches[key] === id) : undefined;
    const isCorrect = leftId === id;

    if (isSubmitted && matched) {
      return isCorrect ? styles.itemCorrect : styles.itemIncorrect;
    }
    if (matched) {
      return styles.itemMatched;
    }
    return styles.item;
  };

  const getMatchNumber = (leftId: string) => {
    const matchedRightId = getMatchedRightId(leftId);
    if (!matchedRightId) return null;
    return shuffledRight.findIndex((r) => r.id === matchedRightId) + 1;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      <Text style={styles.hint}>Tap a left item, then tap right item to match</Text>
      <ScrollView style={styles.matchContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.columns}>
          <View style={styles.column}>
            {question.pairs.map((pair) => {
              const matchNum = getMatchNumber(pair.id);
              return (
                <Pressable
                  key={pair.id}
                  style={getLeftStyle(pair.id)}
                  onPress={() => handleLeftPress(pair.id)}
                  disabled={isSubmitted}
                >
                  <Text style={styles.itemText}>{pair.left}</Text>
                  {matchNum && (
                    <View style={styles.matchBadge}>
                      <Text style={styles.matchBadgeText}>{matchNum}</Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
          <View style={styles.column}>
            {shuffledRight.map((item, index) => (
              <Pressable
                key={item.id}
                style={getRightStyle(item.id)}
                onPress={() => handleRightPress(item.id)}
                disabled={isSubmitted || isRightMatched(item.id)}
              >
                <View style={styles.numberBadge}>
                  <Text style={styles.numberBadgeText}>{index + 1}</Text>
                </View>
                <Text style={[styles.itemText, styles.rightItemText]}>
                  {item.text}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
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
      marginBottom: 8,
      lineHeight: 28,
    },
    hint: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 20,
    },
    matchContainer: {
      flex: 1,
    },
    columns: {
      flexDirection: 'row',
      gap: 12,
    },
    column: {
      flex: 1,
      gap: 10,
    },
    item: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 0,
      padding: 14,
      minHeight: 70,
      justifyContent: 'center',
    },
    itemSelected: {
      backgroundColor: colors.primary + '15',
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.primary,
      padding: 14,
      minHeight: 70,
      justifyContent: 'center',
    },
    itemMatched: {
      backgroundColor: colors.secondary + '15',
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.secondary,
      padding: 14,
      minHeight: 70,
      justifyContent: 'center',
    },
    itemCorrect: {
      backgroundColor: colors.successLight,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.success,
      padding: 14,
      minHeight: 70,
      justifyContent: 'center',
    },
    itemIncorrect: {
      backgroundColor: colors.errorLight,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.error,
      padding: 14,
      minHeight: 70,
      justifyContent: 'center',
    },
    itemText: {
      fontSize: 14,
      color: colors.text,
      fontWeight: '500',
    },
    rightItemText: {
      marginLeft: 32,
    },
    matchBadge: {
      position: 'absolute',
      top: 6,
      right: 6,
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: colors.secondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    matchBadgeText: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.white,
    },
    numberBadge: {
      position: 'absolute',
      top: 6,
      left: 6,
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: colors.textLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    numberBadgeText: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.white,
    },
  });
}
