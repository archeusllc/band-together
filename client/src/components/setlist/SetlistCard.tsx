import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import type { SetList, SetListShare } from '@band-together/types';
import type { DrawerParamList } from '@navigation/types';

interface SetlistCardProps {
  setlist: SetList & {
    setItems?: Array<any>;
    setSections?: Array<any>;
    shares?: SetListShare[];
  };
  onPress?: () => void;
}

const calculateDuration = (items: any[] = []): string => {
  if (!items.length) return '0s';

  const totalSeconds = items.reduce((sum, item) => {
    const duration = item.customDuration || item.track?.duration || 0;
    return sum + duration;
  }, 0);

  if (totalSeconds === 0) return '0s';
  if (totalSeconds < 60) return `${totalSeconds}s`;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
};

export const SetlistCard = ({ setlist, onPress }: SetlistCardProps) => {
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  const trackCount = setlist.setItems?.length || 0;
  const sectionCount = setlist.setSections?.length || 0;
  const shareCount = setlist.shares?.length || 0;
  const duration = calculateDuration(setlist.setItems);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('SetlistDetails', { setlistId: setlist.setListId });
    }
  };

  return (
    <Pressable
      className={`${tailwind.card.both} rounded-xl p-4 mb-3 mx-4 border ${tailwind.border.both}`}
      onPress={handlePress}
    >
      <View className="flex-row items-start gap-3">
        {/* Icon */}
        <View className={`w-14 h-14 rounded-lg ${tailwind.activeBackground.both} items-center justify-center`}>
          <IconSymbol name="musical-notes" size={28} color={colors.brand.primary} />
        </View>

        {/* Content */}
        <View className="flex-1">
          {/* Title and Privacy */}
          <View className="flex-row items-center gap-2 mb-1">
            <Text className={`text-lg font-bold ${tailwind.text.both} flex-1`} numberOfLines={1}>
              {setlist.name}
            </Text>
            {!setlist.guildId && (
              <IconSymbol name="lock-closed" size={12} color={colors.brand.primary} />
            )}
          </View>

          {/* Description */}
          {setlist.description && (
            <Text className={`text-sm ${tailwind.textMuted.both} mb-2`} numberOfLines={2}>
              {setlist.description}
            </Text>
          )}

          {/* Stats Row */}
          <View className="flex-row gap-4">
            {/* Tracks */}
            <View className="flex-row items-center gap-1">
              <IconSymbol name="musical-note" size={12} color={colors.brand.primary} />
              <Text className={`text-xs ${tailwind.textMuted.both}`}>
                {trackCount} {trackCount === 1 ? 'track' : 'tracks'}
              </Text>
            </View>

            {/* Duration */}
            <View className="flex-row items-center gap-1">
              <IconSymbol name="time" size={12} color={colors.brand.primary} />
              <Text className={`text-xs ${tailwind.textMuted.both}`}>{duration}</Text>
            </View>

            {/* Sections */}
            {sectionCount > 0 && (
              <View className="flex-row items-center gap-1">
                <IconSymbol name="list" size={12} color={colors.brand.primary} />
                <Text className={`text-xs ${tailwind.textMuted.both}`}>
                  {sectionCount} {sectionCount === 1 ? 'set' : 'sets'}
                </Text>
              </View>
            )}
          </View>

          {/* Shares Info */}
          {shareCount > 0 && (
            <View className="flex-row items-center gap-1 mt-2">
              <IconSymbol name="share-social" size={12} color={colors.brand.primary} />
              <Text className={`text-xs ${tailwind.textMuted.both}`}>
                Shared with {shareCount} {shareCount === 1 ? 'person' : 'people'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};
