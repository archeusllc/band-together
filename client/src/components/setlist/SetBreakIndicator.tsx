import React from 'react';
import { View, Text } from 'react-native';
import { tailwind } from '@theme';
import { IconSymbol } from '@ui';

interface SetBreakIndicatorProps {
  breakDuration: number;
}

const formatDuration = (seconds: number): string => {
  if (seconds === 0) return '0:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const mm = hours > 0 ? String(minutes).padStart(2, '0') : String(minutes);
  const ss = String(secs).padStart(2, '0');

  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
};

export const SetBreakIndicator = ({ breakDuration }: SetBreakIndicatorProps) => {
  // Don't show indicator if no break or break is 0
  if (!breakDuration || breakDuration === 0) {
    return null;
  }

  return (
    <View className={`flex-row items-center justify-center py-3 border-b ${tailwind.border.both}`}>
      <View className="flex-row items-center gap-2">
        <Text className={`text-xs ${tailwind.textMuted.both}`}>
          ━━━
        </Text>
        <IconSymbol
          name="pause-circle-outline"
          size={16}
          color="#9CA3AF"
        />
        <Text className={`text-sm ${tailwind.textMuted.both}`}>
          {formatDuration(breakDuration)} Break
        </Text>
        <Text className={`text-xs ${tailwind.textMuted.both}`}>
          ━━━
        </Text>
      </View>
    </View>
  );
};
