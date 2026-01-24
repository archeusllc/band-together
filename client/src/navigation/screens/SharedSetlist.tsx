import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { tailwind } from '@theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SharedSetlist'>;

export const SharedSetlist = ({ route }: Props) => {
  const { shareToken } = route.params;

  useEffect(() => {
    console.log('[SharedSetlist] Opened with shareToken:', shareToken);
  }, [shareToken]);

  return (
    <View className={`flex-1 items-center justify-center ${tailwind.background.both}`}>
      <ActivityIndicator size="large" />
      <Text className={`mt-4 text-base ${tailwind.text.both}`}>
        Loading shared setlist...
      </Text>
      <Text className={`mt-2 text-sm ${tailwind.textMuted.both}`}>
        Token: {shareToken.substring(0, 8)}...
      </Text>
    </View>
  );
};
