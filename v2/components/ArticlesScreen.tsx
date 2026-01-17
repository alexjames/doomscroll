import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_GAP = 12;
const CARD_WIDTH = (SCREEN_WIDTH - 48 - CARD_GAP) / 2;

interface Category {
  id: string;
  label: string;
  image: string;
  section?: string;
}

const CATEGORIES: Category[] = [
  {
    id: 'favorites',
    label: 'Favorites',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400',
  },
  {
    id: 'general',
    label: 'General',
    image: 'https://images.unsplash.com/photo-1534312527009-56c7016453e6?w=400',
  },
  {
    id: 'growth-mindset',
    label: 'Growth mindset',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400',
    section: 'Personal growth',
  },
  {
    id: 'believing-yourself',
    label: 'Believing in yourself',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400',
    section: 'Personal growth',
  },
  {
    id: 'reducing-anxiety',
    label: 'Reducing anxiety',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
    section: 'Self-care',
  },
  {
    id: 'improving-relationships',
    label: 'Improving relationships',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
    section: 'Self-care',
  },
];

export const ArticlesScreen = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['general', 'growth-mindset', 'improving-relationships']);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const renderCard = (category: Category) => {
    const isSelected = selectedIds.includes(category.id);
    return (
      <TouchableOpacity
        key={category.id}
        style={styles.card}
        onPress={() => toggleSelection(category.id)}
        activeOpacity={0.8}
      >
        <Image source={{ uri: category.image }} style={styles.cardImage} />
        <View style={styles.cardOverlay} />
        <Text style={styles.cardLabel}>{category.label}</Text>
        {isSelected && (
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const ungroupedCategories = CATEGORIES.filter(c => !c.section);
  const personalGrowth = CATEGORIES.filter(c => c.section === 'Personal growth');
  const selfCare = CATEGORIES.filter(c => c.section === 'Self-care');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>Choose the areas you want to grow in</Text>

        <View style={styles.grid}>
          {ungroupedCategories.map(renderCard)}
        </View>

        <Text style={styles.sectionTitle}>Personal growth</Text>
        <View style={styles.grid}>
          {personalGrowth.map(renderCard)}
        </View>

        <Text style={styles.sectionTitle}>Self-care</Text>
        <View style={styles.grid}>
          {selfCare.map(renderCard)}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333333',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginTop: 24,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CARD_GAP,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.85,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  cardLabel: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomPadding: {
    height: 24,
  },
});
