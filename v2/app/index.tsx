import React, { useState, useRef } from 'react';
import { FlatList, Dimensions, StyleSheet, ViewToken, Text, Animated, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ContentItem } from '@/components/ContentItem';
import { SAMPLE_CONTENT } from '@/data/sample-content';
import { COLOR_SCHEMES } from '@/constants/theme';
import { BottomNavBar } from '@/components/BottomNavBar';
import { ArticlesScreen } from '@/components/ArticlesScreen';

type TabType = 'articles' | 'shorts';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ContentFeedScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('shorts');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
      if (viewableItems[0].index > 0 && showSwipeHint) {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowSwipeHint(false);
        });
      }
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {activeTab === 'shorts' ? (
          <ThemedView style={styles.feedContainer}>
            <FlatList
              data={SAMPLE_CONTENT}
              renderItem={({ item, index }) => {
                const colorScheme = COLOR_SCHEMES[index % COLOR_SCHEMES.length];
                return (
                  <ContentItem
                    item={item}
                    height={SCREEN_HEIGHT - 80}
                    isActive={index === currentIndex}
                    colorScheme={colorScheme}
                  />
                );
              }}
              keyExtractor={(item) => item.id}
              pagingEnabled
              snapToInterval={SCREEN_HEIGHT - 80}
              snapToAlignment="start"
              decelerationRate="fast"
              showsVerticalScrollIndicator={false}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              getItemLayout={(_, index) => ({
                length: SCREEN_HEIGHT - 80,
                offset: (SCREEN_HEIGHT - 80) * index,
                index,
              })}
            />
            {showSwipeHint && (
              <Animated.View style={[styles.swipeHint, { opacity: fadeAnim }]}>
                <Text style={styles.swipeHintCaret}>^</Text>
                <Text style={styles.swipeHintText}>Swipe up for more</Text>
              </Animated.View>
            )}
          </ThemedView>
        ) : (
          <ArticlesScreen />
        )}
      </View>
      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
  },
  feedContainer: {
    flex: 1,
  },
  swipeHint: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingBottom: 10,
  },
  swipeHintCaret: {
    color: '#F5F5F5',
    fontSize: 20,
    marginBottom: -4,
  },
  swipeHintText: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
