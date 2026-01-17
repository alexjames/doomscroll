import React from 'react';
import { View, StyleSheet } from 'react-native';

interface SlideIndicatorProps {
  totalSlides: number;
  currentSlide: number;
  color: string;
}

export const SlideIndicator = ({ totalSlides, currentSlide, color }: SlideIndicatorProps) => {
  const segmentWidth = 100 / totalSlides;
  const fillLeft = currentSlide * segmentWidth;

  return (
    <View style={styles.container}>
      <View style={[styles.track, { backgroundColor: color }]} />
      <View
        style={[
          styles.fill,
          {
            backgroundColor: color,
            left: `${fillLeft}%`,
            width: `${segmentWidth}%`,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 40,
    right: 40,
    height: 3,
  },
  track: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
    borderRadius: 1.5,
    opacity: 0.3,
  },
  fill: {
    position: 'absolute',
    left: 0,
    height: 3,
    borderRadius: 1.5,
  },
});
