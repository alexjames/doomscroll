import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { QuizProvider } from '@/context/QuizContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

function RootContent() {
  const { isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
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
          <RootContent />
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
