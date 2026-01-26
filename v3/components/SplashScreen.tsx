import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const { colors } = useTheme();
  const { isInitialized, error } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Handle entrance animations and minimum display time
  useEffect(() => {
    // Fade in and scale up animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Minimum display time of 2 seconds
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim]);

  // Dismiss splash when both conditions are met
  useEffect(() => {
    if (minTimeElapsed && isInitialized && !isExiting) {
      setIsExiting(true);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }
  }, [minTimeElapsed, isInitialized, isExiting, fadeAnim, onFinish]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
          <Text style={styles.icon}>{'</>'}</Text>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>TechTok</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Learn. Quiz. Master.
        </Text>
        {error && (
          <Text style={[styles.errorText, { color: colors.error }]}>
            {error}
          </Text>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
