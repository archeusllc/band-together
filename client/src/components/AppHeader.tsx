import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, DrawerParamList } from '@navigation/types';
import { useAuth } from '@contexts';
import { tailwind, colors } from '@theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList> &
  NativeStackNavigationProp<DrawerParamList>;

export const AppHeader = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user, isAuthenticated } = useAuth();

  const handleAvatarPress = () => {
    if (isAuthenticated) {
      navigation.navigate('Profile' as any);
    } else {
      navigation.navigate('Login' as any);
    }
  };

  const displayName = isAuthenticated && user?.displayName ? user.displayName : 'Log In';

  return (
    <SafeAreaView
      edges={['top']}
      className={`${tailwind.card.both} border-b ${tailwind.border.both}`}
    >
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
        <Pressable
          onPress={handleAvatarPress}
          className="flex-row items-center gap-2 active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text className={`text-sm font-semibold ${tailwind.text.both} max-w-xs`} numberOfLines={1}>
            {displayName}
          </Text>
          {user?.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <View
              className="w-8 h-8 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.brand.primary }}
            >
              <Text className="text-white text-xs font-bold">
                {isAuthenticated && user?.displayName ? user.displayName[0].toUpperCase() : '?'}
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
