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

// Log Firebase initialization
console.log('🔥 [Firebase] Starting initialization...');

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Validate config
console.log('🔥 [Firebase] Config keys present:', {
  apiKey: !!firebaseConfig.apiKey,
  authDomain: !!firebaseConfig.authDomain,
  projectId: !!firebaseConfig.projectId,
  storageBucket: !!firebaseConfig.storageBucket,
  messagingSenderId: !!firebaseConfig.messagingSenderId,
  appId: !!firebaseConfig.appId,
  measurementId: !!firebaseConfig.measurementId,
});

// Initialize Firebase
let firebaseApp: any;
try {
  firebaseApp = initializeApp(firebaseConfig);
  console.log('✅ [Firebase] App initialized successfully');
} catch (error) {
  console.error('❌ [Firebase] Failed to initialize app:', error);
  throw new Error(`Firebase init failed: ${error instanceof Error ? error.message : String(error)}`);
}

// Initialize Auth with platform-specific persistence
let auth: any;
try {
  if (Platform.OS === 'web') {
    console.log('🔥 [Firebase] Initializing auth for web...');
    auth = getAuth(firebaseApp);
    console.log('✅ [Firebase] Auth service initialized (web)');

    // Set web persistence strategy
    console.log('🔥 [Firebase] Setting web persistence strategy...');
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.warn('⚠️ [Firebase] Local persistence failed, trying session persistence:', error);
      return setPersistence(auth, browserSessionPersistence);
    });
    console.log('✅ [Firebase] Web persistence configured');
  } else {
    console.log('🔥 [Firebase] Initializing auth for mobile with AsyncStorage persistence...');

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

      console.log('🔐 [Firebase] Using initializeAuth with ReactNativePersistence...');
      auth = initializeAuth(firebaseApp, {
        persistence: getReactNativePersistence(AsyncStorageModule),
      });
      console.log('✅ [Firebase] Auth service initialized (mobile) with AsyncStorage persistence');
    } catch (error) {
      console.warn('⚠️ [Firebase] Failed to initialize with ReactNativePersistence, falling back to getAuth:', error);
      // Fallback to basic getAuth if ReactNativePersistence setup fails
      auth = getAuth(firebaseApp);
      console.log('✅ [Firebase] Auth service initialized (mobile) without explicit persistence');
    }
  }
} catch (error) {
  console.error('❌ [Firebase] Failed to initialize auth:', error);
  throw new Error(`Firebase auth failed: ${error instanceof Error ? error.message : String(error)}`);
}

// Export auth and app
export { firebaseApp, auth };

// Initialize Storage
let storage: any;
try {
  storage = getStorage(firebaseApp);
  console.log('✅ [Firebase] Storage initialized');
} catch (error) {
  console.error('❌ [Firebase] Storage initialization failed:', error);
}
export { storage };

// Initialize Messaging (web only, native uses different approach)
export const getMessagingInstance = async () => {
  try {
    if (Platform.OS === 'web') {
      const supported = await isSupported();
      if (supported) {
        const messaging = getMessaging(firebaseApp);
        console.log('✅ [Firebase] Messaging initialized');
        return messaging;
      }
    }
  } catch (error) {
    console.error('⚠️ [Firebase] Messaging initialization failed:', error);
  }
  return null;
};
