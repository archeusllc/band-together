import { View, Text } from 'react-native';
import { tailwind } from '@theme';

export const SetlistManagerScreen = () => {
  return (
    <View className={`flex-1 ${tailwind.background.both}`}>
      <View className="flex-1 items-center justify-center">
        <Text className={`text-xl font-semibold ${tailwind.text.both}`}>
          Setlist Manager
        </Text>
        <Text className={`text-base ${tailwind.textMuted.both} mt-2`}>
          Coming Soon
        </Text>
      </View>
    </View>
  );
};
