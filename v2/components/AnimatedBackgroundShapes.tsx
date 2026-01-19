import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface AnimatedBackgroundShapesProps {
  slideId: string;
  color: string;
  width: number;
  height: number;
}

type ShapeType = 'circle' | 'square' | 'diamond' | 'triangle';

interface ShapeConfig {
  type: ShapeType;
  size: number;
  x: number;
  y: number;
  initialRotation: number;
  rotationDuration: number;
  opacity: number;
}

// Simple hash function to get deterministic random values from slideId
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

// Seeded random number generator
const seededRandom = (seed: number, index: number): number => {
  const x = Math.sin(seed + index * 9999) * 10000;
  return x - Math.floor(x);
};

const SHAPE_TYPES: ShapeType[] = ['circle', 'square', 'diamond', 'triangle'];

const generateShapes = (slideId: string, width: number, height: number): ShapeConfig[] => {
  const seed = hashString(slideId);
  const shapeCount = 3 + Math.floor(seededRandom(seed, 0) * 3); // 3-5 shapes
  const shapes: ShapeConfig[] = [];

  for (let i = 0; i < shapeCount; i++) {
    const typeIndex = Math.floor(seededRandom(seed, i * 10 + 1) * SHAPE_TYPES.length);
    const size = 60 + seededRandom(seed, i * 10 + 2) * 100; // 60-160
    const x = seededRandom(seed, i * 10 + 3) * (width - size);
    const y = seededRandom(seed, i * 10 + 4) * (height - size);
    const initialRotation = seededRandom(seed, i * 10 + 5) * 360;
    const rotationDuration = 20000 + seededRandom(seed, i * 10 + 6) * 20000; // 20-40 seconds
    const opacity = 0.08 + seededRandom(seed, i * 10 + 7) * 0.07; // 0.08-0.15

    shapes.push({
      type: SHAPE_TYPES[typeIndex],
      size,
      x,
      y,
      initialRotation,
      rotationDuration,
      opacity,
    });
  }

  return shapes;
};

const Shape = ({ config, color }: { config: ShapeConfig; color: string }) => {
  const rotation = useSharedValue(config.initialRotation);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(config.initialRotation + 360, {
        duration: config.rotationDuration,
        easing: Easing.linear,
      }),
      -1, // infinite
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const shapeStyle = useMemo(() => {
    const base = {
      position: 'absolute' as const,
      left: config.x,
      top: config.y,
      width: config.size,
      height: config.size,
      opacity: config.opacity,
    };

    switch (config.type) {
      case 'circle':
        return {
          ...base,
          borderRadius: config.size / 2,
          backgroundColor: color,
        };
      case 'square':
        return {
          ...base,
          borderRadius: config.size * 0.1,
          backgroundColor: color,
        };
      case 'diamond':
        return {
          ...base,
          backgroundColor: color,
          transform: [{ rotate: '45deg' }],
        };
      case 'triangle':
        return {
          ...base,
          width: 0,
          height: 0,
          backgroundColor: 'transparent',
          borderLeftWidth: config.size / 2,
          borderRightWidth: config.size / 2,
          borderBottomWidth: config.size,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: color,
        };
      default:
        return base;
    }
  }, [config, color]);

  // For triangle, we need special handling since it uses borders
  if (config.type === 'triangle') {
    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: config.x,
            top: config.y,
            width: config.size,
            height: config.size,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: config.opacity,
          },
          animatedStyle,
        ]}
      >
        <View
          style={{
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderLeftWidth: config.size / 2,
            borderRightWidth: config.size / 2,
            borderBottomWidth: config.size,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: color,
          }}
        />
      </Animated.View>
    );
  }

  return <Animated.View style={[shapeStyle, animatedStyle]} />;
};

export const AnimatedBackgroundShapes = ({
  slideId,
  color,
  width,
  height,
}: AnimatedBackgroundShapesProps) => {
  const shapes = useMemo(
    () => generateShapes(slideId, width, height),
    [slideId, width, height]
  );

  return (
    <View style={styles.container} pointerEvents="none">
      {shapes.map((shape, index) => (
        <Shape key={`${slideId}-shape-${index}`} config={shape} color={color} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
});
