import { useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { QuizProvider } from '@/context/QuizContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { StudyProvider } from '@/context/StudyContext';
import { SplashScreen } from '@/components/SplashScreen';

function RootContent() {
  const { isDark } = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="quiz" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <ThemeProvider>
        <QuizProvider>
          <StudyProvider>
            <RootContent />
          </StudyProvider>
        </QuizProvider>
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
