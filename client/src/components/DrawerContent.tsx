import React, { useState } from 'react';
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
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const drawerSections = [
    {
      title: 'Browse',
      items: [
        { name: 'Acts', icon: 'music.note', route: 'ActsList' },
        { name: 'Venues', icon: 'building.2', route: 'VenuesList' },
        { name: 'Clubs', icon: 'person.3.fill', route: 'ClubsList' },
      ],
    },
    {
      title: 'Tools',
      items: [
        { name: 'Setlist Manager', icon: 'list.bullet.rectangle', route: 'SetlistManager' },
      ],
    },
    {
      title: 'Account',
      items: [
        { name: 'Profile', icon: 'person.fill', route: 'Profile' },
        { name: 'Settings', icon: 'gearshape.fill', route: 'Settings' },
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
        className={`p-5 border-b ${tailwind.border.both}`}
      >
        <Text className={`text-2xl font-bold mb-1 ${tailwind.text.dark}`}>Band Together</Text>
        {isAuthenticated && user && (
          <Text className={`text-sm ${tailwind.textMuted.both}`}>{user.email}</Text>
        )}
      </Pressable>

      <View className="flex-1 pt-5">
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
                <Text className={`text-lg ${tailwind.textMuted.both}`}>
                  {isCollapsed ? '▶' : '▼'}
                </Text>
              </Pressable>
              {!isCollapsed && (
                <View className="pl-3">
                  {section.items.map((item) => {
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
              )}
            </View>
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
