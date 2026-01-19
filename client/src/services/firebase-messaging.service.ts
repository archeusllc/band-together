import { Platform } from 'react-native';
import * as Device from 'expo-device';
import { getMessagingInstance } from '@/config/firebase.config';
import { getToken, onMessage } from 'firebase/messaging';
import { api } from './api';

// Lazy load notifications only on native platforms to avoid SDK 53 issues
let Notifications: any = null;
let notificationsInitialized = false;

const ensureNotificationsInitialized = async () => {
  if (notificationsInitialized || Platform.OS === 'web') {
    return;
  }

  try {
    Notifications = await import('expo-notifications');
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
    notificationsInitialized = true;
  } catch (error) {
    console.error('Failed to initialize notifications:', error);
  }
};

export const firebaseMessagingService = {
  /**
   * Request notification permissions
   */
  requestPermissions: async (): Promise<boolean> => {
    if (!Device.isDevice) {
      console.log('Notifications only work on physical devices');
      return false;
    }

    if (Platform.OS === 'web') {
      return false;
    }

    await ensureNotificationsInitialized();

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  },

  /**
   * Get push token for the current device
   */
  getPushToken: async (): Promise<{ token: string | null; error: any }> => {
    try {
      if (Platform.OS === 'web') {
        // Web FCM token
        const messaging = await getMessagingInstance();
        if (!messaging) {
          return { token: null, error: new Error('Messaging not supported') };
        }

        const token = await getToken(messaging, {
          vapidKey: process.env.EXPO_PUBLIC_FIREBASE_VAPID_KEY,
        });

        return { token, error: null };
      } else {
        // Native (Android) using Expo Notifications
        try {
          await ensureNotificationsInitialized();

          const hasPermission = await firebaseMessagingService.requestPermissions();
          if (!hasPermission) {
            return { token: null, error: new Error('Permission denied') };
          }

          const tokenData = await Notifications.getExpoPushTokenAsync({
            projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
          });

          return { token: tokenData.data, error: null };
        } catch (nativeError: any) {
          // Handle SDK 53+ compatibility issues gracefully
          if (nativeError?.message?.includes('SDK 53') || nativeError?.message?.includes('Expo Go')) {
            console.warn('Push notifications require a development build (not Expo Go)');
            return { token: null, error: nativeError };
          }
          console.error('Error getting push token:', nativeError);
          return { token: null, error: nativeError };
        }
      }
    } catch (error) {
      return { token: null, error };
    }
  },

  /**
   * Register push token with backend
   */
  registerPushToken: async (userId: string): Promise<{ error: any }> => {
    try {
      const { token, error: tokenError } = await firebaseMessagingService.getPushToken();

      if (tokenError || !token) {
        return { error: tokenError || new Error('No token') };
      }

      const platform = Platform.OS === 'android' ? 'ANDROID' : 'WEB';
      const deviceId = Device.deviceName || undefined;

      const { error } = await api.notifications.register.post({
        userId,
        token,
        platform,
        deviceId,
      });

      return { error };
    } catch (error) {
      return { error };
    }
  },

  /**
   * Unregister push token from backend
   */
  unregisterPushToken: async (token: string): Promise<{ error: any }> => {
    try {
      const { error } = await api.notifications.unregister.post({ token });
      return { error };
    } catch (error) {
      return { error };
    }
  },

  /**
   * Set up foreground message listener
   */
  setupForegroundListener: async (callback: (payload: any) => void) => {
    if (Platform.OS === 'web') {
      const messaging = await getMessagingInstance();
      if (messaging) {
        return onMessage(messaging, callback);
      }
    } else {
      // For native, use Expo Notifications
      try {
        await ensureNotificationsInitialized();
        return Notifications.addNotificationReceivedListener(callback);
      } catch (error) {
        console.error('Error setting up foreground listener:', error);
      }
    }
  },

  /**
   * Set up notification response listener
   */
  setupNotificationResponseListener: async (callback: (response: any) => void) => {
    if (Platform.OS === 'web') {
      return;
    }

    try {
      await ensureNotificationsInitialized();
      return Notifications.addNotificationResponseReceivedListener(callback);
    } catch (error) {
      console.error('Error setting up response listener:', error);
    }
  },
};
