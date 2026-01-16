import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

interface SlideIndicatorProps {
  totalSlides: number;
  currentSlide: number;
}

export const SlideIndicator = ({ totalSlides, currentSlide }: SlideIndicatorProps) => {
  const activeDotColor = useThemeColor({}, 'tint');
  const inactiveDotColor = useThemeColor({ light: '#CCCCCC', dark: '#555555' }, 'icon');

  return (
    <View style={styles.container}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: index === currentSlide ? activeDotColor : inactiveDotColor,
              opacity: index === currentSlide ? 1 : 0.5,
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
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
