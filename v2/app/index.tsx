import React, { useState, useRef } from 'react';
import { FlatList, StyleSheet, ViewToken, Text, Animated, View, LayoutChangeEvent } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ContentItem } from '@/components/ContentItem';
import { SAMPLE_CONTENT } from '@/data/sample-content';
import { COLOR_SCHEMES } from '@/constants/theme';
import { BottomNavBar } from '@/components/BottomNavBar';
import { ArticlesScreen } from '@/components/ArticlesScreen';

type TabType = 'articles' | 'shorts';

export default function ContentFeedScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('shorts');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [contentHeight, setContentHeight] = useState(0);
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

  const handleContentLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content} onLayout={handleContentLayout}>
        {activeTab === 'shorts' ? (
          <ThemedView style={styles.feedContainer}>
            {contentHeight > 0 && (
              <FlatList
                data={SAMPLE_CONTENT}
                renderItem={({ item, index }) => {
                  const colorScheme = COLOR_SCHEMES[index % COLOR_SCHEMES.length];
                  return (
                    <ContentItem
                      item={item}
                      height={contentHeight}
                      isActive={index === currentIndex}
                      colorScheme={colorScheme}
                    />
                  );
                }}
                keyExtractor={(item) => item.id}
                pagingEnabled
                snapToInterval={contentHeight}
                snapToAlignment="start"
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                getItemLayout={(_, index) => ({
                  length: contentHeight,
                  offset: contentHeight * index,
                  index,
                })}
              />
            )}
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
