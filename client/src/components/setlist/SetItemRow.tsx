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
  isDragging?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const formatDuration = (seconds: number): string => {
  if (seconds === 0) return '0s';
  if (seconds < 60) return `${seconds}s`;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
};

export const SetItemRow = ({ item, isEditing = false, isDragging = false, onEdit, onDelete }: SetItemRowProps) => {
  const track = item.track;
  if (!track) return null;

  // Use custom overrides if available, otherwise use track defaults
  const displayTuning = item.customTuning || track.defaultTuning;
  const displayDuration = item.customDuration ?? track.defaultDuration ?? 0;
  const displayNotes = item.customNotes;

  return (
    <View className={`border-b ${tailwind.border.both} p-4 ${isDragging ? tailwind.activeBackground.both : ''}`}>
      <View className="flex-row items-center gap-3">
        {/* Drag Handle (editing only) */}
        {isEditing && (
          <View className="w-5 items-center justify-center">
            <IconSymbol name="line.3.horizontal" size={16} color="#9CA3AF" />
          </View>
        )}

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
              <IconSymbol name="note.text" size={12} color="#9CA3AF" />
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
              className={`flex-row items-center gap-1 px-3 py-2 rounded ${tailwind.activeBackground.both}`}
              onPress={onEdit}
            >
              <IconSymbol name="pencil" size={16} color={colors.brand.primary} />
              <Text className={`text-sm font-medium ${tailwind.primary}`}>Edit</Text>
            </Pressable>
            <Pressable
              className={`flex-row items-center gap-1 px-3 py-2 rounded ${tailwind.activeBackground.both}`}
              onPress={onDelete}
            >
              <IconSymbol name="trash" size={16} color={colors.brand.error} />
              <Text className={`text-sm font-medium ${tailwind.error}`}>Delete</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};
