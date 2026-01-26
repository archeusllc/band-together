import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '@navigation/types';
import { guildService, firebaseStorageService } from '@services';
import { GuildForm } from '@components';
import { AlertModal } from '@ui';

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

export const CreateVenueScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({ visible: false, title: '', message: '' });

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
          setAlertConfig({
            visible: true,
            title: 'Upload Error',
            message: 'Failed to upload image. Continuing without image.',
          });
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
        setAlertConfig({
          visible: true,
          title: 'Error',
          message: 'Failed to create venue. Please try again.',
        });
        return;
      }

      setAlertConfig({
        visible: true,
        title: 'Success',
        message: 'Venue created successfully!',
        onConfirm: () => {
          navigation.navigate('VenueDetails', { venueId: data.guildId });
        },
      });
    } catch (err) {
      console.error('Create venue error:', err);
      setAlertConfig({
        visible: true,
        title: 'Error',
        message: 'An unexpected error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1">
      <GuildForm
        guildType="VENUE"
        onSubmit={handleSubmit}
        submitLabel="Create Venue"
        loading={loading}
      />

      <AlertModal
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttons={[
          {
            text: 'OK',
            onPress: () => {
              setAlertConfig({ visible: false, title: '', message: '' });
              alertConfig.onConfirm?.();
            },
          },
        ]}
      />
    </View>
  );
}
