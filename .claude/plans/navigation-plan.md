# Client Refactor: Drawer Navigation & API Integration

## Overview
Replace example client with minimal functional app using drawer navigation while preserving URL-in-browser functionality.

## Critical Requirements
1. **Preserve URL state in browser** - React Navigation's `linking={{ enabled: 'auto' }}` must remain functional
2. **Replace bottom tabs with drawer navigation** - Hamburger menu with extendable structure
3. **Fix deep link mismatch** - `app.json` has `bandtogethermobile://`, but `App.tsx` uses `helloworld://`
4. **Establish API integration foundation** - Eden Treaty with type-safe API calls

## Navigation Architecture

### Current Structure (Bottom Tabs)
```
RootStack
  └── HomeTabs (Bottom Tabs)
        ├── Home
        └── Explore
```

### New Structure (Drawer)
```
RootStack
  ├── MainDrawer (Drawer Navigator)
  │     ├── Home (feed placeholder)
  │     ├── Profile (shows login prompt if not authenticated)
  │     └── Settings (placeholder)
  ├── Login (modal - authentication screen)
  ├── Register (modal - authentication screen)
  └── NotFound (catch-all)
```

### Linking Configuration
```typescript
linking={{
  enabled: 'auto',
  prefixes: ['bandtogethermobile://', 'https://band-together.app'],
  config: {
    screens: {
      MainDrawer: {
        path: '',
        screens: {
          Home: '',
          Profile: 'profile',
          Settings: 'settings'
        }
      },
      Login: 'login',
      Register: 'register',
      NotFound: '*'
    }
  }
}}
```

## Critical Files

### Files to Modify
1. **[/client/src/navigation/index.tsx](client/src/navigation/index.tsx)** - Replace tabs with drawer navigator
2. **[/client/src/App.tsx](client/src/App.tsx)** - Fix deep link prefix, add AuthProvider wrapper, add explicit linking config
3. **[/client/src/navigation/screens/Home.tsx](client/src/navigation/screens/Home.tsx)** - Replace example content with minimal welcome
4. **[/client/src/navigation/screens/NotFound.tsx](client/src/navigation/screens/NotFound.tsx)** - Change navigation reference from `HomeTabs` to `MainDrawer`
5. **[/client/package.json](client/package.json)** - Add `@band-together/shared` dependency pointing to GitHub repo

### Files to Create
6. **[/client/src/components/DrawerContent.tsx](client/src/components/DrawerContent.tsx)** - Custom drawer UI
7. **[/client/src/navigation/screens/Profile.tsx](client/src/navigation/screens/Profile.tsx)** - Profile screen with login prompt when not authenticated
8. **[/client/src/navigation/screens/Settings.tsx](client/src/navigation/screens/Settings.tsx)** - Settings placeholder
9. **[/client/src/navigation/screens/Login.tsx](client/src/navigation/screens/Login.tsx)** - Login modal screen
10. **[/client/src/navigation/screens/Register.tsx](client/src/navigation/screens/Register.tsx)** - Register modal screen
11. **[/client/src/services/api.ts](client/src/services/api.ts)** - Eden Treaty client with environment-aware URL
12. **[/client/src/services/auth.service.ts](client/src/services/auth.service.ts)** - Auth API methods
13. **[/client/src/services/profile.service.ts](client/src/services/profile.service.ts)** - Profile API methods
14. **[/client/src/contexts/AuthContext.tsx](client/src/contexts/AuthContext.tsx)** - Auth state management
15. **[/client/src/services/index.ts](client/src/services/index.ts)** - Service exports
16. **[/client/src/contexts/index.ts](client/src/contexts/index.ts)** - Context exports

### Files to Delete
17. **[/client/src/components/HelloWave.tsx](client/src/components/HelloWave.tsx)** - Example component
18. **[/client/src/components/ParallaxScrollView.tsx](client/src/components/ParallaxScrollView.tsx)** - Example component
19. **[/client/src/components/Collapsible.tsx](client/src/components/Collapsible.tsx)** - Example component
20. **[/client/src/components/ui/TabBarBackground.tsx](client/src/components/ui/TabBarBackground.tsx)** - Tab-specific
21. **[/client/src/components/ui/TabBarBackground.ios.tsx](client/src/components/ui/TabBarBackground.ios.tsx)** - Tab-specific
22. **[/client/src/navigation/screens/Explore.tsx](client/src/navigation/screens/Explore.tsx)** - Replace with Settings
23. **[/client/src/components/index.ts](client/src/components/index.ts)** - Update exports (remove deleted components)

## Dependencies to Install

```bash
cd client
npm install @react-navigation/drawer @elysiajs/eden
npm install @band-together/shared@github:archeusllc/bt-shared
```

**Note**: The `@band-together/shared` package provides type definitions from the API and database. This follows the same pattern as the API module's `package.json`.

## API Integration Pattern

### API Client Setup
```typescript
// services/api.ts
import { edenTreaty } from '@elysiajs/eden';
import type { App } from '@band-together/shared';

const getApiUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://api.band-together.app';
  }
  if (typeof window !== 'undefined') {
    return 'http://localhost:3000';
  }
  return process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
};

export const api = edenTreaty<App>(getApiUrl());
```

### Service Layer Example
```typescript
// services/auth.service.ts
import { api } from './api';

export const authService = {
  login: async (email: string, password: string) => {
    const { data, error } = await api.auth.login.post({ email, password });
    return { data, error };
  },
  logout: async () => {
    const { data, error } = await api.auth.logout.get();
    return { data, error };
  }
};
```

### Auth Context Pattern
```typescript
// contexts/AuthContext.tsx
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Wrap Navigation in App.tsx:
<AuthProvider>
  <Navigation ... />
</AuthProvider>
```

## Implementation Sequence

### Phase 1: Dependencies & Structure (Non-Breaking)
1. Update package.json to add `@band-together/shared` dependency
2. Install npm packages (@react-navigation/drawer, @elysiajs/eden, @band-together/shared)
3. Create empty service files
4. Create empty context files
5. Update tsconfig.json to add `@contexts` path alias
6. **Test**: App still runs with existing navigation

### Phase 2: Navigation Replacement
7. Create DrawerContent.tsx
8. Create Profile.tsx, Settings.tsx, Login.tsx, Register.tsx screens
9. Update navigation/index.tsx to use drawer
10. Update Home.tsx with feed placeholder
11. Delete Explore.tsx
12. Update NotFound.tsx reference
13. **Test**: Drawer navigation works, modals can open

### Phase 3: API Integration
14. Implement api.ts, auth.service.ts, profile.service.ts
15. Complete AuthContext implementation
16. Wrap Navigation in App.tsx with AuthProvider
17. Wire up Login/Register screens with auth services
18. Update Profile.tsx to use auth context
19. **Test**: API calls work, auth state updates, login/logout flow works

### Phase 4: Cleanup & URL Fix
20. Delete example components
21. Update component index.ts exports
22. Fix App.tsx prefixes and add linking config
23. **Test**: URL navigation works on web, deep links work on native

### Phase 5: Verification
24. Add error handling to services
25. Add loading states to screens
26. Test cross-platform (web, iOS, Android)
27. Test full auth flow end-to-end

## Verification Testing

### URL Functionality (Critical)
- **Web**: Navigate through drawer, verify browser URL updates (`/`, `/profile`, `/settings`)
- **Web**: Type URL directly (e.g., `/profile`), verify correct screen loads
- **Web**: Use browser back/forward buttons, verify navigation syncs
- **Native**: Test deep links with `bandtogethermobile://profile` scheme

### Navigation
- Drawer opens via hamburger icon in header
- Drawer opens via swipe gesture (native)
- Screen transitions work smoothly
- NotFound screen shows for invalid routes

### API Integration
1. Start API server: `cd api && npm run dev`
2. Test login via authService
3. Test protected profile endpoint
4. Verify auth state updates in context
5. Test logout clears state

## Minimal Screen Content

### Home Screen (Feed Placeholder)
- Header with app branding
- Placeholder for future activity feed/social content
- Empty state message: "Your feed will appear here"
- Structure ready for future post/activity components
- Hint to open drawer for navigation

### Profile Screen
- **When authenticated**:
  - User info display (email, display name)
  - Logout button
  - Profile settings placeholder
- **When not authenticated**:
  - "Please log in to view your profile" message
  - "Login" button (opens Login modal)
  - "Create account" link (opens Register modal)

### Settings Screen
- Simple settings list (placeholders)
- Theme selector example
- App version info
- No API calls needed

### Login Screen (Modal)
- Email input field
- Password input field
- "Login" button (calls auth service)
- "Don't have an account?" link to Register
- Error message display
- Loading state during API call

### Register Screen (Modal)
- Email input field
- Password input field
- Confirm password field
- "Create Account" button (calls auth service)
- "Already have an account?" link to Login
- Error message display
- Loading state during API call

## Known Considerations

1. **Cookie-based auth**: Works well on web, may need enhancement for native persistence
2. **Eden Treaty types**: Requires API server running for type generation, uses workspace reference to shared package
3. **Environment config**: Use `EXPO_PUBLIC_API_URL` for native development with local network IP

## Extension Points

### Adding New Screens to Drawer
```typescript
// In navigation/index.tsx MainDrawer
NewScreen: {
  screen: NewScreen,
  options: {
    title: 'Feature Name',
    drawerIcon: ({ color }) => <IconSymbol name="icon.name" color={color} />
  },
  linking: { path: 'feature-path' }
}
```

### Adding New API Services
```typescript
// services/feature.service.ts
export const featureService = {
  getData: async () => {
    const { data, error } = await api.feature.get();
    return { data, error };
  }
};
```
