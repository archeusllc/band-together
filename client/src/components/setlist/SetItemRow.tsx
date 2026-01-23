import React from 'react';
import { View, Text } from 'react-native';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import type { SetItem, Track } from '@band-together/shared';

interface SetItemRowProps {
  item: SetItem & {
    track?: Track;
  };
}

const formatDuration = (seconds: number): string => {
  if (seconds === 0) return '0s';
  if (seconds < 60) return `${seconds}s`;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
};

export const SetItemRow = ({ item }: SetItemRowProps) => {
  const track = item.track;
  if (!track) return null;

  // Use custom overrides if available, otherwise use track defaults
  const displayTuning = item.customTuning || track.tuning;
  const displayDuration = item.customDuration ?? track.duration ?? 0;
  const displayNotes = item.customNotes;

  return (
    <View className={`border-b ${tailwind.border.both} p-4`}>
      {/* Position Number and Track Title */}
      <View className="flex-row items-center gap-3 mb-2">
        <Text className={`text-sm font-semibold ${tailwind.textMuted.both} w-6`}>
          {item.position + 1}
        </Text>
        <View className="flex-1">
          <Text className={`text-base font-semibold ${tailwind.text.both}`} numberOfLines={1}>
            {track.title}
          </Text>
        </View>
        <Text className={`text-sm ${tailwind.textMuted.both}`}>
          {formatDuration(displayDuration)}
        </Text>
      </View>

      {/* Artist and Tuning */}
      <View className="flex-row items-center gap-2 ml-9">
        {track.artist && (
          <Text className={`text-sm ${tailwind.textMuted.both} flex-1`} numberOfLines={1}>
            {track.artist}
          </Text>
        )}
        {displayTuning && (
          <Text className={`text-xs px-2 py-1 rounded ${tailwind.activeBackground.both} ${tailwind.textMuted.both}`}>
            {displayTuning}
          </Text>
        )}
      </View>

      {/* Custom Notes (if present) */}
      {displayNotes && (
        <View className="flex-row items-start gap-2 ml-9 mt-2">
          <IconSymbol name="note.text" size={12} color={colors.light.muted} />
          <Text className={`text-xs ${tailwind.textMuted.both} flex-1 italic`} numberOfLines={2}>
            {displayNotes}
          </Text>
        </View>
      )}
    </View>
  );
};
