import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { DrawerParamList } from '@navigation/types';
import { guildService, firebaseStorageService } from '@services';
import { AlertModal } from '@ui';
import { GuildForm } from '@components';
import { tailwind, colors } from '@theme';

type Props = DrawerScreenProps<DrawerParamList, 'EditAct'>;

export const EditActScreen = ({ route, navigation }: Props) => {
  const { actId } = route.params;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [guild, setGuild] = useState<any>(null);
  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({ visible: false, title: '', message: '' });

  useEffect(() => {
    fetchGuild();
  }, [actId]);

  const fetchGuild = async () => {
    setLoading(true);
    try {
      const { data, error } = await guildService.getActById(actId);
      if (error || !data) {
        setAlertConfig({
            visible: true,
            title: 'Error',
            message: 'Failed to load act details',
          });
        navigation.goBack();
        return;
      }
      setGuild(data);
    } catch (err) {
      setAlertConfig({
            visible: true,
            title: 'Error',
            message: 'Failed to load act details',
          });
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
          actId
        );

        if (uploadError) {
          setAlertConfig({
            visible: true,
            title: 'Upload Error',
            message: 'Failed to upload image. Continuing without updating image.',
          });
        } else if (url) {
          avatarUrl = url;
        }
      }

      const { data, error } = await guildService.updateAct(actId, {
        name: formData.name,
        bio: formData.bio,
        avatar: avatarUrl
      });

      if (error || !data) {
        setAlertConfig({
            visible: true,
            title: 'Error',
            message: 'Failed to update act. Please try again.',
          });
        return;
      }

      setAlertConfig({
        visible: true,
        title: 'Success',
        message: 'Act updated successfully!',
        onConfirm: () => {
          navigation.navigate('ActDetails', { actId });
        },
      });
    } catch (err) {
      console.error('Update act error:', err);
      setAlertConfig({
            visible: true,
            title: 'Error',
            message: 'An unexpected error occurred',
          });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !guild) {
    return (
      <View className={`flex-1 ${tailwind.background.both} justify-center items-center`}>
        <ActivityIndicator size="large" color={colors.brand.primary} />
        <Text className={`text-base ${tailwind.textMuted.both} mt-4`}>
          Loading act...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <GuildForm
        guildType="ACT"
        initialData={{
          name: guild.name,
          bio: guild.act?.bio || undefined,
          avatar: guild.act?.avatar || undefined
        }}
        onSubmit={handleSubmit}
        submitLabel="Update Act"
        loading={submitting}
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
