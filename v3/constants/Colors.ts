export interface ColorScheme {
  primary: string;
  primaryLight: string;
  secondary: string;
  success: string;
  successLight: string;
  error: string;
  errorLight: string;
  warning: string;
  background: string;
  surface: string;
  surfaceSecondary: string;
  text: string;
  textSecondary: string;
  textLight: string;
  border: string;
  borderDark: string;
  white: string;
  black: string;
  shadowColor: string;
}

export const LightTheme: ColorScheme = {
  primary: '#6366F1',
  primaryLight: '#818CF8',
  secondary: '#8B5CF6',
  success: '#10B981',
  successLight: '#D1FAE5',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  warning: '#F59E0B',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  surfaceSecondary: '#E8E8E8',
  text: '#1E293B',
  textSecondary: '#64748B',
  textLight: '#94A3B8',
  border: '#E2E8F0',
  borderDark: '#CBD5E1',
  white: '#FFFFFF',
  black: '#000000',
  shadowColor: '#000000',
};

export const DarkTheme: ColorScheme = {
  primary: '#818CF8',
  primaryLight: '#A5B4FC',
  secondary: '#A78BFA',
  success: '#34D399',
  successLight: '#064E3B',
  error: '#F87171',
  errorLight: '#7F1D1D',
  warning: '#FBBF24',
  background: '#0F172A',
  surface: '#1E293B',
  surfaceSecondary: '#334155',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  textLight: '#64748B',
  border: '#334155',
  borderDark: '#475569',
  white: '#FFFFFF',
  black: '#000000',
  shadowColor: '#000000',
};

// Backward compatibility - keep default export
export const Colors = LightTheme;
