import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorScheme, LightTheme, DarkTheme } from '@/constants/Colors';

type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeState {
  mode: ThemeMode;
  systemTheme: ColorSchemeName;
}

type ThemeAction =
  | { type: 'SET_MODE'; mode: ThemeMode }
  | { type: 'SET_SYSTEM_THEME'; theme: ColorSchemeName };

interface ThemeContextValue {
  mode: ThemeMode;
  colors: ColorScheme;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
}

const THEME_STORAGE_KEY = '@quiz_app_theme_mode';

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.mode };
    case 'SET_SYSTEM_THEME':
      return { ...state, systemTheme: action.theme };
    default:
      return state;
  }
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, {
    mode: 'light',
    systemTheme: Appearance.getColorScheme(),
  });

  // Load saved theme preference on mount
  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((saved) => {
      if (saved && ['light', 'dark', 'auto'].includes(saved)) {
        dispatch({ type: 'SET_MODE', mode: saved as ThemeMode });
      }
    });
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      dispatch({ type: 'SET_SYSTEM_THEME', theme: colorScheme });
    });
    return () => subscription.remove();
  }, []);

  const value = useMemo<ThemeContextValue>(() => {
    let activeTheme: 'light' | 'dark';

    if (state.mode === 'auto') {
      activeTheme = state.systemTheme === 'dark' ? 'dark' : 'light';
    } else {
      activeTheme = state.mode;
    }

    return {
      mode: state.mode,
      colors: activeTheme === 'dark' ? DarkTheme : LightTheme,
      isDark: activeTheme === 'dark',
      setThemeMode: (mode: ThemeMode) => {
        dispatch({ type: 'SET_MODE', mode });
        AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      },
    };
  }, [state]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
