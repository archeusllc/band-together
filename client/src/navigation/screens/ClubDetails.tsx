import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { DrawerParamList } from '@navigation/types';
import { useAuth } from '@contexts';
import { guildService, feedService } from '@services';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import { AlertModal } from '@ui';

type Props = DrawerScreenProps<DrawerParamList, 'ClubDetails'>;

export const ClubDetailsScreen = ({ route, navigation }: Props) => {
  const { clubId } = route.params;
  const { user, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [guild, setGuild] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    title: string;
    message: string;
    isDeleteConfirm?: boolean;
  }>({ visible: false, title: '', message: '' });

  useEffect(() => {
    fetchDetails();
  }, [clubId]);

  const fetchDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: err } = await guildService.getClubById(clubId);

      if (err || !data) {
        setError('Failed to load club details');
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
      setError('Failed to load club details');
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
      navigation.getParent()?.navigate('Login');
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
      setAlertConfig({
            visible: true,
            title: 'Error',
            message: 'Failed to update follow status',
          });
    } finally {
      setFollowLoading(false);
    }
  };

  const handleDelete = () => {
    if (!guild) return;

    setAlertConfig({
      visible: true,
      title: 'Delete Club',
      message: `Are you sure you want to delete ${guild.name}? This action cannot be undone.`,
      isDeleteConfirm: true,
    });
  };

  const performDelete = async () => {
    if (!guild) return;

    try {
      await guildService.deleteClub(guild.guildId);
      setAlertConfig({
        visible: true,
        title: 'Success',
        message: 'Club deleted successfully',
      });
      // Navigate after a short delay to allow modal to display
      setTimeout(() => navigation.navigate('ClubsList'), 500);
    } catch (err) {
      setAlertConfig({
        visible: true,
        title: 'Error',
        message: 'Failed to delete club',
      });
    }
  };

  if (loading) {
    return (
      <View className={`flex-1 ${tailwind.background.both} justify-center items-center`}>
        <ActivityIndicator size="large" color={colors.brand.primary} />
        <Text className={`text-base ${tailwind.textMuted.both} mt-4`}>
          Loading club details...
        </Text>
      <AlertModal
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttons={[
          {
            text: 'OK',
            onPress: () => setAlertConfig({ visible: false, title: '', message: '' }),
          },
        ]}
      />
      </View>
    );
  }

  if (error || !guild) {
    return (
      <View className={`flex-1 ${tailwind.background.both} justify-center items-center px-5`}>
        <Text className="text-6xl mb-4">⚠️</Text>
        <Text className={`text-xl font-bold mb-2 text-center ${tailwind.text.both}`}>
          Failed to Load Club
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
      <AlertModal
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttons={[
          {
            text: 'OK',
            onPress: () => setAlertConfig({ visible: false, title: '', message: '' }),
          },
        ]}
      />
      </View>
    );
  }

  const avatar = guild.club?.avatar;

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
                name="people"
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
              CLUB
            </Text>
          </View>

          {guild.currentOwner && (
            <View className="flex-row items-center gap-2 mb-3">
              <IconSymbol name="person" size={16} color={colors.light.muted} />
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
                  name={isFollowing ? 'heart' : 'heart-outline'}
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
                  onPress={() => navigation.navigate('EditClub', { clubId: guild.guildId })}
                >
                  <Text className="text-white text-base font-semibold text-center">
                    Edit Club
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
        {/* Description Section */}
        {guild.club?.description && (
          <View className={`${tailwind.card.both} rounded-xl p-4 mb-4 border ${tailwind.border.both}`}>
            <Text className={`text-xl font-bold ${tailwind.text.both} mb-3`}>
              About
            </Text>
            <Text className={`text-base ${tailwind.text.both}`}>
              {guild.club.description}
            </Text>
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
                    <IconSymbol name="person" size={20} color={colors.light.muted} />
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

      <AlertModal
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttons={
          alertConfig.isDeleteConfirm
            ? [
                {
                  text: 'Cancel',
                  style: 'cancel',
                  onPress: () => setAlertConfig({ visible: false, title: '', message: '' }),
                },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: performDelete,
                },
              ]
            : [
                {
                  text: 'OK',
                  onPress: () => setAlertConfig({ visible: false, title: '', message: '' }),
                },
              ]
        }
      />
    </ScrollView>
  );
}
