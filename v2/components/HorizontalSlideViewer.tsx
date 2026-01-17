import React, { useState, useRef } from 'react';
import { ScrollView, Dimensions, StyleSheet, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { SlideCard } from './SlideCard';
import { SlideIndicator } from './SlideIndicator';
import { Slide } from '@/types/content';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface HorizontalSlideViewerProps {
  slides: Slide[];
  contentId: string;
  backgroundColor: string;
  textColor: string;
  height: number;
}

export const HorizontalSlideViewer = ({ slides, contentId, backgroundColor, textColor, height }: HorizontalSlideViewerProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (index !== currentSlideIndex) {
      setCurrentSlideIndex(index);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SCREEN_WIDTH}
        snapToAlignment="start"
      >
        {slides.map((slide) => (
          <SlideCard
            key={slide.id}
            slide={slide}
            width={SCREEN_WIDTH}
            height={height}
            backgroundColor={backgroundColor}
            textColor={textColor}
          />
        ))}
      </ScrollView>
      {slides.length > 1 && (
        <SlideIndicator
          totalSlides={slides.length}
          currentSlide={currentSlideIndex}
          color={textColor}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
