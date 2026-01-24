import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import type { SetItem, Track } from '@band-together/shared';

interface SetItemRowProps {
  item: SetItem & {
    track?: Track;
  };
  isEditing?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const formatDuration = (seconds: number): string => {
  if (seconds === 0) return '0:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const mm = hours > 0 ? String(minutes).padStart(2, '0') : String(minutes);
  const ss = String(secs).padStart(2, '0');

  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
};

export const SetItemRow = ({ item, isEditing = false, onEdit, onDelete }: SetItemRowProps) => {
  const track = item.track;
  if (!track) return null;

  // Use custom overrides if available, otherwise use track defaults
  const displayTuning = item.customTuning || track.defaultTuning;
  const displayDuration = item.customDuration ?? track.defaultDuration ?? 0;
  const displayNotes = item.customNotes;

  return (
    <View className={`border-b ${tailwind.border.both} p-4`}>
      <View className="flex-row items-center gap-3">
        {/* Position Number */}
        <Text className={`text-sm font-semibold ${tailwind.textMuted.both} w-6`}>
          {item.position + 1}
        </Text>

        {/* Track Info */}
        <View className="flex-1 mb-2">
          <View className="flex-row items-center gap-3 mb-2">
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
          <View className="flex-row items-center gap-2">
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
            <View className="flex-row items-start gap-2 mt-2">
              <IconSymbol name="document-text" size={12} color="#9CA3AF" />
              <Text className={`text-xs ${tailwind.textMuted.both} flex-1 italic`} numberOfLines={2}>
                {displayNotes}
              </Text>
            </View>
          )}
        </View>

        {/* Edit/Delete Buttons (editing only) */}
        {isEditing && (
          <View className="flex-row gap-2">
            <Pressable
              className={`p-2 rounded ${tailwind.activeBackground.both}`}
              onPress={onEdit}
              accessibilityLabel="Edit track"
            >
              <IconSymbol name="pencil" size={18} color={colors.brand.primary} />
            </Pressable>
            <Pressable
              className={`p-2 rounded ${tailwind.activeBackground.both}`}
              onPress={onDelete}
              accessibilityLabel="Delete track"
            >
              <IconSymbol name="trash" size={18} color={colors.brand.error} />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};
