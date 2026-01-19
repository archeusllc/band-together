import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useAuth } from '@contexts';
import { useNavigation } from '@react-navigation/native';
import { tailwind } from '@theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<any>;

export default function ProfileScreen() {
  const { user, isAuthenticated, loading } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  if (loading) {
    return (
      <View className={`flex-1 ${tailwind.background.both}`}>
        <Text className={`text-base ${tailwind.textMuted.both}`}>Loading...</Text>
      </View>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <View className={`flex-1 ${tailwind.background.both}`}>
        <View className="flex-1 justify-center items-center px-5">
          <Text className={`text-3xl font-bold mb-4 ${tailwind.text.both}`}>Profile</Text>
          <Text className={`text-base ${tailwind.textMuted.both} mb-8 text-center`}>Please log in to view your profile</Text>
          <View className="gap-3 w-full max-w-xs">
            <Pressable
              className="bg-blue-500 py-3 px-6 rounded-lg items-center"
              onPress={() => navigation.navigate('Login')}
            >
              <Text className="text-white text-base font-semibold">Login</Text>
            </Pressable>
            <Pressable
              className="bg-transparent py-3 px-6 rounded-lg items-center border border-blue-500"
              onPress={() => navigation.navigate('Register')}
            >
              <Text className={tailwind.primary}>Create Account</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${tailwind.background.both}`}>
      <View className={`m-5 p-5 ${tailwind.card.both} rounded-xl`}>
        <Text className={`text-3xl font-bold mb-4 ${tailwind.text.both}`}>Profile</Text>
        <View className={`flex-row py-3 border-b ${tailwind.border.both}`}>
          <Text className={`text-base font-semibold w-32 ${tailwind.textMuted.both}`}>Email:</Text>
          <Text className={`text-base flex-1 ${tailwind.text.both}`}>{user.email}</Text>
        </View>
        {user.displayName && (
          <View className={`flex-row py-3 border-b ${tailwind.border.both}`}>
            <Text className={`text-base font-semibold w-32 ${tailwind.textMuted.both}`}>Display Name:</Text>
            <Text className={`text-base flex-1 ${tailwind.text.both}`}>{user.displayName}</Text>
          </View>
        )}
        <View className={`mt-5 p-4 ${tailwind.background.both} rounded-lg`}>
          <Text className={`text-sm ${tailwind.textMuted.both} text-center italic`}>Profile settings coming soon</Text>
        </View>
      </View>
    </View>
  );
}



