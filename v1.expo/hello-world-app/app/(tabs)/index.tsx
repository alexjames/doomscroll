import React, { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Dimensions, Animated, View, Platform, SafeAreaView } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const { height, width } = Dimensions.get('window');
const HEADER_HEIGHT = 60;

const CARDS_DATA = [
  { id: '1', question: "execute typical instruction", answer: "1 nanosec" },
  { id: '2', question: "read from L1 cache memory", answer: "0.5 nanosec" },
  { id: '3', question: "branch misprediction", answer: "5 nanosec" },
  { id: '4', question: "read from L2 cache memory", answer: "7 nanosec" },
  { id: '5', question: "Mutex lock/unlock", answer: "25 nanosec" },
  { id: '6', question: "read from main memory", answer: "100 nanosec" },
  { id: '7', question: "send 2K bytes over 1Gbps network", answer: "20,000 nanosec" },
  { id: '8', question: "read 1MB sequentially from memory", answer: "250,000 nanosec" },
  { id: '9', question: "roundtrip time in the same datacenter", answer: "500,000 nanosec" },
  { id: '10', question: "read 1MB sequentially from SSD", answer: "1,000,000 nanosec" },
  { id: '11', question: "read from new disk location (disk seek)", answer: "8,000,000 nanosec" },
  { id: '12', question: "read 1MB sequentially from disk", answer: "20,000,000 nanosec" },
  { id: '13', question: "send packet US to Europe and back", answer: "150,000,000 nanosec" },
];

const FlashCard = ({ item, height }: { item: { question: string; answer: string }, height: number }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const val = useRef(0);

  animatedValue.addListener(({ value }) => {
    val.current = value;
  });

  const flipCard = () => {
    if (val.current >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <View style={[styles.cardContainer, { height }]}>
      <TouchableOpacity activeOpacity={1} onPress={flipCard} style={styles.touchable}>
        <View style={styles.flipCard}>
          <Animated.View style={[styles.flipCardInner, styles.flipCardFront, frontAnimatedStyle]}>
            <ThemedText type="title" style={styles.cardTitle}>Question</ThemedText>
            <ThemedText style={styles.questionText}>{item.question}</ThemedText>
            <ThemedText style={styles.hintText}>(Tap to flip)</ThemedText>
          </Animated.View>
          <Animated.View style={[styles.flipCardInner, styles.flipCardBack, backAnimatedStyle]}>
            <ThemedText type="title" style={styles.cardTitle}>Answer</ThemedText>
            <ThemedText style={styles.questionTextSmall}>{item.question}</ThemedText>
            <ThemedText style={styles.answerText}>{item.answer}</ThemedText>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function HomeScreen() {
  const [mode, setMode] = useState<'learn' | 'practice'>('learn');
  const [listHeight, setListHeight] = useState(height - HEADER_HEIGHT - 100);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={[styles.modeButton, mode === 'learn' && styles.activeMode]} 
            onPress={() => setMode('learn')}
          >
            <ThemedText style={[styles.modeText, mode === 'learn' && styles.activeModeText]}>Learn</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.modeButton, mode === 'practice' && styles.activeMode]} 
            onPress={() => setMode('practice')}
          >
            <ThemedText style={[styles.modeText, mode === 'practice' && styles.activeModeText]}>Practice</ThemedText>
          </TouchableOpacity>
        </View>

        {mode === 'learn' ? (
          <FlatList
            data={CARDS_DATA}
            renderItem={({ item }) => <FlashCard item={item} height={listHeight} />}
            keyExtractor={item => item.id}
            pagingEnabled
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}
            onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
            getItemLayout={(data, index) => (
              {length: listHeight, offset: listHeight * index, index}
            )}
          />
        ) : (
          <View style={styles.centerContainer}>
            <ThemedText>Practice Mode Coming Soon</ThemedText>
          </View>
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    height: HEADER_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    gap: 10,
  },
  modeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  activeMode: {
    backgroundColor: '#0a7ea4',
  },
  modeText: {
    fontWeight: 'bold',
    color: '#333',
  },
  activeModeText: {
    color: '#fff',
  },
  cardContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  touchable: {
    width: '100%',
    height: '100%',
  },
  flipCard: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCardInner: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flipCardFront: {
    backgroundColor: '#ffffff',
  },
  flipCardBack: {
    backgroundColor: '#ffc107',
    transform: [{ rotateY: '180deg' }],
  },
  cardTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
    color: '#121212',
  },
  questionTextSmall: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.7,
    color: '#121212',
  },
  answerText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#121212',
  },
  hintText: {
    marginTop: 20,
    opacity: 0.5,
    fontSize: 14,
    color: '#121212',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
