import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { tailwind, colors } from '@theme';

export const AppHeader = () => {
  const navigation = useNavigation();

  return (
    <View className={`${tailwind.card.both} border-b ${tailwind.border.both}`}>
      <View className="h-14 flex-row items-center justify-between px-4">
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          className="w-10 h-10 items-center justify-center active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text className={`text-2xl font-bold`} style={{ color: colors.brand.primary }}>
            ☰
          </Text>
        </Pressable>
        <Text className={`text-lg font-bold ${tailwind.text.both} flex-1 text-center`}>
          Band Together
        </Text>
        <View className="w-10" />
      </View>
    </View>
  );
};
