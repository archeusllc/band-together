import { Text, View } from "react-native";
import { useAuth } from '@contexts';
import { tailwind } from '@theme';

export default function HomeScreen() {
  const { isAuthenticated, user } = useAuth();

  return (
    <View className={`flex-1 ${tailwind.background.both}`}>
      <View className="flex-1 justify-center items-center px-5">
        <View className="items-center max-w-xs">
          <Text className="text-6xl mb-4">🎵</Text>
          <Text className={`text-2xl font-bold mb-2 text-center ${tailwind.text.both}`}>Your Feed</Text>
          <Text className={`text-base ${tailwind.textMuted.both} text-center mb-6`}>
            Your activity feed will appear here
          </Text>
          <Text className={`text-sm ${tailwind.textMutedLight.both} italic text-center`}>
            Open the drawer menu to navigate
          </Text>
        </View>
      </View>
    </View>
  );
}


