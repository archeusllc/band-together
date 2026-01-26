import admin from 'firebase-admin';

const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  throw new Error('💥 Firebase Admin SDK environment variables are not defined');
}

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

export const firebaseAdmin = admin;
export const firebaseAuth = admin.auth();
export const firebaseMessaging = admin.messaging();
