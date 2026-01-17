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

const getTextSizing = (fieldCount: number) => {
  if (fieldCount <= 1) return { fontSize: 28, lineHeight: 40, gap: 24 };
  if (fieldCount <= 3) return { fontSize: 24, lineHeight: 34, gap: 20 };
  if (fieldCount <= 5) return { fontSize: 20, lineHeight: 28, gap: 16 };
  return { fontSize: 16, lineHeight: 22, gap: 12 };
};

export const SlideCard = ({ slide, width, height, backgroundColor, textColor }: SlideCardProps) => {
  const hasImage = !!slide.image;
  const hasHeadline = !!slide.headline;

  const textFields = Array.isArray(slide.text) ? slide.text : (slide.text ? [slide.text] : []);
  const hasText = textFields.length > 0;
  const isImageOnly = hasImage && !hasText && !hasHeadline;

  const { fontSize, lineHeight, gap } = getTextSizing(textFields.length);

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
                { color: textColor, fontSize, lineHeight },
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
    textAlign: 'center',
    fontFamily: Fonts?.serif || 'serif',
  },
});
