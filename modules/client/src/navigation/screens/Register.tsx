import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@contexts';
import { colors, tailwind } from '@theme';
import { AlertModal } from '@ui';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<any>;

export const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    title: string;
    message: string;
  }>({ visible: false, title: '', message: '' });
  const navigation = useNavigation<NavigationProp>();
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!email || !password) {
      setAlertConfig({
        visible: true,
        title: 'Error',
        message: 'Please fill in all fields',
      });
      return;
    }

    if (password !== confirmPassword) {
      setAlertConfig({
        visible: true,
        title: 'Error',
        message: 'Passwords do not match',
      });
      return;
    }

    if (password.length < 8) {
      setAlertConfig({
        visible: true,
        title: 'Error',
        message: 'Password must be at least 8 characters',
      });
      return;
    }

    setLoading(true);
    try {
      const success = await register(email, password);
      if (success) {
        navigation.goBack();
      } else {
        setAlertConfig({
          visible: true,
          title: 'Registration Failed',
          message: 'Unable to create account. Email may already be in use.',
        });
      }
    } catch (error) {
      setAlertConfig({
        visible: true,
        title: 'Error',
        message: 'An error occurred during registration',
      });
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
      </View>

      <AlertModal
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttons={[
          {
            text: 'OK',
            onPress: () => setAlertConfig({ visible: false, title: '', message: '' }),
          },
        ]}
      />
    </ScrollView>
  );
}
