import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@contexts';
import { colors, tailwind } from '@theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<any>;

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const success = await register(email, password);
      if (success) {
        navigation.goBack();
      } else {
        Alert.alert('Registration Failed', 'Unable to create account. Email may already be in use.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      className={`flex-1 ${tailwind.background.both}`}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20 }}
    >
      <Text className={`text-4xl font-bold mb-8 text-center ${tailwind.text.both}`}>Create Account</Text>

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

        <View className="mb-5">
          <Text className={`text-base font-semibold mb-2 ${tailwind.text.both}`}>Confirm Password</Text>
          <TextInput
            className={`border rounded-lg px-4 py-3 text-base ${tailwind.border.both} ${tailwind.card.both} ${tailwind.text.both}`}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            placeholderTextColor={colors.light.muted}
            secureTextEntry
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        <Pressable
          className={`bg-blue-500 py-3 px-6 rounded-lg items-center mt-2 ${loading ? 'opacity-60' : ''}`}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text className="text-white text-base font-semibold">
            {loading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </Pressable>

        <View className="flex-row justify-center mt-5">
          <Text className={`text-sm ${tailwind.textMuted.both}`}>Already have an account? </Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text className={`text-sm ${tailwind.primary} font-semibold`}>Login</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
