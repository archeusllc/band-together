import { View, Text } from 'react-native';
import { tailwind } from '@theme';

export const SetlistDetailsScreen = () => {
  return (
    <View className={`flex-1 ${tailwind.background.both}`}>
      <View className="flex-1 items-center justify-center">
        <Text className={`text-xl font-semibold ${tailwind.text.both}`}>
          Setlist Details
        </Text>
        <Text className={`text-base ${tailwind.textMuted.both} mt-2`}>
          Phase 14 - Coming Soon
        </Text>
      </View>
    </View>
  );
};
