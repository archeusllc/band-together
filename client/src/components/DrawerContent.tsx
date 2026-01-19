import React from 'react';
import { View, Text, Pressable } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '@contexts';

export function DrawerContent(props: DrawerContentComponentProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const { state, navigation } = props;

  const drawerItems = [
    { name: 'Home', icon: 'house.fill', route: 'Home' },
    { name: 'Profile', icon: 'person.fill', route: 'Profile' },
    { name: 'Settings', icon: 'gearshape.fill', route: 'Settings' },
  ];

  return (
    <DrawerContentScrollView {...props} className="flex-1">
      <View className="p-5 border-b border-slate-200">
        <Text className="text-2xl font-bold mb-1">Band Together</Text>
        {isAuthenticated && user && (
          <Text className="text-sm text-gray-600">{user.email}</Text>
        )}
      </View>

      <View className="flex-1 pt-5">
        {drawerItems.map((item) => {
          const isActive = state.routeNames[state.index] === item.route;
          return (
            <Pressable
              key={item.route}
              className={`flex-row items-center py-3 px-5 gap-4 ${isActive ? 'bg-slate-100' : ''}`}
              onPress={() => navigation.navigate(item.route)}
            >
              <IconSymbol
                name={item.icon}
                size={24}
                color={isActive ? '#007AFF' : '#666'}
              />
              <Text className={`text-base ${isActive ? 'text-blue-500 font-semibold' : 'text-black'}`}>
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {isAuthenticated && (
        <View className="border-t border-slate-200 p-5">
          <Pressable className="flex-row items-center gap-4" onPress={logout}>
            <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color="#FF3B30" />
            <Text className="text-base text-red-600 font-semibold">Logout</Text>
          </Pressable>
        </View>
      )}
    </DrawerContentScrollView>
  );
}
