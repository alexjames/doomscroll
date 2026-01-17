import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TabType = 'articles' | 'shorts';

interface BottomNavBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNavBar = ({ activeTab, onTabChange }: BottomNavBarProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => onTabChange('articles')}
      >
        <Ionicons
          name="newspaper-outline"
          size={28}
          color={activeTab === 'articles' ? '#FFFFFF' : '#666666'}
        />
        <Text style={[styles.tabText, activeTab === 'articles' && styles.activeTabText]}>
          Articles
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => onTabChange('shorts')}
      >
        <Ionicons
          name="flash-outline"
          size={28}
          color={activeTab === 'shorts' ? '#FFFFFF' : '#666666'}
        />
        <Text style={[styles.tabText, activeTab === 'shorts' && styles.activeTabText]}>
          Shorts
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    paddingVertical: 4,
    paddingBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
});
