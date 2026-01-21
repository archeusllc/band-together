import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { DrawerParamList } from '@navigation/types';
import { guildService, firebaseStorageService } from '@services';
import { GuildForm } from '@components';
import { tailwind, colors } from '@theme';

type Props = DrawerScreenProps<DrawerParamList, 'EditVenue'>;

export const EditVenueScreen = ({ route, navigation }: Props) => {
  const { venueId } = route.params;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [guild, setGuild] = useState<any>(null);

  useEffect(() => {
    fetchGuild();
  }, [venueId]);

  const fetchGuild = async () => {
    setLoading(true);
    try {
      const { data, error } = await guildService.getVenueById(venueId);
      if (error || !data) {
        Alert.alert('Error', 'Failed to load venue details');
        navigation.goBack();
        return;
      }
      setGuild(data);
    } catch (err) {
      Alert.alert('Error', 'Failed to load venue details');
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
          venueId
        );

        if (uploadError) {
          Alert.alert('Upload Error', 'Failed to upload image. Continuing without updating image.');
        } else if (url) {
          avatarUrl = url;
        }
      }

      const { data, error } = await guildService.updateVenue(venueId, {
        name: formData.name,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        avatar: avatarUrl
      });

      if (error || !data) {
        Alert.alert('Error', 'Failed to update venue. Please try again.');
        return;
      }

      Alert.alert('Success', 'Venue updated successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('VenueDetails', { venueId });
          }
        }
      ]);
    } catch (err) {
      console.error('Update venue error:', err);
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
          Loading venue...
        </Text>
      </View>
    );
  }

  return (
    <GuildForm
      guildType="VENUE"
      initialData={{
        name: guild.name,
        address: guild.venue?.address || undefined,
        city: guild.venue?.city || undefined,
        state: guild.venue?.state || undefined,
        zipCode: guild.venue?.zipCode || undefined,
        avatar: guild.venue?.avatar || undefined
      }}
      onSubmit={handleSubmit}
      submitLabel="Update Venue"
      loading={submitting}
    />
  );
}
