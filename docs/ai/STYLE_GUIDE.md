# Band Together - Code Style Guide

## Core Principles

1. **Consistency** - All code follows the same patterns across the project
2. **Clarity** - Code is readable and intentions are clear
3. **Type Safety** - TypeScript strict mode for all code
4. **Modern Syntax** - Use contemporary JavaScript/TypeScript patterns

## Component Syntax

### Arrow Functions (REQUIRED)

All React components and exported functions must use arrow function syntax.

```typescript
// ✅ CORRECT - Arrow function with explicit export
export const HomePage = () => {
  return <View>...</View>
}

// ✅ CORRECT - Arrow function with parameters
export const Button = ({ label, onPress }: ButtonProps) => {
  return <Pressable onPress={onPress}><Text>{label}</Text></Pressable>
}

// ❌ WRONG - Function declaration
export function HomePage() {
  return <View>...</View>
}

// ❌ WRONG - Function declaration with export
function HomePage() {
  return <View>...</View>
}
export default HomePage
```

### Type Annotations

Place type definitions close to component declarations:

```typescript
// ✅ CORRECT - Type defined above component
type HomeProps = {
  title: string
  onNavigate: (screen: string) => void
}

export const Home = ({ title, onNavigate }: HomeProps) => {
  return <View>...</View>
}

// ✅ ALSO CORRECT - Inline destructured types
export const Home = ({ title, onNavigate }: {
  title: string
  onNavigate: (screen: string) => void
}) => {
  return <View>...</View>
}

// ❌ WRONG - No type safety
export const Home = ({ title, onNavigate }) => {
  return <View>...</View>
}
```

## Import Organization

### Order of Imports

1. **External Libraries** - React, React Native, third-party packages
2. **Path Aliases** - Organized by type (@components, @hooks, etc.)
3. **Type Imports** - TypeScript types
4. **Relative Imports** - Minimized and used as last resort

```typescript
// ✅ CORRECT - Well organized imports
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Haptics from 'expo-haptics'

import { ThemedText } from '@components/ThemedText'
import { IconSymbol } from '@ui/IconSymbol'
import { Colors } from '@constants/Colors'
import { useThemeColor } from '@hooks/useThemeColor'

import type { RootStackParamList } from '@navigation'

// Relative imports only when necessary (rare)
import { localHelper } from './helpers'
```

### Path Alias Rules

**Use path aliases for all internal imports. Never use relative paths.**

```typescript
// Specific path aliases (PREFERRED)
import { Component } from '@components/Component'
import { Screen } from '@screens/Screen'
import { hook } from '@hooks/hook'
import { constant } from '@constants/constant'
import asset from '@assets/images/logo.png'

// Generic @/* alias (AVOID when specific alias exists)
import { Component } from '@/*'  // ❌ Too generic

// Relative paths (AVOID)
import { Component } from './components/Component'  // ❌ Relative
import { Component } from '../../../components/Component'  // ❌ Relative
```

### File Extensions in Imports

**Omit file extensions when importing TypeScript/TSX files.**

```typescript
// ✅ CORRECT
import { Colors } from '@constants/Colors'
import { Home } from '@screens/Home'
import { Button } from '@components/Button'

// ❌ WRONG - Unnecessary extensions
import { Colors } from '@constants/Colors.ts'
import { Home } from '@screens/Home.tsx'
import { Button } from '@components/Button.tsx'
```

## Naming Conventions

### Components
- PascalCase for component names
- Reflect the component's purpose

```typescript
// ✅ CORRECT
export const UserProfile = () => { ... }
export const NavigationHeader = () => { ... }
export const ListItem = () => { ... }

// ❌ WRONG
export const userProfile = () => { ... }
export const user_profile = () => { ... }
```

### Functions & Variables
- camelCase for regular functions and variables
- Descriptive names

```typescript
// ✅ CORRECT
const calculateTotal = (items) => { ... }
const handlePress = () => { ... }
const theme = useColorScheme()

// ❌ WRONG
const CalculateTotal = (items) => { ... }
const calculate_total = (items) => { ... }
const t = useColorScheme()
```

### Constants
- UPPER_SNAKE_CASE for true constants
- PascalCase for type constants

```typescript
// ✅ CORRECT
const MAX_RETRIES = 3
const DEFAULT_TIMEOUT = 5000
const Colors = { light: {...}, dark: {...} }
type ButtonVariant = 'primary' | 'secondary'

// ❌ WRONG
const maxRetries = 3
const colors = { light: {...}, dark: {...} }
const MAX_COLORS = { light: {...}, dark: {...} }
```

## TypeScript Usage

### Strict Mode

All code must work with TypeScript strict mode enabled.

```typescript
// ✅ CORRECT - Proper typing
const handlePress = (id: string): void => {
  console.log(id)
}

const getValue = (key: string): string | null => {
  const value = store.get(key)
  return value ?? null
}

// ❌ WRONG - Missing types
const handlePress = (id) => {
  console.log(id)
}

const getValue = (key) => {
  return store.get(key)
}
```

### Type Definitions

Define types at the module level, above components:

```typescript
// ✅ CORRECT
type ButtonProps = {
  label: string
  variant?: 'primary' | 'secondary'
  onPress: () => void
  disabled?: boolean
}

interface NavRoute {
  name: string
  params?: Record<string, unknown>
}

export const Button = ({ label, variant = 'primary', onPress }: ButtonProps) => {
  // ...
}

// ❌ WRONG - Inline types scattered throughout
export const Button = ({ label, variant = 'primary', onPress }: {
  label: string
  variant: 'primary' | 'secondary'
  onPress: () => void
}) => {
  // ...
}
```

### Avoiding `any`

Never use `any` type. Use `unknown` with proper type guards if needed.

```typescript
// ✅ CORRECT - Using unknown with type guard
const processValue = (value: unknown): string => {
  if (typeof value === 'string') {
    return value.toUpperCase()
  }
  return JSON.stringify(value)
}

// ❌ WRONG - Using any
const processValue = (value: any): string => {
  return value.toUpperCase()  // No type safety
}
```

## Hooks

### Custom Hook Naming

Custom hooks should start with `use`:

```typescript
// ✅ CORRECT
export const useThemeColor = (colorName: string): string => { ... }
export const useUserData = (): User | null => { ... }
export const useNavigation = () => { ... }

// ❌ WRONG
export const getThemeColor = (colorName: string): string => { ... }
export const themeColor = (colorName: string): string => { ... }
```

### Hook Dependencies

Always include proper dependency arrays:

```typescript
// ✅ CORRECT
useEffect(() => {
  // Logic here
}, [dependency1, dependency2])

// ❌ WRONG - Missing dependencies
useEffect(() => {
  // Logic that depends on something
})

// ❌ WRONG - Empty array when dependencies exist
useEffect(() => {
  console.log(theme)
}, [])
```

## Error Handling

### Try-Catch Blocks

Use try-catch for error-prone operations, but prefer TypeScript types:

```typescript
// ✅ CORRECT - Type-safe
const parseJSON = (data: string): Result<object> => {
  try {
    return { success: true, value: JSON.parse(data) }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

// ✅ ALSO CORRECT - Async/await with catch
const fetchData = async (url: string): Promise<Data | null> => {
  try {
    const response = await fetch(url)
    return response.json()
  } catch (error) {
    console.error('Fetch failed:', error)
    return null
  }
}
```

## Code Comments

### When to Comment

- Explain **why**, not **what**
- Document non-obvious logic
- Add comments for complex algorithms

```typescript
// ✅ GOOD - Explains the why
// Debounce user input to reduce API calls
const debouncedSearch = useCallback(
  debounce((query: string) => searchAPI(query), 300),
  []
)

// ❌ BAD - States the obvious
// Set the theme
const theme = useColorScheme()

// ❌ BAD - Outdated comment
// TODO: This needs to be fixed (comment from 2023)
```

## Formatting

### Line Length

Keep lines reasonably short (80-100 characters when practical). Use prettier or similar formatting tools.

### Whitespace

Use consistent spacing:

```typescript
// ✅ CORRECT - Good spacing
export const MyComponent = ({ prop1, prop2 }: Props) => {
  const value = calculateSomething(prop1)

  return (
    <View>
      <Text>{value}</Text>
      <Text>{prop2}</Text>
    </View>
  )
}

// ❌ WRONG - Inconsistent spacing
export const MyComponent = ({prop1,prop2}:Props)=>{
const value=calculateSomething(prop1)
return <View><Text>{value}</Text></View>
}
```

## Platform-Specific Code

### File Extensions

Use `.ios.tsx`, `.android.tsx`, `.web.tsx` for platform-specific implementations:

```typescript
// Platform-specific files are automatically selected by React Native
import { IconSymbol } from '@ui/IconSymbol'
// Imports IconSymbol.ios.tsx on iOS, IconSymbol.tsx on Android/web

// Avoid explicit platform imports
import { IconSymbol } from '@ui/IconSymbol.ios'  // ❌ WRONG

// Use Platform.select() for inline conditionals
const headerHeight = Platform.select({
  ios: 100,
  android: 70,
  default: 70
})
```

---

**Last Updated**: 2026-01-18
**Related**: [CLIENT_GUIDE.md](./CLIENT_GUIDE.md)
