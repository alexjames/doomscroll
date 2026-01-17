import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
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
  const hasImage = !!slide.image;
  const hasText = !!slide.text;
  const hasHeadline = !!slide.headline;
  const isImageOnly = hasImage && !hasText && !hasHeadline;

  return (
    <View style={[styles.container, { width, height, backgroundColor }]}>
      {hasHeadline && (
        <Text style={[styles.headline, { color: textColor }]}>
          {slide.headline}
        </Text>
      )}
      {hasImage && (
        <Image
          source={{ uri: slide.image }}
          style={[
            styles.image,
            {
              maxWidth: width * 0.8,
              maxHeight: isImageOnly ? height * 0.7 : height * 0.5,
            },
          ]}
          resizeMode="contain"
        />
      )}
      {hasText && (
        <Text style={[styles.text, { color: textColor }]}>
          {slide.text}
        </Text>
      )}
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
  image: {
    width: '100%',
    height: '100%',
    marginVertical: 16,
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 40,
    fontFamily: Fonts?.serif || 'serif',
  },
});
