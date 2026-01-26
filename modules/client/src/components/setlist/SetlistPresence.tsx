import React from 'react';
import { View, Text } from 'react-native';
import { IconSymbol } from '@ui';
import { tailwind, colors } from '@theme';
import type { UserPresence } from '@services/setlist-ws.service';

interface SetlistPresenceProps {
  presence: UserPresence[];
  isConnected: boolean;
}

export const SetlistPresence = ({ presence, isConnected }: SetlistPresenceProps) => {
  if (!isConnected || presence.length === 0) {
    return null;
  }

  const editingCount = presence.filter((p) => p.isEditing).length;
  const viewingCount = presence.length - editingCount;

  return (
    <View className={`${tailwind.card.both} border-b ${tailwind.border.both} px-4 py-3 flex-row items-center justify-between gap-2`}>
      {/* Live Indicator */}
      <View className="flex-row items-center gap-2">
        <View className="flex-row items-center gap-1">
          <View className="w-2 h-2 rounded-full bg-green-500" />
          <Text className={`text-xs font-semibold ${tailwind.text.both}`}>Live</Text>
        </View>

        {/* View Count */}
        <View className="flex-row items-center gap-1">
          <IconSymbol name="eye" size={12} color={colors.brand.primary} />
          <Text className={`text-xs ${tailwind.textMuted.both}`}>
            {viewingCount} {viewingCount === 1 ? 'viewer' : 'viewers'}
          </Text>
        </View>
      </View>

      {/* Editing Indicator */}
      {editingCount > 0 && (
        <View className="flex-row items-center gap-1">
          <IconSymbol name="create" size={12} color={colors.brand.primary} />
          <Text className={`text-xs ${tailwind.textMuted.both}`}>
            {editingCount} {editingCount === 1 ? 'editing' : 'editing'}
          </Text>
        </View>
      )}
    </View>
  );
};
