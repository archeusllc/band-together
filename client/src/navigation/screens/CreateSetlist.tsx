import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, ScrollView, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { DrawerParamList } from '@navigation/types';
import { setlistService, guildService } from '@services';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';

type Props = DrawerScreenProps<DrawerParamList, 'CreateSetlist'>;

interface FormData {
  name: string;
  description: string;
  guildId?: string;
}

interface GuildOption {
  id: string;
  name: string;
  type: 'ACT' | 'VENUE' | 'CLUB';
}

export const CreateSetlistScreen = ({ navigation }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    guildId: undefined,
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [guilds, setGuilds] = useState<GuildOption[]>([]);
  const [showGuildDropdown, setShowGuildDropdown] = useState(false);

  useEffect(() => {
    fetchUserGuilds();
  }, []);

  const fetchUserGuilds = async () => {
    setLoading(true);
    try {
      // Fetch all guild types and filter to user's owned guilds
      const [actRes, venueRes, clubRes] = await Promise.all([
        guildService.getActs(1, 100),
        guildService.getVenues(1, 100),
        guildService.getClubs(1, 100),
      ]);

      const allGuilds: GuildOption[] = [];

      if (actRes.data?.items) {
        allGuilds.push(
          ...actRes.data.items.map((act: any) => ({
            id: act.guildId,
            name: act.name,
            type: 'ACT' as const,
          }))
        );
      }

      if (venueRes.data?.items) {
        allGuilds.push(
          ...venueRes.data.items.map((venue: any) => ({
            id: venue.guildId,
            name: venue.name,
            type: 'VENUE' as const,
          }))
        );
      }

      if (clubRes.data?.items) {
        allGuilds.push(
          ...clubRes.data.items.map((club: any) => ({
            id: club.guildId,
            name: club.name,
            type: 'CLUB' as const,
          }))
        );
      }

      setGuilds(allGuilds);
    } catch (err) {
      console.error('Failed to fetch guilds:', err);
      // Silently fail - guild association is optional
    } finally {
      setLoading(false);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.length < 1) {
      newErrors.name = 'Setlist name is required';
    }
    if (formData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }
    if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSubmitting(true);
    try {
      const { data, error } = await setlistService.createSetlist({
        name: formData.name,
        description: formData.description || undefined,
        guildId: formData.guildId || undefined,
      });

      if (error || !data) {
        // Extract error message from various error formats
        let errorMessage = 'Failed to create setlist. Please try again.';
        if (error) {
          if (typeof error === 'string') {
            errorMessage = error;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          } else if (typeof error === 'object' && 'message' in error) {
            errorMessage = (error as any).message;
          }
        }
        Alert.alert('Error', errorMessage);
        console.error('Create setlist error details:', error);
        return;
      }

      Alert.alert('Success', 'Setlist created!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('SetlistDetails', { setlistId: data.setListId });
          },
        },
      ]);
    } catch (err) {
      console.error('Create setlist error:', err);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedGuild = guilds.find((g) => g.id === formData.guildId);

  return (
    <ScrollView className={`flex-1 ${tailwind.background.both}`}>
      <View className="p-5">
        {/* Title */}
        <Text className={`text-2xl font-bold ${tailwind.text.both} mb-6`}>
          Create Setlist
        </Text>

        {/* Name Field */}
        <Text className={`text-base font-semibold ${tailwind.text.both} mb-2`}>
          Setlist Name *
        </Text>
        <TextInput
          className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg p-3 mb-1 ${tailwind.text.both}`}
          placeholder="Enter setlist name"
          placeholderTextColor={colors.light.muted}
          value={formData.name}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, name: text }))}
          maxLength={100}
          editable={!submitting}
        />
        {errors.name && <Text className={`text-sm ${tailwind.error} mb-2`}>{errors.name}</Text>}
        <Text className={`text-xs ${tailwind.textMuted.both} mb-4`}>
          {formData.name.length}/100 characters
        </Text>

        {/* Description Field */}
        <Text className={`text-base font-semibold ${tailwind.text.both} mb-2`}>
          Description (Optional)
        </Text>
        <TextInput
          className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg p-3 mb-1 ${tailwind.text.both}`}
          placeholder="Add a description (e.g., 'Set 1 of my concert')"
          placeholderTextColor={colors.light.muted}
          value={formData.description}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, description: text }))}
          multiline
          numberOfLines={3}
          maxLength={500}
          editable={!submitting}
        />
        {errors.description && <Text className={`text-sm ${tailwind.error} mb-2`}>{errors.description}</Text>}
        <Text className={`text-xs ${tailwind.textMuted.both} mb-4`}>
          {formData.description.length}/500 characters
        </Text>

        {/* Guild Association */}
        <Text className={`text-base font-semibold ${tailwind.text.both} mb-2`}>
          Associate with Act/Venue/Club (Optional)
        </Text>
        <Pressable
          className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg p-3 mb-4 flex-row items-center justify-between`}
          onPress={() => setShowGuildDropdown(!showGuildDropdown)}
          disabled={submitting || guilds.length === 0}
        >
          <View className="flex-1">
            <Text className={selectedGuild ? tailwind.text.both : `${tailwind.textMuted.both}`}>
              {selectedGuild ? selectedGuild.name : 'Select (optional)'}
            </Text>
          </View>
          <IconSymbol
            name={showGuildDropdown ? 'chevron.up' : 'chevron.down'}
            size={20}
            color={colors.light.muted}
          />
        </Pressable>

        {/* Guild Dropdown */}
        {showGuildDropdown && guilds.length > 0 && (
          <View className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg mb-4 overflow-hidden`}>
            <Pressable
              className={`p-3 border-b ${tailwind.border.both}`}
              onPress={() => {
                setFormData((prev) => ({ ...prev, guildId: undefined }));
                setShowGuildDropdown(false);
              }}
            >
              <Text className={tailwind.text.both}>None (Personal Setlist)</Text>
            </Pressable>
            <FlatList
              data={guilds}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <View>
                  <Pressable
                    className={`p-3 ${index < guilds.length - 1 ? `border-b ${tailwind.border.both}` : ''}`}
                    onPress={() => {
                      setFormData((prev) => ({ ...prev, guildId: item.id }));
                      setShowGuildDropdown(false);
                    }}
                  >
                    <View className="flex-row items-center gap-2">
                      <Text className={`text-xs px-2 py-1 rounded ${item.type === 'ACT' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : item.type === 'VENUE' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200' : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'}`}>
                        {item.type}
                      </Text>
                      <Text className={`flex-1 ${tailwind.text.both}`}>{item.name}</Text>
                    </View>
                  </Pressable>
                </View>
              )}
            />
          </View>
        )}

        {guilds.length === 0 && !loading && (
          <Text className={`text-xs ${tailwind.textMuted.both} mb-4`}>
            No acts, venues, or clubs available. You can create a personal setlist without association.
          </Text>
        )}

        {/* Submit Button */}
        <Pressable
          className={`bg-blue-500 py-4 rounded-lg items-center ${submitting ? 'opacity-50' : ''}`}
          onPress={handleSubmit}
          disabled={submitting || loading}
        >
          {submitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white text-base font-semibold">Create Setlist</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};
