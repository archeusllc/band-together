import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import type { SetItem, Track } from '@band-together/shared';

interface SetItemRowProps {
  item: SetItem & {
    track?: Track;
  };
  isEditing?: boolean;
  isOwner?: boolean;
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

const ItemContent = ({ track, item, displayTuning, displayDuration, displayNotes, isEditing, onEdit, onDelete }: any) => (
  <View className={`border-b ${tailwind.border.both} p-4 ${tailwind.card.both}`}>
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

      {/* Edit/Delete Buttons (web only, or when isEditing true and not on mobile with swipe enabled) */}
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

export const SetItemRow = ({ item, isEditing = false, isOwner = false, onEdit, onDelete }: SetItemRowProps) => {
  const track = item.track;
  if (!track) return null;

  // Use custom overrides if available, otherwise use track defaults
  const displayTuning = item.customTuning || track.defaultTuning;
  const displayDuration = item.customDuration ?? track.defaultDuration ?? 0;
  const displayNotes = item.customNotes;

  const isWeb = Platform.OS === 'web';

  // Haptic feedback handlers
  const handleDelete = () => {
    if (!isWeb) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onDelete?.();
  };

  const handleEdit = () => {
    if (!isWeb) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onEdit?.();
  };

  // Mobile with swipe gestures: show no visible buttons, wrap in Swipeable
  if (!isWeb && isOwner && isEditing) {
    return (
      <Swipeable
        renderLeftActions={() => (
          <View className="flex-row">
            <Pressable
              onPress={handleEdit}
              className="bg-blue-500 flex-row items-center justify-center px-4 flex-1"
            >
              <IconSymbol name="pencil" size={20} color="white" />
            </Pressable>
            <Pressable
              onPress={handleDelete}
              className="bg-red-500 flex-row items-center justify-center px-4 flex-1"
            >
              <IconSymbol name="trash" size={20} color="white" />
            </Pressable>
          </View>
        )}
        friction={2}
        overshootLeft={false}
      >
        <ItemContent
          track={track}
          item={item}
          displayTuning={displayTuning}
          displayDuration={displayDuration}
          displayNotes={displayNotes}
          isEditing={false}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Swipeable>
    );
  }

  // Web or non-editing mode: render with buttons (existing behavior)
  return (
    <ItemContent
      track={track}
      item={item}
      displayTuning={displayTuning}
      displayDuration={displayDuration}
      displayNotes={displayNotes}
      isEditing={isEditing}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};
