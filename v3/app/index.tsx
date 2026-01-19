import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuiz } from '@/context/QuizContext';
import { Button } from '@/components/common';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const { startQuiz } = useQuiz();

  const handleStartQuiz = () => {
    startQuiz();
    router.push('/quiz');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{'</>'}</Text>
          </View>
          <Text style={styles.title}>TechQuiz</Text>
          <Text style={styles.subtitle}>
            Test your programming and tech knowledge
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>10</Text>
            <Text style={styles.infoLabel}>Questions</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>7</Text>
            <Text style={styles.infoLabel}>Question Types</Text>
          </View>
        </View>

        <View style={styles.typesContainer}>
          <Text style={styles.typesTitle}>Question Formats</Text>
          <View style={styles.typesList}>
            {[
              'Multiple Choice',
              'True or False',
              'Fill in the Blank',
              'Type Answer',
              'Multi-Select',
              'Match Pairs',
              'Tap to Reveal',
            ].map((type, index) => (
              <View key={index} style={styles.typeItem}>
                <View style={styles.typeBullet} />
                <Text style={styles.typeText}>{type}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Start Quiz"
          onPress={handleStartQuiz}
          fullWidth
          size="large"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.white,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  infoDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 20,
  },
  typesContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  typesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  typesList: {
    gap: 10,
  },
  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: 12,
  },
  typeText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  footer: {
    padding: 24,
    paddingBottom: 16,
  },
});
