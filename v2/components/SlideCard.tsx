import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';
import { Slide } from '@/types/content';

interface SlideCardProps {
  slide: Slide;
  width: number;
  height: number;
}

export const SlideCard = ({ slide, width, height }: SlideCardProps) => {
  return (
    <ThemedView style={[styles.container, { width, height }]}>
      <ThemedText type="title" style={styles.text}>
        {slide.text}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 40,
  },
});
