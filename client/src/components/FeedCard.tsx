import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import type { CalendarEvent, Act, Venue } from '@band-together/shared';

interface FeedCardProps {
  event: CalendarEvent & {
    venue?: Venue;
    acts?: Act[];
  };
  onPress?: () => void;
}

export const FeedCard = ({ event, onPress }: FeedCardProps) => {
  const startDate = new Date(event.startTime);
  const formattedDate = startDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = startDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <Pressable
      className={`${tailwind.card.both} rounded-xl p-4 mb-3 mx-4 border ${tailwind.border.both}`}
      onPress={onPress}
    >
      {event.poster && (
        <Image
          source={{ uri: event.poster }}
          className="w-full h-48 rounded-lg mb-3"
          resizeMode="cover"
        />
      )}

      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1">
          <Text className={`text-lg font-bold ${tailwind.text.both} mb-1`}>
            {event.title || 'Live Music'}
          </Text>
          {event.venue && (
            <View className="flex-row items-center gap-1 mb-1">
              <IconSymbol name="mappin.circle.fill" size={16} color={colors.brand.primary} />
              <Text className={`text-sm ${tailwind.textMuted.both}`}>
                {event.venue.name}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View className="flex-row items-center gap-1 mb-2">
        <IconSymbol name="calendar" size={16} color={colors.brand.primary} />
        <Text className={`text-sm ${tailwind.textMuted.both}`}>
          {formattedDate} at {formattedTime}
        </Text>
      </View>

      {event.acts && event.acts.length > 0 && (
        <View className="flex-row flex-wrap gap-2 mt-2">
          {event.acts.map((act, index) => (
            <View key={index} className={`${tailwind.activeBackground.both} px-2 py-1 rounded-full`}>
              <Text className={`text-xs ${tailwind.text.both}`}>
                {act.name}
              </Text>
            </View>
          ))}
        </View>
      )}

      {event.description && (
        <Text className={`text-sm ${tailwind.textMuted.both} mt-2`} numberOfLines={2}>
          {event.description}
        </Text>
      )}
    </Pressable>
  );
};
