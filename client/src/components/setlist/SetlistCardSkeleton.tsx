import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '@ui/Skeleton';
import { tailwind } from '@theme';

/**
 * Skeleton loader for SetlistCard
 * Shows placeholder content while setlist is loading
 */
export const SetlistCardSkeleton = () => {
  return (
    <View className={`mx-4 mb-3 p-4 rounded-lg border ${tailwind.card.both} ${tailwind.border.both}`}>
      {/* Title skeleton */}
      <Skeleton width="70%" height={20} borderRadius={4} />

      {/* Description skeletons */}
      <View className="mt-3 gap-2">
        <Skeleton width="100%" height={14} borderRadius={3} />
        <Skeleton width="85%" height={14} borderRadius={3} />
      </View>

      {/* Stats row skeleton */}
      <View className="flex-row justify-between items-center mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
        <View className="flex-1 gap-1">
          <Skeleton width={40} height={12} borderRadius={3} />
          <Skeleton width={30} height={14} borderRadius={3} />
        </View>
        <View className="flex-1 gap-1">
          <Skeleton width={40} height={12} borderRadius={3} />
          <Skeleton width={35} height={14} borderRadius={3} />
        </View>
        <View className="flex-1 gap-1">
          <Skeleton width={40} height={12} borderRadius={3} />
          <Skeleton width={25} height={14} borderRadius={3} />
        </View>
      </View>
    </View>
  );
};
