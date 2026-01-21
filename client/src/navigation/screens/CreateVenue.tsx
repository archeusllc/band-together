import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '@navigation/types';
import { guildService, firebaseStorageService } from '@services';
import { GuildForm } from '@components';

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

export const CreateVenueScreen = () => {
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

      const { data, error } = await guildService.createVenue({
        name: formData.name,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        avatar: avatarUrl
      });

      if (error || !data) {
        Alert.alert('Error', 'Failed to create venue. Please try again.');
        return;
      }

      Alert.alert('Success', 'Venue created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('VenueDetails', { venueId: data.guildId });
          }
        }
      ]);
    } catch (err) {
      console.error('Create venue error:', err);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuildForm
      guildType="VENUE"
      onSubmit={handleSubmit}
      submitLabel="Create Venue"
      loading={loading}
    />
  );
}
