import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HorizontalSlideViewer } from './HorizontalSlideViewer';
import { ContentData } from '@/types/content';
import { ColorScheme } from '@/constants/theme';

interface ContentItemProps {
  item: ContentData;
  height: number;
  isActive: boolean;
  colorScheme: ColorScheme;
}

export const ContentItem = React.memo(({ item, height, isActive, colorScheme }: ContentItemProps) => {
  return (
    <View style={[styles.container, { height }]}>
      <HorizontalSlideViewer
        slides={item.slides}
        contentId={item.id}
        backgroundColor={colorScheme.background}
        textColor={colorScheme.text}
      />
    </View>
  );
});

ContentItem.displayName = 'ContentItem';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
