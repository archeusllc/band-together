import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { tailwind } from '@theme';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: any;
}

/**
 * Skeleton component with pulsing animation
 * Used for loading states to improve perceived performance
 */
export const Skeleton = ({
  width = '100%',
  height = 16,
  borderRadius = 4,
  style,
}: SkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
      className={`${tailwind.activeBackground.both}`}
    />
  );
};
