import React from 'react';
import { View, Text, Pressable, Platform, Dimensions } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import type { SetSection } from '@band-together/shared';

const formatDuration = (seconds: number): string => {
  if (seconds === 0) return '0:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const mm = hours > 0 ? String(minutes).padStart(2, '0') : String(minutes);
  const ss = String(secs).padStart(2, '0');

  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
};

interface SetSectionHeaderProps {
  section: SetSection;
  isEditing?: boolean;
  isOwner?: boolean;
  duration?: number;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

const SectionLeftSwipeActions = ({ onMoveUp, onMoveDown, canMoveUp, canMoveDown }: any) => (
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
      <IconSymbol name="chevron-up" size={20} color={colors.brand.primary} />
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
      <IconSymbol name="chevron-down" size={20} color={colors.brand.primary} />
    </Pressable>
  </View>
);

const SectionRightSwipeActions = ({ onEdit, onDelete }: any) => (
  <View style={{ flexDirection: 'row', height: '100%', gap: 12, paddingHorizontal: 12, alignItems: 'center' }}>
    <Pressable
      onPress={onEdit}
      style={{
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <IconSymbol name="pencil" size={20} color={colors.brand.primary} />
    </Pressable>
    <Pressable
      onPress={onDelete}
      style={{
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <IconSymbol name="trash" size={20} color={colors.brand.error} />
    </Pressable>
  </View>
);

const SectionContent = ({ section, isEditing, onEdit, onDelete, duration, canMoveUp, canMoveDown, onMoveUp, onMoveDown }: any) => {
  const windowHeight = Dimensions.get('window').height;
  const paddingClass = windowHeight < 800 ? 'py-2' : 'py-6';

  return (
    <View className={`${tailwind.activeBackground.both} px-4 ${paddingClass} border-b ${tailwind.border.both} flex-row items-center justify-between`}>
      <View className="absolute left-0 right-0 items-center flex-row justify-center px-4">
        <View className="flex-row items-center gap-2">
          <Text className={`text-xl font-bold ${tailwind.text.both}`}>
            {section.name}
          </Text>
          {duration !== undefined && duration > 0 && (
            <Text className={`text-sm ${tailwind.textMuted.both}`}>
              ({formatDuration(duration)})
            </Text>
          )}
        </View>
      </View>
      <View className="flex-1" />

      {isEditing && (
        <View className="flex-row gap-1">
          {/* Move Up Button */}
          <Pressable
            className={`p-3 rounded transition-all duration-150 ${canMoveUp ? tailwind.background.both : 'opacity-30'} hover:opacity-80`}
            onPress={onMoveUp}
            disabled={!canMoveUp}
            accessibilityLabel="Move section up"
          >
            <IconSymbol name="chevron-up" size={16} color={colors.brand.primary} />
          </Pressable>

          {/* Move Down Button */}
          <Pressable
            className={`p-3 rounded transition-all duration-150 ${canMoveDown ? tailwind.background.both : 'opacity-30'} hover:opacity-80`}
            onPress={onMoveDown}
            disabled={!canMoveDown}
            accessibilityLabel="Move section down"
          >
            <IconSymbol name="chevron-down" size={16} color={colors.brand.primary} />
          </Pressable>

          {/* Edit Button */}
          <Pressable
            className={`p-3 rounded transition-all duration-150 ${tailwind.background.both} hover:opacity-80`}
            onPress={onEdit}
          >
            <IconSymbol name="pencil" size={16} color={colors.brand.primary} />
          </Pressable>

          {/* Delete Button */}
          <Pressable
            className={`p-3 rounded transition-all duration-150 ${tailwind.background.both} hover:opacity-80`}
            onPress={onDelete}
          >
            <IconSymbol name="trash" size={16} color={colors.brand.error} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export const SetSectionHeader = ({ section, isEditing = false, isOwner = false, duration, canMoveUp = false, canMoveDown = false, onEdit, onDelete, onMoveUp, onMoveDown }: SetSectionHeaderProps) => {
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
        renderLeftActions={() => <SectionLeftSwipeActions onMoveUp={handleMoveUp} onMoveDown={handleMoveDown} canMoveUp={canMoveUp} canMoveDown={canMoveDown} />}
        renderRightActions={() => <SectionRightSwipeActions onEdit={handleEdit} onDelete={handleDelete} />}
        friction={2}
        overshootRight={false}
        overshootLeft={false}
        leftThreshold={50}
      >
        <SectionContent
          section={section}
          isEditing={false}
          onEdit={handleEdit}
          onDelete={handleDelete}
          duration={duration}
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
    <SectionContent
      section={section}
      isEditing={isEditing}
      onEdit={handleEdit}
      onDelete={handleDelete}
      duration={duration}
      canMoveUp={canMoveUp}
      canMoveDown={canMoveDown}
      onMoveUp={handleMoveUp}
      onMoveDown={handleMoveDown}
    />
  );
};
