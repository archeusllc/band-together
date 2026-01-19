import { Text, View } from "react-native";
import { useAuth } from '@contexts';

export default function HomeScreen() {
  const { isAuthenticated, user } = useAuth();

  return (
    <View className="flex-1 bg-slate-100">
      <View className="flex-1 justify-center items-center px-5">
        <View className="items-center max-w-xs">
          <Text className="text-6xl mb-4">🎵</Text>
          <Text className="text-2xl font-bold mb-2 text-center">Your Feed</Text>
          <Text className="text-base text-gray-600 text-center mb-6">
            Your activity feed will appear here
          </Text>
          <Text className="text-sm text-gray-500 italic text-center">
            Open the drawer menu to navigate
          </Text>
        </View>
      </View>
    </View>
  );
}


