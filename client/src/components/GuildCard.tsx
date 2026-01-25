import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import type { Guild, Act, Venue, Club, User } from '@band-together/types';

interface GuildCardProps {
  guild: Guild & {
    currentOwner?: Pick<User, 'userId' | 'displayName' | 'avatar'> | null;
    act?: Act | null;
    venue?: Venue | null;
    club?: Club | null;
  };
  onPress?: () => void;
}

const getGuildTypeIcon = (guildType: string): keyof typeof Ionicons.glyphMap => {
  switch (guildType) {
    case 'ACT':
      return 'musical-note';
    case 'VENUE':
      return 'business';
    case 'CLUB':
      return 'people';
    default:
      return 'radio-button-on';
  }
};

const getGuildTypeColor = (guildType: string): string => {
  switch (guildType) {
    case 'ACT':
      return '#3B82F6';
    case 'VENUE':
      return '#10B981';
    case 'CLUB':
      return '#F59E0B';
    default:
      return colors.brand.primary;
  }
};

export const GuildCard = ({ guild, onPress }: GuildCardProps) => {
  const entity = guild.act || guild.venue || guild.club;
  const avatar = entity?.avatar;

  return (
    <Pressable
      className={`${tailwind.card.both} rounded-xl p-4 mb-3 mx-4 border ${tailwind.border.both}`}
      onPress={onPress}
    >
      <View className="flex-row items-start gap-3">
        {/* Avatar */}
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            className="w-16 h-16 rounded-full"
            resizeMode="cover"
          />
        ) : (
          <View className={`w-16 h-16 rounded-full ${tailwind.activeBackground.both} items-center justify-center`}>
            <IconSymbol
              name={getGuildTypeIcon(guild.guildType)}
              size={32}
              color={getGuildTypeColor(guild.guildType)}
            />
          </View>
        )}

        {/* Content */}
        <View className="flex-1">
          <Text className={`text-lg font-bold ${tailwind.text.both} mb-1`}>
            {guild.name}
          </Text>

          {/* Guild Type Badge */}
          <View className="flex-row items-center gap-2 mb-2">
            <View className={`px-2 py-1 rounded-full ${tailwind.activeBackground.both}`}>
              <Text className={`text-xs font-semibold ${tailwind.text.both}`}>
                {guild.guildType}
              </Text>
            </View>
          </View>

          {/* Type-specific info */}
          {guild.act?.bio && (
            <Text className={`text-sm ${tailwind.textMuted.both}`} numberOfLines={2}>
              {guild.act.bio}
            </Text>
          )}
          {guild.venue?.city && guild.venue?.state && (
            <View className="flex-row items-center gap-1">
              <IconSymbol name="location" size={14} color={colors.brand.primary} />
              <Text className={`text-sm ${tailwind.textMuted.both}`}>
                {guild.venue.city}, {guild.venue.state}
              </Text>
            </View>
          )}
          {guild.club?.description && (
            <Text className={`text-sm ${tailwind.textMuted.both}`} numberOfLines={2}>
              {guild.club.description}
            </Text>
          )}

          {/* Owner info */}
          {guild.currentOwner && (
            <View className="flex-row items-center gap-1 mt-2">
              <IconSymbol name="person" size={12} color={colors.light.muted} />
              <Text className={`text-xs ${tailwind.textMuted.both}`}>
                {guild.currentOwner.displayName || 'Anonymous'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};
