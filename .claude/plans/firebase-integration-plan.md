# Firebase Integration Implementation Plan

## Overview
Replace the current JWT-based authentication system with Firebase Authentication and add Firebase Storage and Cloud Messaging for a complete Firebase integration in the Band Together Expo/React Native monorepo.

## Prerequisites

### Firebase Console Setup (Required First)
Before implementation, you need to complete setup for your existing Firebase project "band-together-firebase":

1. **Access Firebase Project**: Go to [Firebase Console](https://console.firebase.google.com/) and open your existing project "band-together-firebase"

2. **Register Apps** (skipping iOS for now - no Apple Developer account):
   - **Android App**: Register with package `com.bandtogether.mobile` → Download `google-services.json`
   - **Web App**: Register and copy the Firebase config object (API keys, etc.)

3. **Enable Services**:
   - **Authentication**: Enable Email/Password provider
   - **Storage**: Initialize with production mode rules
   - **Cloud Messaging**:
     - Note the auto-generated FCM Server Key and Sender ID (for Android)
     - Generate VAPID key pair for web push (for Web)

4. **Download Service Account Key**:
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key" → Download JSON file
   - You'll extract credentials from this file for API server

## Implementation Steps

### Phase 1: Database Schema Updates

**File**: [db/prisma/schema.prisma](../../../db/prisma/schema.prisma)

Add Firebase UID field and push token management:
- Add `firebaseUid` field to User model (unique, optional)
- Create new `PushToken` model with userId, token, platform, deviceId
- Create `PushTokenPlatform` enum (IOS, ANDROID, WEB)

Run migration:
```bash
cd db && npx prisma migrate dev --name add_firebase_fields_and_push_tokens && npx prisma generate
```

### Phase 2: Client Environment Configuration

**File**: [client/.env.local](../../../client/.env.local)

Add Firebase Web SDK configuration variables (all prefixed with `EXPO_PUBLIC_`):
- API Key, Auth Domain, Project ID, Storage Bucket
- Messaging Sender ID, App ID, Measurement ID
- VAPID Key for web push notifications

Place credential files:
- Save `google-services.json` to `client/google-services.json` (Android only for now)

### Phase 3: Client Dependencies

**File**: [client/package.json](../../../client/package.json)

Install packages:
```bash
npm install firebase@^11.1.0 expo-notifications@~16.0.0 expo-device@~7.0.1 @react-native-async-storage/async-storage@^2.1.0
```

Update app configuration:

**File**: [client/app.json](../../../client/app.json)
- Add `googleServicesFile` path for Android
- Add `expo-notifications` plugin with configuration
- Verify Android package name matches Firebase registration

### Phase 4: Client Firebase Services

Create three new Firebase service files:

**File**: [client/src/config/firebase.config.ts](../../../client/src/config/firebase.config.ts)
- Initialize Firebase app with config from environment variables
- Set up Auth with AsyncStorage persistence for React Native
- Initialize Storage for file uploads
- Initialize Messaging (web uses Firebase SDK, native uses Expo Notifications)

**File**: [client/src/services/firebase-auth.service.ts](../../../client/src/services/firebase-auth.service.ts)
- `register()`: Create Firebase user, get ID token, sync with backend
- `login()`: Authenticate with Firebase, verify with backend
- `logout()`: Sign out from Firebase and clear backend session
- `getIdToken()`: Get current user's Firebase ID token for API requests
- `onAuthStateChanged()`: Listen to Firebase auth state changes

**File**: [client/src/services/firebase-storage.service.ts](../../../client/src/services/firebase-storage.service.ts)
- `uploadAvatar()`: Upload image to `avatars/{userId}/{filename}` path
- `deleteFile()`: Remove files from Firebase Storage
- Handles image URI to blob conversion for React Native

**File**: [client/src/services/firebase-messaging.service.ts](../../../client/src/services/firebase-messaging.service.ts)
- `requestPermissions()`: Request push notification permissions
- `getPushToken()`: Get FCM token (web) or Expo push token (native)
- `registerPushToken()`: Send token to backend for storage
- `unregisterPushToken()`: Remove token from backend
- `setupForegroundListener()`: Handle notifications when app is open
- `setupNotificationResponseListener()`: Handle notification taps

Update services index:

**File**: [client/src/services/index.ts](../../../client/src/services/index.ts)
- Export all new Firebase services

### Phase 5: Client Auth Context Update

**File**: [client/src/contexts/AuthContext.tsx](../../../client/src/contexts/AuthContext.tsx)

Major refactor to use Firebase Authentication:
- Add `firebaseUser` state alongside existing `user` state
- Set up `onAuthStateChanged` listener in useEffect
- Update `login()` to use `firebaseAuthService.login()` and register push token
- Update `register()` to use `firebaseAuthService.register()` and register push token
- Update `logout()` to unregister push token before signing out
- Add `refreshUser()` method to fetch user data from backend with ID token
- Update `isAuthenticated` to check both Firebase user and backend user

### Phase 6: Client Settings Screen Update

**File**: [client/src/navigation/screens/Settings.tsx](../../../client/src/navigation/screens/Settings.tsx)

Connect notifications toggle to actual functionality:
- Add state for `notificationsEnabled`
- Implement `handleNotificationToggle()`:
  - On enable: Request permissions, register push token
  - On disable: Unregister push token
- Add user login check before allowing notification toggle

### Phase 7: API Environment Configuration

**File**: [api/.env.development](../../../api/.env.development)

Add Firebase Admin SDK credentials (extracted from service account JSON):
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (ensure `\n` for newlines)

### Phase 8: API Dependencies

**File**: [api/package.json](../../../api/package.json)

Install Firebase Admin SDK:
```bash
npm install firebase-admin@^13.0.1
```

### Phase 9: API Firebase Admin Setup

**File**: [api/src/config/firebase-admin.config.ts](../../../api/src/config/firebase-admin.config.ts)
- Initialize Firebase Admin SDK with service account credentials
- Export `firebaseAdmin`, `firebaseAuth`, `firebaseMessaging` instances

**File**: [api/src/middleware/firebase-auth.middleware.ts](../../../api/src/middleware/firebase-auth.middleware.ts)
- Create `firebaseAuthMiddleware`: Extract Bearer token, verify with `firebaseAuth.verifyIdToken()`
- Create `firebaseAuthGuard`: Check if `firebaseUid` exists, return 401 if not
- Add to middleware exports

**File**: [api/src/middleware/index.ts](../../../api/src/middleware/index.ts)
- Export new Firebase auth middleware

### Phase 10: API Auth Controller Update

**File**: [api/src/controllers/auth.controller.ts](../../../api/src/controllers/auth.controller.ts)

Replace placeholder implementations:
- `register()`: Verify ID token, create user with `firebaseUid` in database
- `login()`: Verify ID token, find user by `firebaseUid`, return user data
- `me()`: Look up user by `firebaseUid` (called with Bearer token)
- `logout()`: No-op (Firebase tokens are stateless, handled client-side)
- `resetPassword()`: Verify email exists (actual reset done client-side with Firebase)

### Phase 11: API Auth Routes Update

**File**: [api/src/routes/auth.routes.ts](../../../api/src/routes/auth.routes.ts)

Update route handlers:
- `/auth/register`: Accept `email`, `displayName`, `firebaseUid`, `idToken`
- `/auth/login`: Accept `firebaseUid`, `idToken`
- `/auth/me`: Protected route using `firebaseAuthMiddleware`
- `/auth/logout`: Simplified (no cookie clearing needed)
- `/auth/reset`: Email verification only

### Phase 12: API Notification System

**File**: [api/src/controllers/notification.controller.ts](../../../api/src/controllers/notification.controller.ts)
- `registerToken()`: Store push token in database (upsert by token)
- `unregisterToken()`: Remove token from database
- `sendNotification()`: Send FCM message to user's tokens, clean up invalid tokens
- `sendBulkNotification()`: Send to multiple users at once

**File**: [api/src/routes/notification.routes.ts](../../../api/src/routes/notification.routes.ts)
- `POST /notifications/register`: Register push token (protected)
- `POST /notifications/unregister`: Remove push token (protected)
- `POST /notifications/send`: Send notification to user (protected)

Update exports:

**File**: [api/src/controllers/index.ts](../../../api/src/controllers/index.ts)
- Export `notificationController`

**File**: [api/src/routes/index.ts](../../../api/src/routes/index.ts)
- Add `notificationRoutes` to routes

### Phase 13: Firebase Storage Security Rules

In Firebase Console → Storage → Rules, apply:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

### Phase 14: Web Service Worker (Optional)

**File**: [client/public/firebase-messaging-sw.js](../../../client/public/firebase-messaging-sw.js)
- Import Firebase scripts
- Initialize Firebase with web config
- Handle background messages
- Show notifications with custom options

## Critical Files Summary

The 5 most critical files that connect everything:

1. **[client/src/config/firebase.config.ts](../../../client/src/config/firebase.config.ts)** - Initializes Firebase SDK for all platforms
2. **[client/src/contexts/AuthContext.tsx](../../../client/src/contexts/AuthContext.tsx)** - Orchestrates Firebase auth with app state
3. **[api/src/config/firebase-admin.config.ts](../../../api/src/config/firebase-admin.config.ts)** - Initializes Firebase Admin for token verification
4. **[api/src/controllers/auth.controller.ts](../../../api/src/controllers/auth.controller.ts)** - Bridges Firebase auth with database
5. **[db/prisma/schema.prisma](../../../db/prisma/schema.prisma)** - Data model connecting Firebase to app data

## Verification Plan

### Authentication Testing
1. Register new user → Verify Firebase user created + database record created
2. Login with credentials → Verify Firebase token received + backend authenticated
3. Access protected route → Verify ID token validated on API
4. Logout → Verify Firebase session cleared
5. Try accessing protected route after logout → Verify 401 error

### Storage Testing
1. Upload avatar image → Verify file in Firebase Storage at `avatars/{userId}/`
2. Check avatar URL → Verify publicly accessible
3. Try uploading >5MB file → Verify rejected
4. Try uploading non-image → Verify rejected
5. Try uploading to another user's folder → Verify unauthorized

### Push Notifications Testing (Android & Web only)
1. Enable notifications in Settings → Verify permission request shown
2. Grant permission → Verify token registered in database
3. Send test notification via API → Verify received on device
4. Test on Android device → Verify FCM delivery
5. Test on web browser → Verify FCM web push delivery
6. Disable notifications in Settings → Verify token removed from database

### Integration Testing
1. Full user flow: Register → Login → Upload avatar → Enable notifications → Receive notification → Logout
2. Check database for proper data: User record with `firebaseUid`, PushToken records, avatar URL stored

## Post-Implementation Checklist

- [ ] All environment variables configured (client + API)
- [ ] Firebase config files in place (google-services.json for Android)
- [ ] Database migration completed successfully
- [ ] All npm packages installed
- [ ] Firebase Console services enabled (Auth, Storage, Cloud Messaging)
- [ ] Storage security rules applied
- [ ] VAPID key generated (for web push)
- [ ] Service account key downloaded and credentials extracted
- [ ] All tests passed (authentication, storage, push notifications on Android & Web)

## Migration Notes

This plan **replaces** the existing JWT authentication system. The old JWT-based auth will be removed:
- Old: JWT tokens in cookies, `JWT_SECRET` environment variable
- New: Firebase ID tokens in Authorization headers, verified with Firebase Admin SDK

During implementation:
- Keep existing JWT code commented out initially (don't delete)
- Test thoroughly before removing old code
- Consider keeping both systems running briefly if you have existing users
- No data loss: existing User records stay intact, just add `firebaseUid` field

## Common Issues & Solutions

**Android Push Not Working**: Verify google-services.json in correct location, check package name matches, test on physical device

**Web Push Not Working**: Ensure HTTPS (required), verify VAPID key, check service worker registered

**Storage Upload Fails**: Check file size (<5MB), verify user authenticated, ensure image type

**Token Verification Fails**: Ensure fresh token (<1 hour), verify Firebase Admin credentials correct

## Next Steps After Implementation

1. Update README with Firebase setup instructions for new developers
2. Set up monitoring for Firebase usage (Authentication, Storage, Cloud Messaging)
3. Consider adding additional auth providers (Google, Apple) if needed
4. Implement password reset flow using Firebase's `sendPasswordResetEmail()`
5. Add user profile management (update display name, email, avatar)
6. Create notification preferences (allow users to control notification types)
