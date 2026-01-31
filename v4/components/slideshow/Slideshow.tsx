import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Slide } from '../../types/slideshow';
import { SlideView } from './SlideView';
import { SlideshowComplete } from './SlideshowComplete';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SlideshowProps {
  slides: Slide[];
  onExit: () => void;
}

export function Slideshow({ slides, onExit }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Total items = slides + 1 completion screen
  const totalItems = slides.length + 1;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (index !== currentIndex && index >= 0 && index < totalItems) {
      setCurrentIndex(index);
    }
  };

  const progress = (currentIndex + 1) / totalItems;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Progress bar at top */}
      <SafeAreaView style={styles.progressBarContainer} edges={['top']}>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>
      </SafeAreaView>

      {/* Exit button - below progress bar */}
      <SafeAreaView style={styles.exitContainer} edges={['top']}>
        <TouchableOpacity onPress={onExit} style={styles.exitButton}>
          <Ionicons name="close" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Horizontal scrolling slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide) => (
          <SlideView key={slide.id} slide={slide} />
        ))}
        <SlideshowComplete onExit={onExit} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  progressBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 11,
  },
  progressBarTrack: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  exitContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  exitButton: {
    width: 44,
    height: 44,
    marginLeft: 16,
    marginTop: 8,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  scrollView: {
    flex: 1,
  },
});
