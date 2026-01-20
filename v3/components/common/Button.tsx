import React, { useMemo } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  PressableProps,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ColorScheme } from '@/constants/Colors';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'error';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyles,
        pressed && !disabled && styles.pressed,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text style={textStyles}>{title}</Text>
    </Pressable>
  );
}

function createStyles(colors: ColorScheme) {
  return StyleSheet.create({
    base: {
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.secondary,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.primary,
    },
    success: {
      backgroundColor: colors.success,
    },
    error: {
      backgroundColor: colors.error,
    },
    small: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    medium: {
      paddingVertical: 14,
      paddingHorizontal: 24,
    },
    large: {
      paddingVertical: 18,
      paddingHorizontal: 32,
    },
    fullWidth: {
      width: '100%',
    },
    disabled: {
      backgroundColor: colors.border,
    },
    pressed: {
      opacity: 0.8,
      transform: [{ scale: 0.98 }],
    },
    text: {
      fontWeight: '600',
    },
    primaryText: {
      color: colors.white,
    },
    secondaryText: {
      color: colors.white,
    },
    outlineText: {
      color: colors.primary,
    },
    successText: {
      color: colors.white,
    },
    errorText: {
      color: colors.white,
    },
    smallText: {
      fontSize: 14,
    },
    mediumText: {
      fontSize: 16,
    },
    largeText: {
      fontSize: 18,
    },
    disabledText: {
      color: colors.textSecondary,
    },
  });
}
