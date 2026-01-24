import React, { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useColorScheme } from 'nativewind';
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
  const { colorScheme } = useColorScheme();
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const drawerSections = [
    {
      title: 'Browse',
      items: [
        { name: 'Acts', icon: 'musical-note' as const, route: 'ActsList' },
        { name: 'Venues', icon: 'business' as const, route: 'VenuesList' },
        { name: 'Clubs', icon: 'people' as const, route: 'ClubsList' },
      ],
    },
    {
      title: 'Tools',
      items: [
        { name: 'Setlist Manager', icon: 'list' as const, route: 'SetlistManager' },
      ],
    },
    {
      title: 'Account',
      items: [
        { name: 'Profile', icon: 'person' as const, route: 'Profile' },
        { name: 'Settings', icon: 'settings' as const, route: 'Settings' },
        { name: 'Logout', icon: 'log-out' as const, route: 'Logout', action: 'logout' },
      ],
    },
  ];

  const toggleSection = (sectionTitle: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(sectionTitle)) {
      newCollapsed.delete(sectionTitle);
    } else {
      newCollapsed.add(sectionTitle);
    }
    setCollapsedSections(newCollapsed);
  };

  return (
    <DrawerContentScrollView {...props} className={`flex-1 ${tailwind.card.dark}`}>
      <Pressable
        onPress={() => navigation.navigate('Home')}
        className={`py-2 px-5 border-b ${tailwind.border.both}`}
      >
        <Image
          source={require('@assets/images/band-together-logo.png')}
          style={{ width: 200, height: 70 }}
          resizeMode="contain"
          accessibilityLabel="Band Together"
        />
      </Pressable>

      <View className="flex-1 pt-2">
        {drawerSections.map((section) => {
          const isCollapsed = collapsedSections.has(section.title);
          return (
            <View key={section.title}>
              <Pressable
                className={`flex-row items-center justify-between px-5 py-3 gap-4`}
                onPress={() => toggleSection(section.title)}
              >
                <Text className={`flex-1 text-xs font-semibold uppercase ${tailwind.textMuted.both}`}>
                  {section.title}
                </Text>
                <IconSymbol
                  name={isCollapsed ? 'chevron-forward' : 'chevron-down'}
                  size={20}
                  color={colorScheme === 'dark' ? colors.dark.icon : colors.light.icon}
                />
              </Pressable>
              {!isCollapsed && (
                <View className="pl-3">
                  {section.items.map((item) => {
                    const isActive = state.routeNames[state.index] === item.route;
                    const isLogout = (item as any).action === 'logout';
                    return (
                      <Pressable
                        key={item.route}
                        className={`flex-row items-center py-3 px-5 gap-4 ${isActive ? tailwind.activeBackground.both : ''}`}
                        onPress={async () => {
                          if (isLogout) {
                            await logout();
                            navigation.closeDrawer();
                            navigation.navigate('Home');
                          } else {
                            navigation.navigate(item.route);
                          }
                        }}
                      >
                        <IconSymbol
                          name={item.icon}
                          size={24}
                          color={isLogout ? colors.brand.error : (isActive ? colors.brand.primary : (colorScheme === 'dark' ? colors.dark.icon : colors.light.icon))}
                        />
                        <Text className={`text-base ${isLogout ? `${tailwind.error} ${tailwind.errorDark} font-semibold` : (isActive ? `${tailwind.primary} font-semibold` : tailwind.text.both)}`}>
                          {item.name}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
}
