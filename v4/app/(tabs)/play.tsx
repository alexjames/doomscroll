import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { FlashCard } from '../../components/FlashCard';
import { flashcards } from '../../data/flashcards';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function PlayScreen() {
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set());
  const scrollViewRef = useRef<ScrollView>(null);

  // Calculate card height (screen height minus header and safe areas)
  const cardHeight = SCREEN_HEIGHT - 160;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / cardHeight);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < flashcards.length) {
      setCurrentIndex(newIndex);
    }
  };

  const handleCardTap = (cardId: string) => {
    setRevealedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Play</Text>
        <View style={styles.progressContainer}>
          {flashcards.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                {
                  backgroundColor: index === currentIndex ? colors.primary : colors.border,
                },
              ]}
            />
          ))}
        </View>
        <Text style={[styles.counter, { color: colors.textMuted }]}>
          {currentIndex + 1} / {flashcards.length}
        </Text>
      </View>

      {/* Swipeable Cards */}
      <ScrollView
        ref={scrollViewRef}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={cardHeight}
        snapToAlignment="start"
        contentContainerStyle={styles.scrollContent}
      >
        {flashcards.map((card) => (
          <View key={card.id} style={[styles.cardContainer, { height: cardHeight }]}>
            <FlashCard
              card={card}
              isRevealed={revealedCards.has(card.id)}
              onTap={() => handleCardTap(card.id)}
            />
          </View>
        ))}
      </ScrollView>

      {/* Swipe hint */}
      <View style={styles.swipeHint}>
        <Text style={[styles.swipeHintText, { color: colors.textMuted }]}>
          Swipe up for next card
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 200,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  counter: {
    fontSize: 14,
    fontWeight: '500',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  cardContainer: {
    width: '100%',
  },
  swipeHint: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  swipeHintText: {
    fontSize: 13,
    fontWeight: '500',
  },
});
