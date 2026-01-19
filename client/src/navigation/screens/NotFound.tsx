import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { tailwind } from '@theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<any>;

export default function NotFoundScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className={`flex-1 justify-center items-center px-5 ${tailwind.background.both}`}>
      <Text className="text-8xl font-bold text-blue-500 mb-4">404</Text>
      <Text className={`text-2xl font-bold mb-2 ${tailwind.text.both}`}>Page Not Found</Text>
      <Text className={`text-base ${tailwind.textMuted.both} text-center mb-8`}>
        The page you're looking for doesn't exist.
      </Text>
      <Pressable
        className="bg-blue-500 py-3 px-6 rounded-lg"
        onPress={() => navigation.navigate('MainDrawer', { screen: 'Home' })}
      >
        <Text className="text-white text-base font-semibold">Go to Home</Text>
      </Pressable>
    </View>
  );
}
