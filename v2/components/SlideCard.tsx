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
  isFirstSlide?: boolean;
}

const getTextSizing = (fieldCount: number, totalCharCount: number) => {
  // Base sizing on field count
  let baseFontSize: number;
  let gap: number;

  if (fieldCount <= 1) {
    baseFontSize = 28;
    gap = 24;
  } else if (fieldCount <= 3) {
    baseFontSize = 24;
    gap = 20;
  } else if (fieldCount <= 5) {
    baseFontSize = 20;
    gap = 16;
  } else {
    baseFontSize = 16;
    gap = 12;
  }

  // Reduce font size for very long text
  let fontSize = baseFontSize;
  if (totalCharCount > 600) {
    fontSize = Math.max(14, baseFontSize - 6);
  } else if (totalCharCount > 400) {
    fontSize = Math.max(16, baseFontSize - 4);
  } else if (totalCharCount > 250) {
    fontSize = Math.max(18, baseFontSize - 2);
  }

  const lineHeight = Math.round(fontSize * 1.4);

  return { fontSize, lineHeight, gap };
};

export const SlideCard = ({ slide, width, height, backgroundColor, textColor, isFirstSlide = false }: SlideCardProps) => {
  const hasImage = !!slide.image;
  const hasHeadline = !!slide.headline;

  const textFields = Array.isArray(slide.text) ? slide.text : (slide.text ? [slide.text] : []);
  const hasText = textFields.length > 0;
  const isImageOnly = hasImage && !hasText && !hasHeadline;

  const totalCharCount = textFields.reduce((sum, text) => sum + text.length, 0);
  const { fontSize, lineHeight, gap } = getTextSizing(textFields.length, totalCharCount);

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
        <View style={[styles.textContainer, { gap }]}>
          {textFields.map((text, index) => (
            <Text
              key={index}
              style={[
                styles.text,
                {
                  color: textColor,
                  fontSize,
                  lineHeight,
                  textAlign: isFirstSlide ? 'center' : 'justify',
                },
              ]}
            >
              {text}
            </Text>
          ))}
        </View>
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
  textContainer: {
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts?.serif || 'serif',
  },
});
