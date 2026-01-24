import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { tailwind, colors } from '@theme';
import { IconSymbol } from './IconSymbol';

export interface UserPresence {
  connectionId: string;
  userId: string | null;
  userName: string;
  isAuthenticated: boolean;
  isEditing: boolean;
  joinedAt: Date;
}

interface PresenceBadgeProps {
  presence: UserPresence[];
  onPress?: () => void;
}

/**
 * Badge component displaying real-time viewer count for collaborative editing
 * Shows "Live: {count} viewers" with a people icon
 * Color changes based on user count (green when multiple, gray when solo)
 */
export const PresenceBadge = ({ presence, onPress }: PresenceBadgeProps) => {
  const count = presence.length;

  // Determine badge color based on viewer count
  const isMultiUser = count > 1;
  const badgeColor = isMultiUser
    ? 'bg-green-100 dark:bg-green-900'
    : 'bg-gray-200 dark:bg-gray-700';
  const textColor = isMultiUser
    ? 'text-green-700 dark:text-green-400'
    : 'text-gray-600 dark:text-gray-400';
  const iconColor = isMultiUser
    ? colors.brand.success
    : colors.light.muted;

  const handlePress = onPress || (() => {});

  return (
    <Pressable
      onPress={handlePress}
      className={`flex-row items-center gap-1 px-2 py-1 rounded-full ${badgeColor}`}
      accessibilityLabel={`Live: ${count} viewer${count !== 1 ? 's' : ''}`}
      accessibilityRole="button"
    >
      <IconSymbol
        name="people"
        size={14}
        color={iconColor}
      />
      <Text className={`text-xs font-medium ${textColor}`}>
        Live: {count} {count === 1 ? 'viewer' : 'viewers'}
      </Text>
    </Pressable>
  );
};
