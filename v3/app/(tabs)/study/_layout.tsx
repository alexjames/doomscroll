import { Stack } from 'expo-router';

export default function StudyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="[topicId]/[subtopicId]"
        options={{
          animation: 'slide_from_right',
          presentation: 'fullScreenModal',
        }}
      />
    </Stack>
  );
}
