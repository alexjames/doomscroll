/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const mintGreenBackground = '#9FD9D4';
const darkCharcoalText = '#2C3E50';
const darkTealTint = '#1B4D5C';
const mintGreenIcon = '#6BABA5';

export const Colors = {
  light: {
    text: darkCharcoalText,
    background: mintGreenBackground,
    tint: darkTealTint,
    icon: mintGreenIcon,
    tabIconDefault: mintGreenIcon,
    tabIconSelected: darkTealTint,
  },
  dark: {
    text: darkCharcoalText,
    background: mintGreenBackground,
    tint: darkTealTint,
    icon: mintGreenIcon,
    tabIconDefault: mintGreenIcon,
    tabIconSelected: darkTealTint,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export interface ColorScheme {
  background: string;
  text: string;
  tint: string;
}

export const COLOR_SCHEMES: ColorScheme[] = [
  {
    background: '#9FD9D4', // Mint Green
    text: '#2C3E50',
    tint: '#1B4D5C',
  },
  {
    background: '#FFB5A7', // Coral
    text: '#5C3A3A',
    tint: '#8B4F47',
  },
  {
    background: '#C8B6E2', // Lavender
    text: '#3E2B52',
    tint: '#5C4370',
  },
  {
    background: '#FFD4A3', // Peach
    text: '#5C4430',
    tint: '#8B6842',
  },
  {
    background: '#A7D8DE', // Sky Blue
    text: '#2B4C5C',
    tint: '#1B3847',
  },
  {
    background: '#F5C2C7', // Rose Pink
    text: '#5C3038',
    tint: '#8B4853',
  },
  {
    background: '#BFEAD5', // Sage Green
    text: '#2F4538',
    tint: '#1F3528',
  },
  {
    background: '#E8D4B8', // Cream
    text: '#4A3D2E',
    tint: '#6B5A42',
  },
  {
    background: '#D4C5F9', // Periwinkle
    text: '#3B2E52',
    tint: '#5A4370',
  },
  {
    background: '#FFE5B4', // Vanilla
    text: '#5C4E30',
    tint: '#8B7542',
  },
  {
    background: '#B8E6E6', // Aqua
    text: '#2B4C4C',
    tint: '#1B3838',
  },
  {
    background: '#F4D4DC', // Blush
    text: '#5C3A42',
    tint: '#8B5763',
  },
];
