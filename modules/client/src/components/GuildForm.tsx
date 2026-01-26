import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { tailwind, colors } from '@theme';
import { IconSymbol, AlertModal } from '@ui';

interface GuildFormData {
  name: string;
  bio?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  avatar?: string;
}

interface GuildFormProps {
  guildType: 'ACT' | 'VENUE' | 'CLUB';
  initialData?: Partial<GuildFormData>;
  onSubmit: (data: GuildFormData) => Promise<void>;
  submitLabel: string;
  loading?: boolean;
}

export const GuildForm = ({ guildType, initialData, onSubmit, submitLabel, loading }: GuildFormProps) => {
  const [formData, setFormData] = useState<GuildFormData>({
    name: initialData?.name || '',
    bio: initialData?.bio || '',
    description: initialData?.description || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipCode: initialData?.zipCode || '',
    avatar: initialData?.avatar || ''
  });

  const [imagePickerLoading, setImagePickerLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    title: string;
    message: string;
  }>({ visible: false, title: '', message: '' });

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      setAlertConfig({
        visible: true,
        title: 'Permission Required',
        message: 'Please allow access to your photo library',
      });
      return;
    }

    setImagePickerLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setFormData(prev => ({ ...prev, avatar: result.assets[0].uri }));
      }
    } catch (error) {
      setAlertConfig({
        visible: true,
        title: 'Error',
        message: 'Failed to pick image',
      });
    } finally {
      setImagePickerLoading(false);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (formData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await onSubmit(formData);
  };

  const guildTypeLabel = guildType === 'ACT' ? 'Act' : guildType === 'VENUE' ? 'Venue' : 'Club';

  return (
    <ScrollView className={`flex-1 ${tailwind.background.both}`}>
      <View className="p-5">
        {/* Avatar Upload */}
        <View className="items-center mb-6">
          <Pressable
            onPress={pickImage}
            disabled={imagePickerLoading}
            className={`w-32 h-32 rounded-full ${tailwind.activeBackground.both} items-center justify-center border-2 ${tailwind.border.both}`}
          >
            {imagePickerLoading ? (
              <ActivityIndicator size="large" color={colors.brand.primary} />
            ) : formData.avatar ? (
              <Image
                source={{ uri: formData.avatar }}
                className="w-full h-full rounded-full"
                resizeMode="cover"
              />
            ) : (
              <IconSymbol name="camera" size={48} color={colors.light.muted} />
            )}
          </Pressable>
          <Text className={`text-sm ${tailwind.textMuted.both} mt-2`}>
            Tap to {formData.avatar ? 'change' : 'add'} image
          </Text>
        </View>

        {/* Name Field */}
        <Text className={`text-base font-semibold ${tailwind.text.both} mb-2`}>
          {guildTypeLabel} Name *
        </Text>
        <TextInput
          className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg p-3 mb-1 ${tailwind.text.both}`}
          placeholder={`Enter ${guildTypeLabel.toLowerCase()} name`}
          placeholderTextColor={colors.light.muted}
          value={formData.name}
          onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
          maxLength={100}
        />
        {errors.name && (
          <Text className={`text-sm ${tailwind.error} mb-2`}>{errors.name}</Text>
        )}
        <Text className={`text-xs ${tailwind.textMuted.both} mb-4`}>
          {formData.name.length}/100 characters
        </Text>

        {/* Type-Specific Fields */}
        {guildType === 'ACT' && (
          <>
            <Text className={`text-base font-semibold ${tailwind.text.both} mb-2`}>
              Bio
            </Text>
            <TextInput
              className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg p-3 mb-4 ${tailwind.text.both}`}
              placeholder="Tell us about your musical act"
              placeholderTextColor={colors.light.muted}
              value={formData.bio}
              onChangeText={(text) => setFormData(prev => ({ ...prev, bio: text }))}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
          </>
        )}

        {guildType === 'VENUE' && (
          <>
            <Text className={`text-base font-semibold ${tailwind.text.both} mb-2`}>
              Address
            </Text>
            <TextInput
              className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg p-3 mb-4 ${tailwind.text.both}`}
              placeholder="Street address"
              placeholderTextColor={colors.light.muted}
              value={formData.address}
              onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
              maxLength={200}
            />

            <View className="flex-row gap-2 mb-4">
              <View className="flex-1">
                <Text className={`text-base font-semibold ${tailwind.text.both} mb-2`}>
                  City
                </Text>
                <TextInput
                  className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg p-3 ${tailwind.text.both}`}
                  placeholder="City"
                  placeholderTextColor={colors.light.muted}
                  value={formData.city}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, city: text }))}
                  maxLength={100}
                />
              </View>

              <View className="w-24">
                <Text className={`text-base font-semibold ${tailwind.text.both} mb-2`}>
                  State
                </Text>
                <TextInput
                  className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg p-3 ${tailwind.text.both}`}
                  placeholder="ST"
                  placeholderTextColor={colors.light.muted}
                  value={formData.state}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, state: text.toUpperCase() }))}
                  maxLength={2}
                  autoCapitalize="characters"
                />
              </View>
            </View>

            <Text className={`text-base font-semibold ${tailwind.text.both} mb-2`}>
              ZIP Code
            </Text>
            <TextInput
              className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg p-3 mb-4 ${tailwind.text.both}`}
              placeholder="ZIP Code"
              placeholderTextColor={colors.light.muted}
              value={formData.zipCode}
              onChangeText={(text) => setFormData(prev => ({ ...prev, zipCode: text }))}
              maxLength={20}
              keyboardType="numeric"
            />
          </>
        )}

        {guildType === 'CLUB' && (
          <>
            <Text className={`text-base font-semibold ${tailwind.text.both} mb-2`}>
              Description
            </Text>
            <TextInput
              className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg p-3 mb-4 ${tailwind.text.both}`}
              placeholder="Describe your fan club"
              placeholderTextColor={colors.light.muted}
              value={formData.description}
              onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
              multiline
              numberOfLines={4}
              maxLength={1000}
            />
          </>
        )}

        {/* Submit Button */}
        <Pressable
          className={`bg-blue-500 py-4 rounded-lg items-center ${loading ? 'opacity-50' : ''}`}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white text-base font-semibold">{submitLabel}</Text>
          )}
        </Pressable>
      </View>

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
    </ScrollView>
  );
};
