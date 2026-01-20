import React, { useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ColorScheme } from '@/constants/Colors';

interface ProgressBarProps {
  progress: number;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
}

export function ProgressBar({
  progress,
  height = 8,
  backgroundColor,
  progressColor,
}: ProgressBarProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const defaultBgColor = backgroundColor || colors.border;
  const defaultProgressColor = progressColor || colors.primary;

  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: clampedProgress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [clampedProgress, widthAnim]);

  return (
    <View style={[styles.container, { height, backgroundColor: defaultBgColor }]}>
      <Animated.View
        style={[
          styles.progress,
          { backgroundColor: defaultProgressColor },
          {
            width: widthAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
}

function createStyles(colors: ColorScheme) {
  return StyleSheet.create({
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
}
