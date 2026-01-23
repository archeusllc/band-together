import React from 'react';
import { View, Text } from 'react-native';
import { tailwind, colors } from '@theme';
import type { SetSection } from '@band-together/shared';

interface SetSectionHeaderProps {
  section: SetSection;
}

export const SetSectionHeader = ({ section }: SetSectionHeaderProps) => {
  return (
    <View className={`${tailwind.activeBackground.both} px-4 py-3 border-b ${tailwind.border.both}`}>
      <Text className={`text-base font-bold ${tailwind.text.both}`}>
        {section.name}
      </Text>
    </View>
  );
};
