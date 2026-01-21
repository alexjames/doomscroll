import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StudyProgress } from '@/types/study';

const STORAGE_KEY = '@study_progress';

interface StudyContextType {
  progress: StudyProgress;
  expandedTopics: string[];
  getPageIndex: (subtopicId: string) => number;
  setPageIndex: (subtopicId: string, pageIndex: number) => void;
  toggleTopic: (topicId: string) => void;
  isTopicExpanded: (topicId: string) => boolean;
}

const StudyContext = createContext<StudyContextType | null>(null);

export function StudyProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<StudyProgress>({});
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from storage on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setProgress(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load study progress:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadProgress();
  }, []);

  // Save progress to storage whenever it changes
  useEffect(() => {
    if (!isLoaded) return;

    const saveProgress = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch (error) {
        console.error('Failed to save study progress:', error);
      }
    };

    saveProgress();
  }, [progress, isLoaded]);

  const getPageIndex = useCallback(
    (subtopicId: string): number => {
      return progress[subtopicId] ?? 0;
    },
    [progress]
  );

  const setPageIndex = useCallback((subtopicId: string, pageIndex: number) => {
    setProgress((prev) => ({
      ...prev,
      [subtopicId]: pageIndex,
    }));
  }, []);

  const toggleTopic = useCallback((topicId: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  }, []);

  const isTopicExpanded = useCallback(
    (topicId: string): boolean => {
      return expandedTopics.includes(topicId);
    },
    [expandedTopics]
  );

  return (
    <StudyContext.Provider
      value={{
        progress,
        expandedTopics,
        getPageIndex,
        setPageIndex,
        toggleTopic,
        isTopicExpanded,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
}
