import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { DrawerParamList } from '@navigation/types';
import { guildService, firebaseStorageService } from '@services';
import { GuildForm } from '@components';
import { tailwind, colors } from '@theme';

type Props = DrawerScreenProps<DrawerParamList, 'EditClub'>;

export default function EditClubScreen({ route, navigation }: Props) {
  const { clubId } = route.params;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [guild, setGuild] = useState<any>(null);

  useEffect(() => {
    fetchGuild();
  }, [clubId]);

  const fetchGuild = async () => {
    setLoading(true);
    try {
      const { data, error } = await guildService.getClubById(clubId);
      if (error || !data) {
        Alert.alert('Error', 'Failed to load club details');
        navigation.goBack();
        return;
      }
      setGuild(data);
    } catch (err) {
      Alert.alert('Error', 'Failed to load club details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    if (!guild) return;

    setSubmitting(true);

    try {
      let avatarUrl: string | undefined = formData.avatar;

      if (formData.avatar && formData.avatar.startsWith('file://')) {
        const { url, error: uploadError } = await firebaseStorageService.uploadGuildImage(
          formData.avatar,
          clubId
        );

        if (uploadError) {
          Alert.alert('Upload Error', 'Failed to upload image. Continuing without updating image.');
        } else if (url) {
          avatarUrl = url;
        }
      }

      const { data, error } = await guildService.updateClub(clubId, {
        name: formData.name,
        description: formData.description,
        avatar: avatarUrl
      });

      if (error || !data) {
        Alert.alert('Error', 'Failed to update club. Please try again.');
        return;
      }

      Alert.alert('Success', 'Club updated successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('ClubDetails', { clubId });
          }
        }
      ]);
    } catch (err) {
      console.error('Update club error:', err);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !guild) {
    return (
      <View className={`flex-1 ${tailwind.background.both} justify-center items-center`}>
        <ActivityIndicator size="large" color={colors.brand.primary} />
        <Text className={`text-base ${tailwind.textMuted.both} mt-4`}>
          Loading club...
        </Text>
      </View>
    );
  }

  return (
    <GuildForm
      guildType="CLUB"
      initialData={{
        name: guild.name,
        description: guild.club?.description || undefined,
        avatar: guild.club?.avatar || undefined
      }}
      onSubmit={handleSubmit}
      submitLabel="Update Club"
      loading={submitting}
    />
  );
}
