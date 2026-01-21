import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DrawerParamList, RootStackParamList } from '@navigation/types';
import { useAuth } from '@contexts';
import { feedService } from '@services';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import type { CalendarEvent, Venue, Act, Guild } from '@band-together/shared';

type Props = DrawerScreenProps<DrawerParamList, 'EventDetails'>;

type EventDetails = CalendarEvent & {
  venue?: Venue & { guild?: Guild };
  acts?: (Act & { guild?: Guild })[];
};

export const EventDetailsScreen = ({ route, navigation: drawerNavigation }: Props) => {
  const { eventId } = route.params;
  const { isAuthenticated } = useAuth();
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [followingVenue, setFollowingVenue] = useState(false);
  const [followingActs, setFollowingActs] = useState<Set<string>>(new Set());
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get event from API by ID
      const { data, error: err } = await feedService.getEventById(eventId);

      if (err || !data) {
        setError('Failed to load event details');
        return;
      }

      setEvent(data);

      // If authenticated, check follow status
      if (isAuthenticated) {
        await checkFollowStatus(data);
      }
    } catch (err) {
      setError('Failed to load event details');
      console.error('Event details fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkFollowStatus = async (eventData: EventDetails) => {
    try {
      const { data } = await feedService.getFollows();
      if (!data) return;

      // Check if following venue guild
      if (eventData.venue?.guild) {
        const isFollowingVenue = data.follows.some(
          (f: any) => f.entityType === 'GUILD' && f.guildId === eventData.venue?.guild?.guildId
        );
        setFollowingVenue(isFollowingVenue);
      }

      // Check which acts are followed
      const followedActIds = new Set<string>();
      eventData.acts?.forEach(act => {
        if (act.guild) {
          const isFollowing = data.follows.some(
            (f: any) => f.entityType === 'GUILD' && f.guildId === act.guild?.guildId
          );
          if (isFollowing) {
            followedActIds.add(act.actId);
          }
        }
      });
      setFollowingActs(followedActIds);
    } catch (err) {
      console.error('Follow status check error:', err);
    }
  };

  const handleFollowVenue = async () => {
    if (!isAuthenticated) {
      rootNavigation.navigate('Login');
      return;
    }

    if (!event?.venue?.guild) return;

    setFollowLoading(true);
    try {
      if (followingVenue) {
        // Unfollow - need to find the follow ID first
        const { data } = await feedService.getFollows();
        if (data) {
          const follow = data.follows.find(
            (f: any) => f.entityType === 'GUILD' && f.guildId === event.venue?.guild?.guildId
          );
          if (follow) {
            await feedService.deleteFollow(follow.followId);
            setFollowingVenue(false);
          }
        }
      } else {
        // Follow
        await feedService.createFollow('GUILD', { guildId: event.venue.guild.guildId });
        setFollowingVenue(true);
      }
    } catch (err) {
      console.error('Follow venue error:', err);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleFollowAct = async (act: Act & { guild?: Guild }) => {
    if (!isAuthenticated) {
      rootNavigation.navigate('Login');
      return;
    }

    if (!act.guild) return;

    setFollowLoading(true);
    try {
      const isFollowing = followingActs.has(act.actId);

      if (isFollowing) {
        // Unfollow
        const { data } = await feedService.getFollows();
        if (data) {
          const follow = data.follows.find(
            (f: any) => f.entityType === 'GUILD' && f.guildId === act.guild?.guildId
          );
          if (follow) {
            await feedService.deleteFollow(follow.followId);
            setFollowingActs(prev => {
              const newSet = new Set(prev);
              newSet.delete(act.actId);
              return newSet;
            });
          }
        }
      } else {
        // Follow
        await feedService.createFollow('GUILD', { guildId: act.guild.guildId });
        setFollowingActs(prev => new Set(prev).add(act.actId));
      }
    } catch (err) {
      console.error('Follow act error:', err);
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <View className={`flex-1 ${tailwind.background.both} justify-center items-center`}>
        <ActivityIndicator size="large" color={colors.brand.primary} />
        <Text className={`text-base ${tailwind.textMuted.both} mt-4`}>
          Loading event details...
        </Text>
      </View>
    );
  }

  if (error || !event) {
    return (
      <View className={`flex-1 ${tailwind.background.both} justify-center items-center px-5`}>
        <Text className="text-6xl mb-4">⚠️</Text>
        <Text className={`text-xl font-bold mb-2 text-center ${tailwind.text.both}`}>
          Failed to Load Event
        </Text>
        <Text className={`text-sm ${tailwind.textMuted.both} text-center mb-4`}>
          {error}
        </Text>
        <Pressable
          className="bg-blue-500 py-3 px-6 rounded-lg"
          onPress={() => drawerNavigation.goBack()}
        >
          <Text className="text-white text-base font-semibold">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const startDate = new Date(event.startTime);
  const formattedDate = startDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedTime = startDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  });

  return (
    <ScrollView className={`flex-1 ${tailwind.background.both}`}>
      {event.poster && (
        <Image
          source={{ uri: event.poster }}
          className="w-full h-72"
          resizeMode="cover"
        />
      )}

      <View className="p-5">
        {/* Title */}
        <Text className={`text-3xl font-bold ${tailwind.text.both} mb-4`}>
          {event.title || 'Live Music Event'}
        </Text>

        {/* Date & Time */}
        <View className={`${tailwind.card.both} rounded-xl p-4 mb-4 border ${tailwind.border.both}`}>
          <View className="flex-row items-center gap-3 mb-2">
            <IconSymbol name="calendar" size={24} color={colors.brand.primary} />
            <View className="flex-1">
              <Text className={`text-base ${tailwind.text.both} font-semibold`}>
                {formattedDate}
              </Text>
              <Text className={`text-sm ${tailwind.textMuted.both}`}>
                {formattedTime}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            <IconSymbol name="clock" size={24} color={colors.brand.primary} />
            <Text className={`text-base ${tailwind.textMuted.both}`}>
              {event.duration} minutes
            </Text>
          </View>
        </View>

        {/* Venue */}
        {event.venue && (
          <View className={`${tailwind.card.both} rounded-xl p-4 mb-4 border ${tailwind.border.both}`}>
            <View className="flex-row items-start justify-between mb-3">
              <View className="flex-1">
                <View className="flex-row items-center gap-2 mb-2">
                  <IconSymbol name="building.2" size={24} color={colors.brand.primary} />
                  <Text className={`text-xl font-bold ${tailwind.text.both}`}>
                    {event.venue.name}
                  </Text>
                </View>
                {event.venue.address && (
                  <View className="flex-row items-start gap-2">
                    <IconSymbol name="mappin.circle.fill" size={16} color={colors.brand.primary} />
                    <View className="flex-1">
                      <Text className={`text-sm ${tailwind.textMuted.both}`}>
                        {event.venue.address}
                      </Text>
                      {event.venue.city && event.venue.state && (
                        <Text className={`text-sm ${tailwind.textMuted.both}`}>
                          {event.venue.city}, {event.venue.state} {event.venue.zipCode}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </View>
            </View>

            {/* Follow Venue Button */}
            {event.venue.guild && (
              <Pressable
                className={`flex-row items-center justify-center gap-2 py-2 px-4 rounded-lg ${
                  followingVenue
                    ? `bg-transparent border ${tailwind.border.both}`
                    : 'bg-blue-500'
                }`}
                onPress={handleFollowVenue}
                disabled={followLoading}
              >
                <IconSymbol
                  name={followingVenue ? 'heart.fill' : 'heart'}
                  size={18}
                  color={followingVenue ? colors.brand.primary : '#fff'}
                />
                <Text className={`text-sm font-semibold ${
                  followingVenue ? tailwind.primary : 'text-white'
                }`}>
                  {followingVenue ? 'Following Venue' : 'Follow Venue'}
                </Text>
              </Pressable>
            )}
          </View>
        )}

        {/* Acts/Performers */}
        {event.acts && event.acts.length > 0 && (
          <View className={`${tailwind.card.both} rounded-xl p-4 mb-4 border ${tailwind.border.both}`}>
            <View className="flex-row items-center gap-2 mb-3">
              <IconSymbol name="music.note" size={24} color={colors.brand.primary} />
              <Text className={`text-xl font-bold ${tailwind.text.both}`}>
                Performing
              </Text>
            </View>

            {event.acts.map((act, index) => (
              <View key={act.actId} className={`${index > 0 ? 'mt-3 pt-3' : ''} ${index > 0 ? `border-t ${tailwind.border.both}` : ''}`}>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className={`text-lg font-semibold ${tailwind.text.both} flex-1`}>
                    {act.name}
                  </Text>
                </View>

                {act.bio && (
                  <Text className={`text-sm ${tailwind.textMuted.both} mb-2`}>
                    {act.bio}
                  </Text>
                )}

                {/* Follow Act Button */}
                {act.guild && (
                  <Pressable
                    className={`flex-row items-center justify-center gap-2 py-2 px-4 rounded-lg ${
                      followingActs.has(act.actId)
                        ? `bg-transparent border ${tailwind.border.both}`
                        : 'bg-blue-500'
                    }`}
                    onPress={() => handleFollowAct(act)}
                    disabled={followLoading}
                  >
                    <IconSymbol
                      name={followingActs.has(act.actId) ? 'heart.fill' : 'heart'}
                      size={18}
                      color={followingActs.has(act.actId) ? colors.brand.primary : '#fff'}
                    />
                    <Text className={`text-sm font-semibold ${
                      followingActs.has(act.actId) ? tailwind.primary : 'text-white'
                    }`}>
                      {followingActs.has(act.actId) ? 'Following' : 'Follow'}
                    </Text>
                  </Pressable>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Description */}
        {event.description && (
          <View className={`${tailwind.card.both} rounded-xl p-4 mb-4 border ${tailwind.border.both}`}>
            <Text className={`text-base ${tailwind.text.both} mb-2 font-semibold`}>
              About This Event
            </Text>
            <Text className={`text-base ${tailwind.text.both}`}>
              {event.description}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
