import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Slide } from '@/types/content';
import { Fonts } from '@/constants/theme';

interface SlideCardProps {
  slide: Slide;
  width: number;
  height: number;
  backgroundColor: string;
  textColor: string;
}

export const SlideCard = ({ slide, width, height, backgroundColor, textColor }: SlideCardProps) => {
  return (
    <View style={[styles.container, { width, height, backgroundColor }]}>
      {slide.headline && (
        <Text style={[styles.headline, { color: textColor }]}>
          {slide.headline}
        </Text>
      )}
      <Text style={[styles.text, { color: textColor }]}>
        {slide.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  headline: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: Fonts?.serif || 'serif',
    fontWeight: 'bold',
    marginBottom: 24,
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 40,
    fontFamily: Fonts?.serif || 'serif',
  },
});
