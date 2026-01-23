import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { DrawerParamList } from '@navigation/types';
import { setlistService } from '@services';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import { SetItemRow } from '@components/setlist/SetItemRow';
import { SetSectionHeader } from '@components/setlist/SetSectionHeader';
import type { SetList, SetItem, SetSection } from '@band-together/shared';

type Props = DrawerScreenProps<DrawerParamList, 'SetlistDetails'>;

export const SetlistDetailsScreen = ({ route }: Props) => {
  const { setlistId } = route.params;
  const [setlist, setSetlist] = useState<SetList & { setItems?: Array<SetItem & { track?: any }>; setSections?: SetSection[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSetlistDetails();
  }, [setlistId]);

  const fetchSetlistDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await setlistService.getSetlistById(setlistId);

      if (fetchError || !data) {
        setError('Failed to load setlist');
        return;
      }

      setSetlist(data);
    } catch (err) {
      setError('An error occurred while loading the setlist');
      console.error('Fetch setlist error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className={`flex-1 ${tailwind.background.both} items-center justify-center`}>
        <ActivityIndicator size="large" color={colors.brand.primary} />
        <Text className={`text-base ${tailwind.textMuted.both} mt-4`}>
          Loading setlist...
        </Text>
      </View>
    );
  }

  if (error || !setlist) {
    return (
      <View className={`flex-1 ${tailwind.background.both} items-center justify-center p-6`}>
        <IconSymbol name="exclamationmark.circle" size={48} color={colors.brand.error} />
        <Text className={`text-base ${tailwind.text.both} mt-4 text-center`}>
          {error || 'Setlist not found'}
        </Text>
      </View>
    );
  }

  // Calculate total duration
  const totalDuration = (setlist.setItems || []).reduce((sum, item) => {
    const duration = item.customDuration ?? item.track?.duration ?? 0;
    return sum + duration;
  }, 0);

  const formatDuration = (seconds: number): string => {
    if (seconds === 0) return '0s';
    if (seconds < 60) return `${seconds}s`;

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  };

  // Group items by section for display
  const sectionMap = new Map<string | null, typeof setlist.setItems>();
  (setlist.setItems || []).forEach((item) => {
    const sectionId = item.sectionId || null;
    if (!sectionMap.has(sectionId)) {
      sectionMap.set(sectionId, []);
    }
    sectionMap.get(sectionId)!.push(item);
  });

  // Create display list with sections as headers
  const displayItems: Array<{ type: 'header' | 'item'; data: any }> = [];
  const sections = setlist.setSections || [];
  const sectionIds = new Set(sections.map((s) => s.setSectionId));

  // Add unsectioned items first (if any)
  const unsectionedItems = sectionMap.get(null) || [];
  if (unsectionedItems.length > 0) {
    unsectionedItems.forEach((item) => {
      displayItems.push({ type: 'item', data: item });
    });
  }

  // Add sections with their items
  sections.forEach((section) => {
    displayItems.push({ type: 'header', data: section });
    const sectionItems = sectionMap.get(section.setSectionId) || [];
    sectionItems.forEach((item) => {
      displayItems.push({ type: 'item', data: item });
    });
  });

  const renderItem = ({ item }: { item: (typeof displayItems)[0] }) => {
    if (item.type === 'header') {
      return <SetSectionHeader section={item.data} />;
    }
    return <SetItemRow item={item.data} />;
  };

  return (
    <View className={`flex-1 ${tailwind.background.both}`}>
      <ScrollView>
        {/* Header Section */}
        <View className={`${tailwind.card.both} border-b ${tailwind.border.both} p-6`}>
          {/* Title and Privacy Icon */}
          <View className="flex-row items-center gap-3 mb-3">
            <View className={`w-12 h-12 rounded-lg ${tailwind.activeBackground.both} items-center justify-center`}>
              <IconSymbol name="music.note.list" size={24} color={colors.brand.primary} />
            </View>
            <View className="flex-1">
              <Text className={`text-2xl font-bold ${tailwind.text.both}`} numberOfLines={2}>
                {setlist.name}
              </Text>
              {!setlist.guildId && (
                <View className="flex-row items-center gap-1 mt-1">
                  <IconSymbol name="lock.fill" size={12} color={colors.brand.primary} />
                  <Text className={`text-xs ${tailwind.textMuted.both}`}>Private</Text>
                </View>
              )}
            </View>
          </View>

          {/* Description */}
          {setlist.description && (
            <Text className={`text-base ${tailwind.textMuted.both} mb-4`}>
              {setlist.description}
            </Text>
          )}

          {/* Stats */}
          <View className="flex-row gap-6">
            {/* Track Count */}
            <View className="items-center">
              <Text className={`text-lg font-bold ${tailwind.text.both}`}>
                {setlist.setItems?.length || 0}
              </Text>
              <Text className={`text-xs ${tailwind.textMuted.both}`}>
                {(setlist.setItems?.length || 0) === 1 ? 'Track' : 'Tracks'}
              </Text>
            </View>

            {/* Total Duration */}
            <View className="items-center">
              <Text className={`text-lg font-bold ${tailwind.text.both}`}>
                {formatDuration(totalDuration)}
              </Text>
              <Text className={`text-xs ${tailwind.textMuted.both}`}>Duration</Text>
            </View>

            {/* Section Count */}
            {sections.length > 0 && (
              <View className="items-center">
                <Text className={`text-lg font-bold ${tailwind.text.both}`}>
                  {sections.length}
                </Text>
                <Text className={`text-xs ${tailwind.textMuted.both}`}>
                  {sections.length === 1 ? 'Set' : 'Sets'}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Tracks Section */}
        {displayItems.length > 0 ? (
          <FlatList
            data={displayItems}
            keyExtractor={(item, index) => {
              if (item.type === 'header') {
                return `section-${item.data.setSectionId}`;
              }
              return `item-${item.data.setItemId}`;
            }}
            renderItem={renderItem}
            scrollEnabled={false}
            nestedScrollEnabled={false}
          />
        ) : (
          <View className="flex-1 items-center justify-center p-6 min-h-96">
            <IconSymbol name="music.note.slash" size={48} color={colors.light.muted} />
            <Text className={`text-base ${tailwind.text.both} mt-4 text-center`}>
              No tracks in this setlist yet
            </Text>
            <Text className={`text-sm ${tailwind.textMuted.both} mt-2 text-center`}>
              Add songs to get started
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
