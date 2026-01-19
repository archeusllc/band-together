import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useAuth } from '@contexts';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<any>;

export default function ProfileScreen() {
  const { user, isAuthenticated, loading } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  if (loading) {
    return (
      <View className="flex-1 bg-slate-100">
        <Text className="text-base text-gray-600">Loading...</Text>
      </View>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <View className="flex-1 bg-slate-100">
        <View className="flex-1 justify-center items-center px-5">
          <Text className="text-3xl font-bold mb-4">Profile</Text>
          <Text className="text-base text-gray-600 mb-8 text-center">Please log in to view your profile</Text>
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
              <Text className="text-blue-500 text-base font-semibold">Create Account</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-100">
      <View className="m-5 p-5 bg-white rounded-xl">
        <Text className="text-3xl font-bold mb-4">Profile</Text>
        <View className="flex-row py-3 border-b border-slate-200">
          <Text className="text-base font-semibold w-32 text-gray-600">Email:</Text>
          <Text className="text-base flex-1 text-black">{user.email}</Text>
        </View>
        {user.displayName && (
          <View className="flex-row py-3 border-b border-slate-200">
            <Text className="text-base font-semibold w-32 text-gray-600">Display Name:</Text>
            <Text className="text-base flex-1 text-black">{user.displayName}</Text>
          </View>
        )}
        <View className="mt-5 p-4 bg-slate-100 rounded-lg">
          <Text className="text-sm text-gray-600 text-center italic">Profile settings coming soon</Text>
        </View>
      </View>
    </View>
  );
}



