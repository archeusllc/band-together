import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '@navigation/types';
import { guildService, firebaseStorageService } from '@services';
import { AlertModal } from '@ui';
import { GuildForm } from '@components';

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

export const CreateActScreen = () => {
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

      // Upload avatar if local file selected
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

      // Create act
      const { data, error } = await guildService.createAct({
        name: formData.name,
        bio: formData.bio,
        avatar: avatarUrl
      });

      if (error || !data) {
        setAlertConfig({
          visible: true,
          title: 'Error',
          message: 'Failed to create act. Please try again.',
        });
        return;
      }

      setAlertConfig({
        visible: true,
        title: 'Success',
        message: 'Act created successfully!',
        onConfirm: () => {
          navigation.navigate('ActDetails', { actId: data.guildId });
        },
      });
    } catch (err) {
      console.error('Create act error:', err);
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
        guildType="ACT"
        onSubmit={handleSubmit}
        submitLabel="Create Act"
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
