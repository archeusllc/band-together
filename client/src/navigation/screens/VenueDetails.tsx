import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { DrawerParamList } from '@navigation/types';
import { useAuth } from '@contexts';
import { guildService, feedService } from '@services';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';

type Props = DrawerScreenProps<DrawerParamList, 'VenueDetails'>;

export const VenueDetailsScreen = ({ route, navigation }: Props) => {
  const { venueId } = route.params;
  const { user, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [guild, setGuild] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    fetchDetails();
  }, [venueId]);

  const fetchDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: err } = await guildService.getVenueById(venueId);

      if (err || !data) {
        setError('Failed to load venue details');
        return;
      }

      setGuild(data);

      if (user && data.currentOwnerId === user.userId) {
        setIsOwner(true);
      }

      if (isAuthenticated) {
        await checkFollowStatus(data.guildId);
      }
    } catch (err) {
      setError('Failed to load venue details');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkFollowStatus = async (guildId: string) => {
    try {
      const { data } = await feedService.getFollows();
      if (!data) return;

      const following = data.follows.some(
        (f: any) => f.entityType === 'GUILD' && f.guildId === guildId
      );
      setIsFollowing(following);
    } catch (err) {
      console.error('Follow status error:', err);
    }
  };

  const handleFollow = async () => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
      return;
    }

    if (!guild) return;

    setFollowLoading(true);
    try {
      if (isFollowing) {
        const { data } = await feedService.getFollows();
        if (data) {
          const follow = data.follows.find(
            (f: any) => f.entityType === 'GUILD' && f.guildId === guild.guildId
          );
          if (follow) {
            await feedService.deleteFollow(follow.followId);
            setIsFollowing(false);
          }
        }
      } else {
        await feedService.createFollow('GUILD', { guildId: guild.guildId });
        setIsFollowing(true);
      }
    } catch (err) {
      console.error('Follow error:', err);
      Alert.alert('Error', 'Failed to update follow status');
    } finally {
      setFollowLoading(false);
    }
  };

  const handleDelete = () => {
    if (!guild) return;

    Alert.alert(
      'Delete Venue',
      `Are you sure you want to delete ${guild.name}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await guildService.deleteVenue(guild.guildId);
              Alert.alert('Success', 'Venue deleted successfully');
              navigation.navigate('VenuesList');
            } catch (err) {
              Alert.alert('Error', 'Failed to delete venue');
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View className={`flex-1 ${tailwind.background.both} justify-center items-center`}>
        <ActivityIndicator size="large" color={colors.brand.primary} />
        <Text className={`text-base ${tailwind.textMuted.both} mt-4`}>
          Loading venue details...
        </Text>
      </View>
    );
  }

  if (error || !guild) {
    return (
      <View className={`flex-1 ${tailwind.background.both} justify-center items-center px-5`}>
        <Text className="text-6xl mb-4">⚠️</Text>
        <Text className={`text-xl font-bold mb-2 text-center ${tailwind.text.both}`}>
          Failed to Load Venue
        </Text>
        <Text className={`text-sm ${tailwind.textMuted.both} text-center mb-4`}>
          {error}
        </Text>
        <Pressable
          className="bg-blue-500 py-3 px-6 rounded-lg"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white text-base font-semibold">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const avatar = guild.venue?.avatar;

  return (
    <ScrollView className={`flex-1 ${tailwind.background.both}`}>
      {/* Header */}
      <View className={`${tailwind.card.both} p-5 border-b ${tailwind.border.both}`}>
        <View className="items-center mb-4">
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              className="w-32 h-32 rounded-full mb-3"
              resizeMode="cover"
            />
          ) : (
            <View className={`w-32 h-32 rounded-full ${tailwind.activeBackground.both} items-center justify-center mb-3`}>
              <IconSymbol
                name="building.2"
                size={64}
                color={colors.brand.primary}
              />
            </View>
          )}

          <Text className={`text-3xl font-bold ${tailwind.text.both} text-center mb-2`}>
            {guild.name}
          </Text>

          <View className={`px-3 py-1 rounded-full ${tailwind.activeBackground.both} mb-3`}>
            <Text className={`text-sm font-semibold ${tailwind.text.both}`}>
              VENUE
            </Text>
          </View>

          {guild.currentOwner && (
            <View className="flex-row items-center gap-2 mb-3">
              <IconSymbol name="person.fill" size={16} color={colors.light.muted} />
              <Text className={`text-sm ${tailwind.textMuted.both}`}>
                Owner: {guild.currentOwner.displayName || 'Anonymous'}
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <View className="flex-row gap-2 w-full">
            {!isOwner && (
              <Pressable
                className={`flex-1 flex-row items-center justify-center gap-2 py-3 px-4 rounded-lg ${
                  isFollowing
                    ? `bg-transparent border ${tailwind.border.both}`
                    : 'bg-blue-500'
                }`}
                onPress={handleFollow}
                disabled={followLoading}
              >
                <IconSymbol
                  name={isFollowing ? 'heart.fill' : 'heart'}
                  size={20}
                  color={isFollowing ? colors.brand.primary : '#fff'}
                />
                <Text className={`text-base font-semibold ${
                  isFollowing ? tailwind.primary : 'text-white'
                }`}>
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </Pressable>
            )}

            {isOwner && (
              <>
                <Pressable
                  className="flex-1 bg-blue-500 py-3 px-4 rounded-lg"
                  onPress={() => navigation.navigate('EditVenue', { venueId: guild.guildId })}
                >
                  <Text className="text-white text-base font-semibold text-center">
                    Edit Venue
                  </Text>
                </Pressable>

                <Pressable
                  className="bg-red-600 py-3 px-4 rounded-lg"
                  onPress={handleDelete}
                >
                  <IconSymbol name="trash" size={20} color="#fff" />
                </Pressable>
              </>
            )}
          </View>
        </View>
      </View>

      <View className="p-5">
        {/* Location Section */}
        {guild.venue && (guild.venue.address || guild.venue.city || guild.venue.state || guild.venue.zipCode) && (
          <View className={`${tailwind.card.both} rounded-xl p-4 mb-4 border ${tailwind.border.both}`}>
            <Text className={`text-xl font-bold ${tailwind.text.both} mb-3`}>
              Location
            </Text>
            {guild.venue.address && (
              <View className="flex-row items-start gap-2 mb-2">
                <IconSymbol name="mappin.circle.fill" size={20} color={colors.brand.primary} />
                <View className="flex-1">
                  <Text className={`text-base ${tailwind.text.both}`}>
                    {guild.venue.address}
                  </Text>
                  {(guild.venue.city || guild.venue.state || guild.venue.zipCode) && (
                    <Text className={`text-base ${tailwind.text.both}`}>
                      {guild.venue.city}{guild.venue.city && guild.venue.state ? ', ' : ''}{guild.venue.state} {guild.venue.zipCode}
                    </Text>
                  )}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Members Section */}
        {guild.members && guild.members.length > 0 && (
          <View className={`${tailwind.card.both} rounded-xl p-4 border ${tailwind.border.both}`}>
            <Text className={`text-xl font-bold ${tailwind.text.both} mb-3`}>
              Members ({guild.members.length})
            </Text>
            {guild.members.map((member: any) => (
              <View key={member.userId} className="flex-row items-center gap-3 mb-2">
                {member.avatar ? (
                  <Image
                    source={{ uri: member.avatar }}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <View className={`w-10 h-10 rounded-full ${tailwind.activeBackground.both} items-center justify-center`}>
                    <IconSymbol name="person.fill" size={20} color={colors.light.muted} />
                  </View>
                )}
                <Text className={`text-base ${tailwind.text.both}`}>
                  {member.displayName || 'Anonymous'}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
