import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HorizontalSlideViewer } from './HorizontalSlideViewer';
import { ContentData } from '@/types/content';

interface ContentItemProps {
  item: ContentData;
  height: number;
  isActive: boolean;
}

export const ContentItem = React.memo(({ item, height, isActive }: ContentItemProps) => {
  return (
    <View style={[styles.container, { height }]}>
      <HorizontalSlideViewer slides={item.slides} contentId={item.id} />
    </View>
  );
});

ContentItem.displayName = 'ContentItem';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
