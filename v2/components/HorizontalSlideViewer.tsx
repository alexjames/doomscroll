import React, { useState, useRef } from 'react';
import { ScrollView, Dimensions, StyleSheet, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { SlideCard } from './SlideCard';
import { SlideIndicator } from './SlideIndicator';
import { Slide } from '@/types/content';
import { ThemedView } from './themed-view';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface HorizontalSlideViewerProps {
  slides: Slide[];
  contentId: string;
}

export const HorizontalSlideViewer = ({ slides, contentId }: HorizontalSlideViewerProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentSlideIndex(index);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        decelerationRate="fast"
        snapToInterval={SCREEN_WIDTH}
        snapToAlignment="start"
      >
        {slides.map((slide) => (
          <SlideCard
            key={slide.id}
            slide={slide}
            width={SCREEN_WIDTH}
            height={SCREEN_HEIGHT}
          />
        ))}
      </ScrollView>
      {slides.length > 1 && (
        <SlideIndicator
          totalSlides={slides.length}
          currentSlide={currentSlideIndex}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
