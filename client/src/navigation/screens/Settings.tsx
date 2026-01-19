import React from 'react';
import { View, Text, ScrollView, Switch, Alert } from 'react-native';
import { apiBaseUrl, firebaseMessagingService } from '@services';
import { useAuth } from '@contexts';
import { colors, tailwind } from '@theme';

type ApiStatus = 'checking' | 'online' | 'offline';

export default function SettingsScreen() {
  const { user } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
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

  const handleNotificationToggle = async (value: boolean) => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to enable notifications');
      return;
    }

    try {
      if (value) {
        // Enable notifications
        const hasPermission = await firebaseMessagingService.requestPermissions();

        if (!hasPermission) {
          Alert.alert(
            'Permission Denied',
            'Please enable notifications in your device settings'
          );
          return;
        }

        const { error } = await firebaseMessagingService.registerPushToken(user.id);

        if (error) {
          Alert.alert('Error', 'Failed to enable notifications');
          return;
        }

        setNotificationsEnabled(true);
      } else {
        // Disable notifications
        const { token } = await firebaseMessagingService.getPushToken();
        if (token) {
          await firebaseMessagingService.unregisterPushToken(token);
        }
        setNotificationsEnabled(false);
      }
    } catch (error) {
      console.error('Notification toggle error:', error);
      Alert.alert(
        'Error',
        'An error occurred with notifications. This may require a development build.'
      );
    }
  };

  return (
    <ScrollView className={`flex-1 ${tailwind.background.both}`}>
      <View className={`mt-5 ${tailwind.card.both} px-4`}>
        <Text className={`text-xs font-semibold ${tailwind.textMuted.both} uppercase tracking-wider px-4 pt-4 pb-2 ${tailwind.background.both} -mx-4`}>Preferences</Text>

        <View className={`flex-row items-center justify-between py-3 border-b ${tailwind.border.both}`}>
          <View className="flex-1 mr-3">
            <Text className={`text-base font-medium ${tailwind.text.both} mb-0.5`}>Notifications</Text>
            <Text className={`text-sm ${tailwind.textMuted.both}`}>Receive push notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationToggle}
          />
        </View>
      </View>

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

