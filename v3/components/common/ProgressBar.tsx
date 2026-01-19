import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';

interface ProgressBarProps {
  progress: number;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
}

export function ProgressBar({
  progress,
  height = 8,
  backgroundColor = Colors.border,
  progressColor = Colors.primary,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${clampedProgress * 100}%`, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }),
  }));

  return (
    <View style={[styles.container, { height, backgroundColor }]}>
      <Animated.View
        style={[
          styles.progress,
          { backgroundColor: progressColor },
          animatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 100,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 100,
  },
});
