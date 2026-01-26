import admin from 'firebase-admin';

const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

const isPlaceholder = (value?: string) =>
  !value || value.includes('CONFIGURE_ME') || value.includes('placeholder');

if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  throw new Error('💥 Firebase Admin SDK environment variables are not defined');
}

let firebaseAdmin = admin;
let firebaseAuth: ReturnType<typeof admin.auth>;
let firebaseMessaging: ReturnType<typeof admin.messaging>;
let firebaseWarning: (() => void) | null = null;
let isFirebaseConfigured = false;

if (
  isPlaceholder(FIREBASE_PROJECT_ID) ||
  isPlaceholder(FIREBASE_CLIENT_EMAIL) ||
  isPlaceholder(FIREBASE_PRIVATE_KEY)
) {
  // Store warning to be called after server startup
  firebaseWarning = () => {
    console.log(``);
    console.warn(`\x1b[33m⚠️  Firebase Admin SDK is not configured --\x1b[0m \x1b[31mAuthentication features will not work.\x1b[0m`);
    console.log(`\x1b[33m   Create .env.local with Firebase credentials; see .env.development for details.\x1b[0m`);
  };
} else {
  // Initialize Firebase Admin
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });

  firebaseAuth = admin.auth();
  firebaseMessaging = admin.messaging();
  isFirebaseConfigured = true;
}

export { firebaseAdmin, firebaseAuth, firebaseMessaging, firebaseWarning, isFirebaseConfigured };
