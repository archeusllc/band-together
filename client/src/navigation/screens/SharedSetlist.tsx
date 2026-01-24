import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { tailwind, colors } from '@theme';
import { setlistService } from '@services';

type Props = NativeStackScreenProps<RootStackParamList, 'SharedSetlist'>;

export const SharedSetlist = ({ route }: Props) => {
  const { shareToken } = route.params;
  const navigation = useNavigation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAndNavigate();
  }, [shareToken, navigation]);

  const loadAndNavigate = async () => {
    try {
      console.log('[SharedSetlist] Fetching setlist with token:', shareToken.substring(0, 10) + '...');
      const result = await setlistService.getSetlistByShareToken(shareToken);

      console.log('[SharedSetlist] Raw response:', result);
      const { data, error: fetchError } = result;

      console.log('[SharedSetlist] Parsed response:', { data, fetchError, hasData: !!data, hasError: !!fetchError });

      if (fetchError || !data) {
        console.error('[SharedSetlist] Failed to fetch setlist - Error:', fetchError, 'Data:', data);
        setError(`Failed to load shared setlist: ${fetchError ? String(fetchError) : 'No data returned'}`);
        return;
      }

      console.log('[SharedSetlist] Got setlist, navigating to SetlistDetails:', data.setListId);
      // Navigate using the full navigation context that includes drawer access
      (navigation as any).navigate('MainDrawer', {
        screen: 'SetlistDetails',
        params: {
          setlistId: data.setListId,
          shareToken,
        },
      });
    } catch (err) {
      console.error('[SharedSetlist] Error loading setlist:', err);
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  if (error) {
    return (
      <View className={`flex-1 items-center justify-center ${tailwind.background.both}`}>
        <View className="items-center px-6">
          <Text className={`text-lg font-bold ${tailwind.text.both} mb-2`}>
            Unable to Load Setlist
          </Text>
          <Text className={`text-base text-center ${tailwind.textMuted.both}`}>
            {error}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className={`flex-1 items-center justify-center ${tailwind.background.both}`}>
      <ActivityIndicator size="large" color={colors.brand.primary} />
      <Text className={`mt-4 text-base ${tailwind.text.both}`}>
        Loading shared setlist...
      </Text>
    </View>
  );
};
