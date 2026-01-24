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
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
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

const RightSwipeActions = ({ onEdit, onDelete }: any) => (
  <View style={{ flexDirection: 'row', height: '100%', gap: 12, paddingHorizontal: 12, alignItems: 'center' }}>
    <Pressable
      onPress={onEdit}
      style={{
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <IconSymbol name="pencil" size={24} color={colors.brand.primary} />
    </Pressable>
    <Pressable
      onPress={onDelete}
      style={{
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <IconSymbol name="trash" size={24} color={colors.brand.error} />
    </Pressable>
  </View>
);

const LeftSwipeActions = ({ onMoveUp, onMoveDown, canMoveUp, canMoveDown }: any) => (
  <View style={{ flexDirection: 'row', height: '100%', gap: 12, paddingHorizontal: 12, alignItems: 'center' }}>
    <Pressable
      onPress={onMoveUp}
      disabled={!canMoveUp}
      style={{
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: canMoveUp ? 1 : 0.3,
      }}
    >
      <IconSymbol name="chevron-up" size={24} color={colors.brand.primary} />
    </Pressable>
    <Pressable
      onPress={onMoveDown}
      disabled={!canMoveDown}
      style={{
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: canMoveDown ? 1 : 0.3,
      }}
    >
      <IconSymbol name="chevron-down" size={24} color={colors.brand.primary} />
    </Pressable>
  </View>
);

const ItemContent = ({ track, item, displayTuning, displayDuration, displayNotes, isEditing, onEdit, onDelete, canMoveUp, canMoveDown, onMoveUp, onMoveDown }: any) => (
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

      {/* Action Buttons (web + non-mobile) */}
      {isEditing && (
        <View className="flex-row gap-1">
          {/* Move Up Button */}
          <Pressable
            className={`p-3 rounded transition-all duration-150 ${canMoveUp ? tailwind.activeBackground.both : 'opacity-30'} hover:opacity-80`}
            onPress={onMoveUp}
            disabled={!canMoveUp}
            accessibilityLabel="Move track up"
          >
            <IconSymbol name="chevron-up" size={18} color={colors.brand.primary} />
          </Pressable>

          {/* Move Down Button */}
          <Pressable
            className={`p-3 rounded transition-all duration-150 ${canMoveDown ? tailwind.activeBackground.both : 'opacity-30'} hover:opacity-80`}
            onPress={onMoveDown}
            disabled={!canMoveDown}
            accessibilityLabel="Move track down"
          >
            <IconSymbol name="chevron-down" size={18} color={colors.brand.primary} />
          </Pressable>

          {/* Edit Button */}
          <Pressable
            className={`p-3 rounded transition-all duration-150 ${tailwind.activeBackground.both} hover:opacity-80`}
            onPress={onEdit}
            accessibilityLabel="Edit track"
          >
            <IconSymbol name="pencil" size={18} color={colors.brand.primary} />
          </Pressable>

          {/* Delete Button */}
          <Pressable
            className={`p-3 rounded transition-all duration-150 ${tailwind.activeBackground.both} hover:opacity-80`}
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

export const SetItemRow = ({ item, isEditing = false, isOwner = false, onEdit, onDelete, canMoveUp = false, canMoveDown = false, onMoveUp, onMoveDown }: SetItemRowProps) => {
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

  const handleMoveUp = () => {
    if (!isWeb) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onMoveUp?.();
  };

  const handleMoveDown = () => {
    if (!isWeb) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onMoveDown?.();
  };

  // Mobile with swipe gestures: show no visible buttons, wrap in Swipeable
  if (!isWeb && isOwner && isEditing) {
    return (
      <Swipeable
        renderLeftActions={() => <LeftSwipeActions onMoveUp={handleMoveUp} onMoveDown={handleMoveDown} canMoveUp={canMoveUp} canMoveDown={canMoveDown} />}
        renderRightActions={() => <RightSwipeActions onEdit={handleEdit} onDelete={handleDelete} />}
        friction={2}
        overshootRight={false}
        overshootLeft={false}
        leftThreshold={999}
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
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
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
      canMoveUp={canMoveUp}
      canMoveDown={canMoveDown}
      onMoveUp={handleMoveUp}
      onMoveDown={handleMoveDown}
    />
  );
};
