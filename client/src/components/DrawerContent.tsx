import React from 'react';
import { View, Text, Pressable, useColorScheme } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { IconSymbol } from '@ui/IconSymbol';
import { useAuth } from '@contexts';
import { colors, tailwind } from '@theme/colors';

export function DrawerContent(props: DrawerContentComponentProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const { state, navigation } = props;
  const colorScheme = useColorScheme();

  const drawerItems = [
    { name: 'Home', icon: 'house.fill', route: 'Home' },
    { name: 'Profile', icon: 'person.fill', route: 'Profile' },
    { name: 'Settings', icon: 'gearshape.fill', route: 'Settings' },
  ];

  return (
    <DrawerContentScrollView {...props} className={`flex-1 ${tailwind.card.dark}`}>
      <View className={`p-5 border-b ${tailwind.border.both}`}>
        <Text className={`text-2xl font-bold mb-1 ${tailwind.text.dark}`}>Band Together</Text>
        {isAuthenticated && user && (
          <Text className={`text-sm ${tailwind.textMuted.both}`}>{user.email}</Text>
        )}
      </View>

      <View className="flex-1 pt-5">
        {drawerItems.map((item) => {
          const isActive = state.routeNames[state.index] === item.route;
          return (
            <Pressable
              key={item.route}
              className={`flex-row items-center py-3 px-5 gap-4 ${isActive ? tailwind.activeBackground.both : ''}`}
              onPress={() => navigation.navigate(item.route)}
            >
              <IconSymbol
                name={item.icon}
                size={24}
                color={isActive ? colors.brand.primary : (colorScheme === 'dark' ? colors.dark.icon : colors.light.icon)}
              />
              <Text className={`text-base ${isActive ? `${tailwind.primary} font-semibold` : tailwind.text.both}`}>
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {isAuthenticated && (
        <View className={`border-t ${tailwind.border.both} p-5`}>
          <Pressable
            className="flex-row items-center gap-4"
            onPress={async () => {
              await logout();
              navigation.closeDrawer();
              navigation.navigate('Home');
            }}
          >
            <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color={colors.brand.error} />
            <Text className={`text-base ${tailwind.error} ${tailwind.errorDark} font-semibold`}>Logout</Text>
          </Pressable>
        </View>
      )}
    </DrawerContentScrollView>
  );
}
