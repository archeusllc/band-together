import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { apiBaseUrl } from '@services';
import { tailwind } from '@theme';

type ApiStatus = 'checking' | 'online' | 'offline';

export default function SettingsScreen() {
  const [apiStatus, setApiStatus] = React.useState<ApiStatus>('checking');

  React.useEffect(() => {
    let cancelled = false;

    const checkApi = async () => {
      setApiStatus('checking');
      try {
        const response = await fetch(`${apiBaseUrl}/health`);
        if (!cancelled) {
          setApiStatus(response.ok ? 'online' : 'offline');
        }
      } catch (_) {
        if (!cancelled) setApiStatus('offline');
      }
    };

    checkApi();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ScrollView className={`flex-1 ${tailwind.background.both}`}>
      <View className={`mt-5 ${tailwind.card.both} px-4`}>
        <Text className={`text-xs font-semibold ${tailwind.textMuted.both} uppercase tracking-wider px-4 pt-4 pb-2 ${tailwind.background.both} -mx-4`}>About</Text>
        <View className={`flex-row justify-between items-center py-3 border-b ${tailwind.border.both}`}>
          <Text className={`text-base ${tailwind.text.both}`}>API Status</Text>
          <View className="items-end">
            <Text
              className={`text-base font-semibold ${apiStatus === 'online'
                  ? 'text-green-600'
                  : apiStatus === 'offline'
                    ? 'text-red-600'
                    : tailwind.textMutedLight.light
                }`}
            >
              {apiStatus === 'checking' ? 'Checking…' : apiStatus === 'online' ? 'Online' : 'Offline'}
            </Text>
            <Text className={`text-xs ${tailwind.textMuted.both} font-mono`} numberOfLines={1}>
              {apiBaseUrl}
            </Text>
          </View>
        </View>
        <View className={`flex-row justify-between items-center py-3 border-b ${tailwind.border.both}`}>
          <Text className={`text-base ${tailwind.text.both}`}>Version</Text>
          <Text className={`text-base ${tailwind.textMuted.both}`}>1.0.0</Text>
        </View>
        <View className={`flex-row justify-between items-center py-3 border-b ${tailwind.border.both}`}>
          <Text className={`text-base ${tailwind.text.both}`}>Build</Text>
          <Text className={`text-base ${tailwind.textMuted.both}`}>2026.01.18</Text>
        </View>
      </View>

      <View className={`m-5 p-4 ${tailwind.card.both} rounded-lg`}>
        <Text className={`text-sm ${tailwind.textMuted.both} text-center italic`}>
          Additional settings will be available in future updates
        </Text>
      </View>
    </ScrollView>
  );
}

