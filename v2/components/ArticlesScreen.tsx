import React from 'react';
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
    id: 'trending',
    label: 'Trending',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
  },
  {
    id: 'featured',
    label: 'Featured',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
  },
  {
    id: 'ai',
    label: 'Artificial Intelligence',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
    section: 'Software',
  },
  {
    id: 'web-dev',
    label: 'Web Development',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
    section: 'Software',
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400',
    section: 'Software',
  },
  {
    id: 'smartphones',
    label: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    section: 'Hardware',
  },
  {
    id: 'gadgets',
    label: 'Gadgets',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
    section: 'Hardware',
  },
  {
    id: 'gaming',
    label: 'Gaming',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
    section: 'Hardware',
  },
];

export const ArticlesScreen = () => {
  const renderCard = (category: Category) => {
    return (
      <TouchableOpacity
        key={category.id}
        style={styles.card}
        activeOpacity={0.8}
      >
        <Image source={{ uri: category.image }} style={styles.cardImage} />
        <View style={styles.cardOverlay} />
        <Text style={styles.cardLabel}>{category.label}</Text>
      </TouchableOpacity>
    );
  };

  const ungroupedCategories = CATEGORIES.filter(c => !c.section);
  const software = CATEGORIES.filter(c => c.section === 'Software');
  const hardware = CATEGORIES.filter(c => c.section === 'Hardware');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>Explore the latest in tech</Text>

        <View style={styles.grid}>
          {ungroupedCategories.map(renderCard)}
        </View>

        <Text style={styles.sectionTitle}>Software</Text>
        <View style={styles.grid}>
          {software.map(renderCard)}
        </View>

        <Text style={styles.sectionTitle}>Hardware</Text>
        <View style={styles.grid}>
          {hardware.map(renderCard)}
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
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
  bottomPadding: {
    height: 24,
  },
});
