import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuiz } from '@/context/QuizContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/common';
import { ColorScheme } from '@/constants/Colors';

export default function ReviewScreen() {
  const { startQuiz } = useQuiz();
  const { mode, setThemeMode, colors, isDark } = useTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const handleStartQuiz = () => {
    startQuiz();
    router.push('/quiz');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{'</>'}</Text>
          </View>
          <Text style={styles.title}>TechQuiz</Text>
          <Text style={styles.subtitle}>
            Test your programming and tech knowledge
          </Text>
        </View>

        <View style={styles.themeContainer}>
          <Pressable
            style={[styles.themeOption, mode === 'light' && styles.themeOptionActive]}
            onPress={() => setThemeMode('light')}
          >
            <Ionicons
              name="sunny-outline"
              size={20}
              color={mode === 'light' ? colors.primary : colors.textSecondary}
            />
            <Text
              style={[
                styles.themeLabel,
                mode === 'light' && styles.themeLabelActive,
              ]}
            >
              Light
            </Text>
          </Pressable>

          <Pressable
            style={[styles.themeOption, mode === 'auto' && styles.themeOptionActive]}
            onPress={() => setThemeMode('auto')}
          >
            <Ionicons
              name="phone-portrait-outline"
              size={20}
              color={mode === 'auto' ? colors.primary : colors.textSecondary}
            />
            <Text
              style={[styles.themeLabel, mode === 'auto' && styles.themeLabelActive]}
            >
              Auto
            </Text>
          </Pressable>

          <Pressable
            style={[styles.themeOption, mode === 'dark' && styles.themeOptionActive]}
            onPress={() => setThemeMode('dark')}
          >
            <Ionicons
              name="moon-outline"
              size={20}
              color={mode === 'dark' ? colors.primary : colors.textSecondary}
            />
            <Text
              style={[styles.themeLabel, mode === 'dark' && styles.themeLabelActive]}
            >
              Dark
            </Text>
          </Pressable>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>10</Text>
            <Text style={styles.infoLabel}>Questions</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>9</Text>
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
              'Order Items',
              'Stack Items',
            ].map((type, index) => (
              <View key={index} style={styles.typeItem}>
                <View style={styles.typeBullet} />
                <Text style={styles.typeText}>{type}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

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

function createStyles(colors: ColorScheme, isDark: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
    },
    content: {
      padding: 24,
      paddingBottom: 16,
    },
    header: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 32,
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: 20,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    icon: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.white,
    },
    title: {
      fontSize: 36,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    themeContainer: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 4,
      marginBottom: 24,
      gap: 4,
    },
    themeOption: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 8,
      borderRadius: 8,
      gap: 6,
    },
    themeOptionActive: {
      backgroundColor: colors.primary + '15',
    },
    themeLabel: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.textSecondary,
    },
    themeLabelActive: {
      color: colors.primary,
      fontWeight: '600',
    },
    infoContainer: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.4 : 0.05,
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
      color: colors.primary,
      marginBottom: 4,
    },
    infoLabel: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    infoDivider: {
      width: 1,
      backgroundColor: colors.border,
      marginHorizontal: 20,
    },
    typesContainer: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.4 : 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    typesTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
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
      backgroundColor: colors.primary,
      marginRight: 12,
    },
    typeText: {
      fontSize: 15,
      color: colors.textSecondary,
    },
    footer: {
      padding: 24,
      paddingTop: 16,
      paddingBottom: 16,
    },
  });
}
