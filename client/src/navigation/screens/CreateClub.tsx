import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '@navigation/types';
import { guildService, firebaseStorageService } from '@services';
import { GuildForm } from '@components';

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

export default function CreateClubScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: any) => {
    setLoading(true);

    try {
      let avatarUrl: string | undefined = undefined;

      if (formData.avatar && formData.avatar.startsWith('file://')) {
        const tempId = `temp_${Date.now()}`;
        const { url, error: uploadError } = await firebaseStorageService.uploadGuildImage(
          formData.avatar,
          tempId
        );

        if (uploadError) {
          Alert.alert('Upload Error', 'Failed to upload image. Continuing without image.');
        } else if (url) {
          avatarUrl = url;
        }
      }

      const { data, error } = await guildService.createClub({
        name: formData.name,
        description: formData.description,
        avatar: avatarUrl
      });

      if (error || !data) {
        Alert.alert('Error', 'Failed to create club. Please try again.');
        return;
      }

      Alert.alert('Success', 'Club created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('ClubDetails', { clubId: data.guildId });
          }
        }
      ]);
    } catch (err) {
      console.error('Create club error:', err);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuildForm
      guildType="CLUB"
      onSubmit={handleSubmit}
      submitLabel="Create Club"
      loading={loading}
    />
  );
}
