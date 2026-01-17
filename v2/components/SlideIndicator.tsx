import React from 'react';
import { View, StyleSheet } from 'react-native';

interface SlideIndicatorProps {
  totalSlides: number;
  currentSlide: number;
  color: string;
}

export const SlideIndicator = ({ totalSlides, currentSlide, color }: SlideIndicatorProps) => {
  return (
    <View style={[styles.container, { backgroundColor: `${color}4D` }]}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.segment,
            {
              backgroundColor: index === currentSlide ? color : 'transparent',
              borderRightWidth: index < totalSlides - 1 ? 2 : 0,
              borderRightColor: 'transparent',
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 40,
    right: 40,
    height: 5,
    borderRadius: 2.5,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  segment: {
    flex: 1,
    height: 5,
  },
});
