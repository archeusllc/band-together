import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, ScrollView } from 'react-native';
import { useColorScheme } from 'nativewind';
import * as SplashScreen from 'expo-splash-screen';
import { Navigation } from './navigation';
import { AuthProvider, FeedProvider } from '@contexts';
import { tailwind, colors } from '@theme';

// Keep the splash screen visible while the app is loading
SplashScreen.preventAutoHideAsync();

// Error Boundary to catch and display app crashes
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null; errorInfo: any }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.log('🚨 [ErrorBoundary] Caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('🚨 [ErrorBoundary] Error details:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaProvider>
          <View className={`flex-1 ${tailwind.background.both} justify-center items-center p-4`}>
            <ScrollView className="w-full">
              <View className="items-center mb-4">
                <Text className={`text-2xl font-bold mb-2 ${tailwind.primary}`}>⚠️ App Error</Text>
                <Text className={`text-sm ${tailwind.textMuted.both} text-center mb-4`}>
                  The app encountered an error during startup.
                </Text>
              </View>

              <View className={`${tailwind.card.both} rounded-lg p-4 mb-4`}>
                <Text className={`font-bold ${tailwind.text.both} mb-2`}>Error Message:</Text>
                <Text className={`text-sm font-mono ${tailwind.textMuted.both}`}>
                  {this.state.error?.message || 'Unknown error'}
                </Text>
              </View>

              {this.state.error?.stack && (
                <View className={`${tailwind.card.both} rounded-lg p-4 mb-4`}>
                  <Text className={`font-bold ${tailwind.text.both} mb-2`}>Stack Trace:</Text>
                  <Text className={`text-xs font-mono ${tailwind.textMuted.both}`}>
                    {this.state.error.stack}
                  </Text>
                </View>
              )}

              {this.state.errorInfo?.componentStack && (
                <View className={`${tailwind.card.both} rounded-lg p-4`}>
                  <Text className={`font-bold ${tailwind.text.both} mb-2`}>Component Stack:</Text>
                  <Text className={`text-xs font-mono ${tailwind.textMuted.both}`}>
                    {this.state.errorInfo.componentStack}
                  </Text>
                </View>
              )}

              <Text className={`text-xs ${tailwind.textMuted.both} text-center mt-4`}>
                Check console logs (logcat) for more details
              </Text>
            </ScrollView>
          </View>
        </SafeAreaProvider>
      );
    }

    return this.props.children;
  }
}

const SplashScreenHider = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    // Hide splash screen when app has finished initializing
    const hideSplash = async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (err) {
        console.warn('Error hiding splash screen:', err);
      }
    };

    hideSplash();
  }, []);

  return <>{children}</>;
};

export const App = () => {
  console.log('📱 [App] Rendering...');
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <AuthProvider>
          <FeedProvider>
            <SplashScreenHider>
              <Navigation />
            </SplashScreenHider>
          </FeedProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};



