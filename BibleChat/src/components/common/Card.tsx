// Bible Chat — Reusable Card Component

import React from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { Colors, BorderRadius, Shadows, Spacing } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  elevated?: boolean;
  padding?: number;
}

export default function Card({ children, style, onPress, elevated = false, padding = Spacing.lg }: CardProps) {
  const cardStyle = [
    styles.card,
    elevated && Shadows.lg,
    !elevated && Shadows.sm,
    { padding },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          ...cardStyle,
          pressed && styles.pressed,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginVertical: Spacing.sm,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
});
