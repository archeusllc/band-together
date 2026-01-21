import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@contexts';
import { colors, tailwind } from '@theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<any>;

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigation.goBack();
      } else {
        Alert.alert('Login Failed', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      className={`flex-1 ${tailwind.background.both}`}
      scrollEnabled={true}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center px-5 py-12">
        <Text className={`text-4xl font-bold mb-8 text-center ${tailwind.text.both}`}>Login</Text>

        <View className={`${tailwind.card.both} rounded-xl p-5`}>
        <View className="mb-5">
          <Text className={`text-base font-semibold mb-2 ${tailwind.text.both}`}>Email</Text>
          <TextInput
            className={`border rounded-lg px-4 py-3 text-base ${tailwind.border.both} ${tailwind.card.both} ${tailwind.text.both}`}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={colors.light.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            editable={!loading}
          />
        </View>

        <View className="mb-5">
          <Text className={`text-base font-semibold mb-2 ${tailwind.text.both}`}>Password</Text>
          <TextInput
            className={`border rounded-lg px-4 py-3 text-base ${tailwind.border.both} ${tailwind.card.both} ${tailwind.text.both}`}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={colors.light.muted}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
            editable={!loading}
          />
        </View>

        <Pressable
          className={`bg-blue-500 py-3 px-6 rounded-lg items-center mt-2 ${loading ? 'opacity-60' : ''}`}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-white text-base font-semibold">
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </Pressable>

        <View className="flex-row justify-center mt-5">
          <Text className={`text-sm ${tailwind.textMuted.both}`}>Don't have an account? </Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text className={`text-sm ${tailwind.primary} font-semibold`}>Create Account</Text>
          </Pressable>
        </View>
      </View>
      </View>
    </ScrollView>
  );
}

