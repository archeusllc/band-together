import { initializeApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  initializeAuth,
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported } from 'firebase/messaging';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let firebaseApp: any;
try {
  firebaseApp = initializeApp(firebaseConfig);
} catch (error) {
  throw new Error(`Firebase init failed: ${error instanceof Error ? error.message : String(error)}`);
}

// Initialize Auth with platform-specific persistence
let auth: any;
try {
  if (Platform.OS === 'web') {
    auth = getAuth(firebaseApp);
    // Set web persistence strategy
    setPersistence(auth, browserLocalPersistence).catch(() => {
      return setPersistence(auth, browserSessionPersistence);
    });
  } else {
    // For React Native, we need to explicitly enable AsyncStorage persistence
    // using getReactNativePersistence. This ensures session is properly restored
    // on app cold start (when app is killed and reopened).
    try {
      // Dynamically require modules at runtime to avoid bundler issues on web
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const firebaseAuthRN = require('@firebase/auth/dist/rn/index.js') as any;
      const { getReactNativePersistence } = firebaseAuthRN;
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const AsyncStorageModule = require('@react-native-async-storage/async-storage').default;

      auth = initializeAuth(firebaseApp, {
        persistence: getReactNativePersistence(AsyncStorageModule),
      });
    } catch (error) {
      // Fallback to basic getAuth if ReactNativePersistence setup fails
      auth = getAuth(firebaseApp);
    }
  }
} catch (error) {
  throw new Error(`Firebase auth failed: ${error instanceof Error ? error.message : String(error)}`);
}

// Export auth and app
export { firebaseApp, auth };

// Initialize Storage
let storage: any;
try {
  storage = getStorage(firebaseApp);
} catch (error) {
  // Storage initialization failure is non-critical
}
export { storage };

// Initialize Messaging (web only, native uses different approach)
export const getMessagingInstance = async () => {
  try {
    if (Platform.OS === 'web') {
      const supported = await isSupported();
      if (supported) {
        const messaging = getMessaging(firebaseApp);
        return messaging;
      }
    }
  } catch (error) {
    // Messaging initialization failure is non-critical
  }
  return null;
};
