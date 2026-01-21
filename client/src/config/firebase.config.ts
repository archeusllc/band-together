import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
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
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Auth (platform-agnostic)
// Firebase SDK v12+ handles platform-specific persistence automatically
export const auth = getAuth(firebaseApp);

// Set up persistence for web after auth is initialized
if (Platform.OS === 'web') {
  setPersistence(auth, browserLocalPersistence).catch(() => {
    // Fallback to session persistence if local persistence fails
    return setPersistence(auth, browserSessionPersistence);
  });
}

// Initialize Storage
export const storage = getStorage(firebaseApp);

// Initialize Messaging (web only, native uses different approach)
export const getMessagingInstance = async () => {
  if (Platform.OS === 'web') {
    const supported = await isSupported();
    if (supported) {
      return getMessaging(firebaseApp);
    }
  }
  return null;
};
