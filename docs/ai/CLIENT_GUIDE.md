# Band Together Client - Development Guide

## Overview

The client is a **React Native application** built with **Expo**, targeting iOS, Android, and web platforms.

**Key Stack:**
- React Native + Expo
- React Navigation (bottom-tab + native-stack)
- TypeScript (strict mode)
- React Native Reanimated (animations)
- Expo Blur (iOS native effects)

## Directory Structure

```
client/
├── src/
│   ├── App.tsx                         # Root app component
│   ├── index.tsx                       # Expo entry point
│   ├── gesture-handler.tsx             # Gesture handler initialization
│   ├── gesture-handler.native.tsx      # Native gesture handler config
│   ├── types.d.ts                      # Global type declarations
│   │
│   ├── assets/                         # Static files
│   │   ├── fonts/                     # Custom fonts
│   │   │   └── SpaceMono-Regular.ttf
│   │   └── images/                    # Images & icons
│   │       ├── react-logo.png
│   │       └── partial-react-logo.png
│   │
│   ├── components/                     # Reusable UI components
│   │   ├── Collapsible.tsx            # Expandable section
│   │   ├── ExternalLink.tsx           # Link to external URLs
│   │   ├── HapticTab.tsx              # Tab with haptic feedback
│   │   ├── HelloWave.tsx              # Animated greeting component
│   │   ├── ParallaxScrollView.tsx     # Header with parallax effect
│   │   ├── ThemedText.tsx             # Text with theme colors
│   │   ├── ThemedView.tsx             # View with theme colors
│   │   └── ui/                        # UI-specific components
│   │       ├── IconSymbol.tsx         # Icon component (Material Icons)
│   │       ├── IconSymbol.ios.tsx     # Icon component (SF Symbols on iOS)
│   │       ├── TabBarBackground.tsx   # Tab bar background (Android/web)
│   │       └── TabBarBackground.ios.tsx # Tab bar background (iOS)
│   │
│   ├── constants/                      # Constants
│   │   └── Colors.ts                  # Theme colors (light/dark)
│   │
│   ├── hooks/                          # Custom hooks
│   │   ├── useColorScheme.ts          # Device color scheme (light/dark)
│   │   └── useThemeColor.ts           # Get theme-aware colors
│   │
│   ├── navigation/                     # Navigation configuration
│   │   ├── index.tsx                  # Navigation setup & root stack
│   │   └── screens/                   # Screen components
│   │       ├── Home.tsx               # Home tab screen
│   │       ├── Explore.tsx            # Explore tab screen
│   │       └── NotFound.tsx           # 404 screen
│   │
│   ├── services/                       # API & business logic (empty, ready)
│   │
│   ├── app.json                        # Expo configuration
│   ├── tsconfig.json                   # TypeScript config with path aliases
│   ├── package.json                    # Dependencies
│   └── bun.lock                        # Bun lock file
```

## Path Aliases

The client uses TypeScript path aliases for clean imports. **Always use these instead of relative paths.**

### Alias Reference

| Alias | Maps To | Use For |
|-------|---------|---------|
| `@components/*` | `src/components/*` | General components |
| `@ui/*` | `src/components/ui/*` | UI-specific components |
| `@screens/*` | `src/navigation/screens/*` | Screen components |
| `@navigation/*` | `src/navigation/*` | Navigation config |
| `@hooks/*` | `src/hooks/*` | Custom hooks |
| `@constants/*` | `src/constants/*` | Constants & config |
| `@services/*` | `src/services/*` | API & business logic |
| `@assets/*` | `src/assets/*` | Images, fonts, static files |
| `@/*` | `src/*` | Fallback (avoid when specific alias exists) |

### Import Examples

```typescript
// ✅ CORRECT - Use specific aliases
import { ThemedText } from '@components/ThemedText'
import { IconSymbol } from '@ui/IconSymbol'
import { Home } from '@screens/Home'
import { useThemeColor } from '@hooks/useThemeColor'
import { Colors } from '@constants/Colors'
import logo from '@assets/images/react-logo.png'

// ❌ WRONG - Don't use generic @/* when specific alias exists
import { ThemedText } from '@/components/ThemedText'
import { IconSymbol } from '@/components/ui/IconSymbol'

// ❌ WRONG - Don't use relative paths
import { ThemedText } from './components/ThemedText'
import { ThemedText } from '../components/ThemedText'
import { ThemedText } from '../../src/components/ThemedText'

// ❌ WRONG - Don't include file extensions
import { Colors } from '@constants/Colors.ts'
import { Home } from '@screens/Home.tsx'
```

## Component Patterns

### Basic Component

```typescript
import { View } from 'react-native'
import { ThemedText } from '@components/ThemedText'

type HomeProps = {
  title: string
  description?: string
}

export const Home = ({ title, description }: HomeProps) => {
  return (
    <View>
      <ThemedText type="title">{title}</ThemedText>
      {description && <ThemedText>{description}</ThemedText>}
    </View>
  )
}
```

### Component with Styling

```typescript
import { StyleSheet, View } from 'react-native'
import { ThemedText } from '@components/ThemedText'

type CardProps = {
  title: string
}

export const Card = ({ title }: CardProps) => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
})
```

### Component with Hooks

```typescript
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components/ThemedText'
import { useThemeColor } from '@hooks/useThemeColor'

export const ThemedContainer = () => {
  const backgroundColor = useThemeColor({}, 'background')
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Setup logic
    return () => {
      // Cleanup logic
    }
  }, [])

  return (
    <View style={{ backgroundColor }}>
      <ThemedText>Count: {count}</ThemedText>
    </View>
  )
}
```

## Theme System

The app supports light and dark modes using a custom hook-based theme system.

### Colors Configuration

All colors are defined in `@constants/Colors`:

```typescript
// From src/constants/Colors.ts
export const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    tint: '#007AFF',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#007AFF',
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
  },
}
```

### Using Theme Colors

```typescript
import { useThemeColor } from '@hooks/useThemeColor'

export const MyComponent = () => {
  // Get a specific color for the current theme
  const textColor = useThemeColor({}, 'text')
  const backgroundColor = useThemeColor({}, 'background')

  // Or provide custom overrides
  const customColor = useThemeColor({
    light: '#red',
    dark: '#darkred',
  }, 'text')

  return (
    <View style={{ backgroundColor }}>
      <Text style={{ color: textColor }}>Themed text</Text>
    </View>
  )
}
```

### ThemedText & ThemedView Components

Use these components for automatic theme support:

```typescript
import { ThemedText } from '@components/ThemedText'
import { ThemedView } from '@components/ThemedView'

export const MyScreen = () => {
  return (
    <ThemedView>
      <ThemedText type="title">Title</ThemedText>
      <ThemedText type="subtitle">Subtitle</ThemedText>
      <ThemedText type="defaultSemiBold">Bold text</ThemedText>
      <ThemedText type="link">Link text</ThemedText>
    </ThemedView>
  )
}
```

## Navigation

The app uses **React Navigation** with a bottom-tab navigator.

### Navigation Structure

```
RootStack (native-stack)
└── HomeTabs (bottom-tabs)
    ├── Home
    └── Explore
├── NotFound (when route not found)
```

### Accessing Navigation

```typescript
import { useNavigation } from '@react-navigation/native'
import type { RootStackParamList } from '@navigation'

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>()

  return (
    <Pressable onPress={() => navigation.navigate('Explore')}>
      <Text>Go to Explore</Text>
    </Pressable>
  )
}
```

## Platform-Specific Development

### File Structure

Use platform-specific extensions for platform-specific code:

```
components/
├── MyComponent.tsx        # Default (Android/web)
├── MyComponent.ios.tsx    # iOS-specific
├── MyComponent.android.tsx # Android-specific
└── MyComponent.web.tsx    # Web-specific
```

React Native automatically selects the right file.

### Inline Platform Detection

```typescript
import { Platform } from 'react-native'

export const MyComponent = () => {
  return (
    <>
      {Platform.OS === 'ios' && <Text>iOS only</Text>}
      {Platform.OS === 'android' && <Text>Android only</Text>}
      {Platform.select({
        ios: <Text>iOS specific view</Text>,
        android: <Text>Android specific view</Text>,
        default: <Text>Other platforms</Text>,
      })}
    </>
  )
}
```

### Testing on Platforms

```bash
# iOS (requires macOS)
cd client && npx expo run:ios

# Android (requires Android SDK)
cd client && npx expo run:android

# Web
cd client && npx expo run:web

# Start development server (all platforms)
cd client && npx expo start
```

## Common Patterns

### Handling Link Presses

```typescript
import { ExternalLink } from '@components/ExternalLink'

export const HelpScreen = () => {
  return (
    <ExternalLink href="https://example.com/help">
      <ThemedText type="link">Get Help</ThemedText>
    </ExternalLink>
  )
}
```

### Creating Collapsible Sections

```typescript
import { Collapsible } from '@components/Collapsible'
import { ThemedText } from '@components/ThemedText'

export const FAQScreen = () => {
  return (
    <>
      <Collapsible title="Question 1">
        <ThemedText>Answer 1</ThemedText>
      </Collapsible>
      <Collapsible title="Question 2">
        <ThemedText>Answer 2</ThemedText>
      </Collapsible>
    </>
  )
}
```

### Animated Components

```typescript
import { HelloWave } from '@components/HelloWave'
import { ThemedText } from '@components/ThemedText'

export const GreetingScreen = () => {
  return (
    <>
      <HelloWave />
      <ThemedText>Welcome back!</ThemedText>
    </>
  )
}
```

### Parallax Scroll View

```typescript
import ParallaxScrollView from '@components/ParallaxScrollView'
import { ThemedView } from '@components/ThemedView'
import { IconSymbol } from '@ui/IconSymbol'

export const ContentScreen = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#1D3D47' }}
      headerImage={<IconSymbol size={310} name="house.fill" color="#808080" />}
    >
      <ThemedView>Content here</ThemedView>
    </ParallaxScrollView>
  )
}
```

## Best Practices

1. **Always use path aliases** - Never use relative imports
2. **Use arrow functions** - All exports must be arrow functions
3. **Type everything** - No `any`, use TypeScript strict mode
4. **Use themed components** - Leverage ThemedText and ThemedView
5. **Platform-specific files** - Use `.ios.tsx` for platform differences
6. **Performance** - Use `StyleSheet.create()`, memoize when needed
7. **Navigation** - Use React Navigation hooks for navigation logic
8. **Assets** - Import assets using `@assets/*` alias
9. **Custom hooks** - Extract logic into custom hooks (useTheme, useFetch, etc.)
10. **Testing** - Test on multiple platforms before shipping

## Troubleshooting

### Path Alias Not Working
- Ensure you're using the correct alias format: `@alias/path`
- Check `tsconfig.json` for the alias definition
- Restart the TypeScript server in your IDE

### Component Not Found
- Verify the import path matches the actual file location
- Ensure you're using the right alias for the directory
- Check for typos in the component name

### Theme Colors Not Applying
- Wrap your component in `ThemedView` or use `useThemeColor()` hook
- Ensure you're importing `Colors` from `@constants/Colors`
- Verify the color name exists in both light and dark themes

---

**Last Updated**: 2026-01-18
**Related**: [STYLE_GUIDE.md](./STYLE_GUIDE.md)
