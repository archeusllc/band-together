import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import type { SetSection } from '@band-together/shared';

interface SetSectionHeaderProps {
  section: SetSection;
  isEditing?: boolean;
  isOwner?: boolean;
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

const SectionContent = ({ section, isEditing, onEdit, onDelete }: any) => (
  <View className={`${tailwind.activeBackground.both} px-4 py-3 border-b ${tailwind.border.both} flex-row items-center justify-between`}>
    <Text className={`text-base font-bold ${tailwind.text.both} flex-1`}>
      {section.name}
    </Text>

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

export const SetSectionHeader = ({ section, isEditing = false, isOwner = false, onEdit, onDelete }: SetSectionHeaderProps) => {
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
    />
  );
};
