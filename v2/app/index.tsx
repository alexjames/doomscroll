import React, { useState, useRef } from 'react';
import { FlatList, Dimensions, StyleSheet, ViewToken } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ContentItem } from '@/components/ContentItem';
import { SAMPLE_CONTENT } from '@/data/sample-content';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ContentFeedScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={SAMPLE_CONTENT}
        renderItem={({ item, index }) => (
          <ContentItem
            item={item}
            height={SCREEN_HEIGHT}
            isActive={index === currentIndex}
          />
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(data, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
