import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
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
  onEdit?: () => void;
  onDelete?: () => void;
}

const SectionSwipeActions = ({ onEdit, onDelete }: any) => (
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

const SectionContent = ({ section, isEditing, onEdit, onDelete, duration }: any) => (
  <View className={`${tailwind.activeBackground.both} px-4 py-3 border-b ${tailwind.border.both} flex-row items-center justify-between`}>
    <View className="flex-1">
      <View className="flex-row items-center gap-2">
        <Text className={`text-base font-bold ${tailwind.text.both}`}>
          {section.name}
        </Text>
        {duration && duration > 0 && (
          <Text className={`text-sm ${tailwind.textMuted.both}`}>
            ({formatDuration(duration)})
          </Text>
        )}
      </View>
    </View>

    {isEditing && (
      <View className="flex-row gap-1">
        <Pressable
          className={`p-3 rounded transition-all duration-150 ${tailwind.background.both} hover:opacity-80`}
          onPress={onEdit}
        >
          <IconSymbol name="pencil" size={16} color={colors.brand.primary} />
        </Pressable>
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

export const SetSectionHeader = ({ section, isEditing = false, isOwner = false, duration, onEdit, onDelete }: SetSectionHeaderProps) => {
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
        renderLeftActions={() => null}
        renderRightActions={() => <SectionSwipeActions onEdit={handleEdit} onDelete={handleDelete} />}
        friction={2}
        overshootRight={false}
        overshootLeft={false}
        leftThreshold={999}
      >
        <SectionContent
          section={section}
          isEditing={false}
          onEdit={handleEdit}
          onDelete={handleDelete}
          duration={duration}
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
    />
  );
};
