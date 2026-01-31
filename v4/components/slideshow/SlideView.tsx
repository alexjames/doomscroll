import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Slide } from '../../types/slideshow';
import { SlideElement } from './SlideElement';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SlideViewProps {
  slide: Slide;
}

export function SlideView({ slide }: SlideViewProps) {
  const insets = useSafeAreaInsets();

  // Calculate content area excluding safe areas and UI elements
  const contentTop = insets.top + 60; // Extra space for exit button
  const contentBottom = insets.bottom + 50; // Extra space for progress dots
  const contentHeight = SCREEN_HEIGHT - contentTop - contentBottom;

  // Separate images and text elements - render images first (behind text)
  const imageElements = slide.elements.filter((el) => el.type === 'image');
  const textElements = slide.elements.filter((el) => el.type === 'text');

  return (
    <View style={styles.container}>
      {/* Render images first (behind) */}
      {imageElements.map((element, index) => (
        <SlideElement
          key={`${slide.id}-img-${index}`}
          element={element}
          screenWidth={SCREEN_WIDTH}
          contentTop={contentTop}
          contentHeight={contentHeight}
        />
      ))}
      {/* Render text on top */}
      {textElements.map((element, index) => (
        <SlideElement
          key={`${slide.id}-txt-${index}`}
          element={element}
          screenWidth={SCREEN_WIDTH}
          contentTop={contentTop}
          contentHeight={contentHeight}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#000000',
  },
});
