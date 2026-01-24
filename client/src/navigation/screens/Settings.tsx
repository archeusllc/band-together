import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Clipboard as RNClipboard } from 'react-native';
import { apiBaseUrl, firebaseAuthService } from '@services';
import { useAuth } from '@contexts';
import { tailwind } from '@theme';
import { IconSymbol } from '@components/ui/IconSymbol';

type ApiStatus = 'checking' | 'online' | 'offline';

export const SettingsScreen = () => {
  const { isAuthenticated } = useAuth();
  const [apiStatus, setApiStatus] = React.useState<ApiStatus>('checking');
  const [idToken, setIdToken] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [expandToken, setExpandToken] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    const checkApi = async () => {
      setApiStatus('checking');
      try {
        const response = await fetch(`${apiBaseUrl}/health`);
        if (!cancelled) {
          setApiStatus(response.ok ? 'online' : 'offline');
        }
      } catch (_) {
        if (!cancelled) setApiStatus('offline');
      }
    };

    checkApi();

    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const setupToken = async () => {
      // Subscribe to auth state changes to ensure we have a user
      unsubscribe = firebaseAuthService.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const token = await firebaseAuthService.getIdToken();
            if (token) {
              setIdToken(token);
            }
          } catch (error) {
            console.error('Failed to get ID token:', error);
          }
        }
      });
    };

    setupToken();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      if (!idToken || idToken === 'loading...') {
        // Try to refresh token if not loaded yet
        const token = await firebaseAuthService.getIdToken();
        if (token) {
          setIdToken(token);
          RNClipboard.setString(token);
        }
      } else {
        RNClipboard.setString(idToken);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleExpandToken = async () => {
    // Refresh token when expanding to ensure it's fresh
    if (!expandToken && (!idToken || idToken === 'loading...')) {
      try {
        const token = await firebaseAuthService.getIdToken();
        if (token) {
          setIdToken(token);
        }
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    }
    setExpandToken(!expandToken);
  };

  const truncateToken = (token: string | null) => {
    if (!token) return 'loading...';
    if (token.length <= 20) return token;
    return `${token.slice(0, 10)}...${token.slice(-10)}`;
  };

  return (
    <ScrollView className={`flex-1 ${tailwind.background.both}`}>
      <View className={`mt-5 ${tailwind.card.both} px-4`}>
        <Text className={`text-xs font-semibold ${tailwind.textMuted.both} uppercase tracking-wider px-4 pt-4 pb-2 ${tailwind.background.both} -mx-4`}>About</Text>
        <View className={`flex-row justify-between items-center py-3`}>
          <Text className={`text-base ${tailwind.text.both}`}>API Status</Text>
          <View className="items-end">
            <Text
              className={`text-base font-semibold ${apiStatus === 'online'
                ? 'text-green-600'
                : apiStatus === 'offline'
                  ? 'text-red-600'
                  : tailwind.textMutedLight.light
                }`}
            >
              {apiStatus === 'checking' ? 'Checking…' : apiStatus === 'online' ? 'Online' : 'Offline'}
            </Text>
            <Text className={`text-xs ${tailwind.textMuted.both} font-mono`} numberOfLines={1}>
              {apiBaseUrl}
            </Text>
          </View>
        </View>
        <View className={`flex-row justify-between items-center py-3 border-t ${tailwind.border.both}`}>
          <Text className={`text-base ${tailwind.text.both}`}>Version</Text>
          <Text className={`text-base ${tailwind.textMuted.both}`}>1.0.0</Text>
        </View>
        <View className={`flex-row justify-between items-center py-3 border-t ${tailwind.border.both}`}>
          <Text className={`text-base ${tailwind.text.both}`}>Build</Text>
          <Text className={`text-base ${tailwind.textMuted.both}`}>2026.01.18</Text>
        </View>
        {process.env.NODE_ENV === 'development' && (
          <>
            <View className={`flex-row justify-between items-center py-3 border-t ${tailwind.border.both}`}>
              <Text className={`text-base ${tailwind.text.both}`}>Environment</Text>
              <Text className={`text-base ${tailwind.textMuted.both}`}>{process.env.NODE_ENV}</Text>
            </View>
            {isAuthenticated && (
              <View className={`py-3 border-t ${tailwind.border.both}`}>
              <View className={`flex-row justify-between items-center mb-3`}>
                <Text className={`text-base ${tailwind.text.both}`}>Firebase Token</Text>
                <TouchableOpacity
                  onPress={handleCopy}
                  className={`flex-row items-center gap-1 px-3 py-2 rounded ${
                    copied ? 'bg-green-500' : `${tailwind.activeBackground.both}`
                  }`}
                >
                  <IconSymbol
                    name={copied ? 'checkmark' : 'copy'}
                    size={16}
                    color={copied ? '#fff' : (tailwind.text.both === 'text-black' ? '#000' : '#fff')}
                  />
                  <Text className={`text-sm font-medium ${copied ? 'text-white' : tailwind.text.both}`}>
                    {copied ? 'Copied!' : 'Copy'}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={handleExpandToken}
                className={`bg-slate-900 rounded p-3 mb-2`}
              >
                <Text className={`text-xs font-mono text-slate-300`} numberOfLines={expandToken ? undefined : 1}>
                  {expandToken ? idToken || 'loading...' : truncateToken(idToken)}
                </Text>
              </TouchableOpacity>
              <Text className={`text-xs ${tailwind.textMuted.both} italic`}>
                {expandToken ? 'Tap to collapse' : 'Tap to expand • Copy to clipboard'}
              </Text>
            </View>
            )}
          </>
        )}
      </View>

      <View className={`m-5 p-4 ${tailwind.card.both} rounded-lg`}>
        <Text className={`text-sm ${tailwind.textMuted.both} text-center italic`}>
          Additional settings will be available in future updates
        </Text>
      </View>
    </ScrollView>
  );
}

