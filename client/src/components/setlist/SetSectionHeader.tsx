import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import type { SetSection } from '@band-together/shared';

interface SetSectionHeaderProps {
  section: SetSection;
  isEditing?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const SetSectionHeader = ({ section, isEditing = false, onEdit, onDelete }: SetSectionHeaderProps) => {
  return (
    <View className={`${tailwind.activeBackground.both} px-4 py-3 border-b ${tailwind.border.both} flex-row items-center justify-between`}>
      <Text className={`text-base font-bold ${tailwind.text.both} flex-1`}>
        {section.name}
      </Text>

      {isEditing && (
        <View className="flex-row gap-2">
          <Pressable
            className={`p-2 rounded ${tailwind.background.both}`}
            onPress={onEdit}
          >
            <IconSymbol name="pencil" size={14} color={colors.brand.primary} />
          </Pressable>
          <Pressable
            className={`p-2 rounded ${tailwind.background.both}`}
            onPress={onDelete}
          >
            <IconSymbol name="trash" size={14} color={colors.brand.error} />
          </Pressable>
        </View>
      )}
    </View>
  );
};
