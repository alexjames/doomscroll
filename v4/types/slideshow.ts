export type SlideTextSize = 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';

export interface SlideTextElement {
  type: 'text';
  content: string; // Supports **bold**, *italic*, ***both***
  x: number; // X position as percentage (0-100)
  y: number; // Y position as percentage (0-100)
  size?: SlideTextSize; // defaults to 'medium'
  color?: string; // defaults to white
}

export interface SlideImageElement {
  type: 'image';
  url: string;
  x: number; // X position as percentage (0-100)
  y: number; // Y position as percentage (0-100)
  width?: number; // percentage of screen width (0-100), defaults to 50
  height?: number; // percentage of screen height (0-100), defaults to 50
}

export type SlideElement = SlideTextElement | SlideImageElement;

export interface Slide {
  id: string;
  elements: SlideElement[];
}

// Text size mapping in pixels
export const TEXT_SIZES: Record<SlideTextSize, number> = {
  small: 14,
  medium: 20,
  large: 28,
  xlarge: 36,
  xxlarge: 48,
};
