import React from 'react';
import { View, Text, ScrollView, Switch, Alert } from 'react-native';
import { apiBaseUrl, firebaseMessagingService } from '@services';
import { useAuth } from '@/contexts/AuthContext';

type ApiStatus = 'checking' | 'online' | 'offline';

export default function SettingsScreen() {
  const { user } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
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
    <ScrollView className="flex-1 bg-slate-100">
      <View className="mt-5 bg-white px-4">
        <Text className="text-xs font-semibold text-gray-600 uppercase tracking-wider px-4 pt-4 pb-2 bg-slate-100 -mx-4">Preferences</Text>

        <View className="flex-row items-center justify-between py-3 border-b border-slate-200">
          <View className="flex-1 mr-3">
            <Text className="text-base font-medium text-black mb-0.5">Notifications</Text>
            <Text className="text-sm text-gray-600">Receive push notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationToggle}
          />
        </View>

        <View className="flex-row items-center justify-between py-3 border-b border-slate-200">
          <View className="flex-1 mr-3">
            <Text className="text-base font-medium text-black mb-0.5">Dark Mode</Text>
            <Text className="text-sm text-gray-600">Use dark theme</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
          />
        </View>
      </View>

      <View className="mt-5 bg-white px-4">
        <Text className="text-xs font-semibold text-gray-600 uppercase tracking-wider px-4 pt-4 pb-2 bg-slate-100 -mx-4">About</Text>
        <View className="flex-row justify-between items-center py-3 border-b border-slate-200">
          <Text className="text-base text-black">API Status</Text>
          <View className="items-end">
            <Text
              className={`text-base font-semibold ${apiStatus === 'online'
                  ? 'text-green-600'
                  : apiStatus === 'offline'
                    ? 'text-red-600'
                    : 'text-gray-600'
                }`}
            >
              {apiStatus === 'checking' ? 'Checking…' : apiStatus === 'online' ? 'Online' : 'Offline'}
            </Text>
            <Text className="text-xs text-gray-600 font-mono" numberOfLines={1}>
              {apiBaseUrl}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center py-3 border-b border-slate-200">
          <Text className="text-base text-black">Version</Text>
          <Text className="text-base text-gray-600">1.0.0</Text>
        </View>
        <View className="flex-row justify-between items-center py-3 border-b border-slate-200">
          <Text className="text-base text-black">Build</Text>
          <Text className="text-base text-gray-600">2026.01.18</Text>
        </View>
      </View>

      <View className="m-5 p-4 bg-white rounded-lg">
        <Text className="text-sm text-gray-600 text-center italic">
          Additional settings will be available in future updates
        </Text>
      </View>
    </ScrollView>
  );
}

