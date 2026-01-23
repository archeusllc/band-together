import React from 'react';
import { View, ScrollView } from 'react-native';
import { Skeleton } from '@ui/Skeleton';
import { tailwind } from '@theme';

/**
 * Skeleton loader for SetlistDetails screen
 * Shows placeholder content while setlist details are loading
 */
export const SetlistDetailsSkeleton = () => {
  return (
    <ScrollView
      className={`flex-1 ${tailwind.background.both}`}
      contentContainerStyle={{ paddingVertical: 16 }}
    >
      {/* Header skeleton */}
      <View className="px-4 mb-6">
        {/* Title skeleton */}
        <Skeleton width="70%" height={28} borderRadius={4} />

        {/* Description skeletons */}
        <View className="mt-3 gap-2">
          <Skeleton width="100%" height={14} borderRadius={3} />
          <Skeleton width="90%" height={14} borderRadius={3} />
        </View>

        {/* Button skeleton */}
        <Skeleton width={100} height={40} borderRadius={6} style={{ marginTop: 12 }} />
      </View>

      {/* Section header skeleton */}
      <View className="px-4 py-3 mt-2 mb-1">
        <Skeleton width="30%" height={18} borderRadius={3} />
      </View>

      {/* Item skeletons */}
      {[1, 2, 3, 4].map((index) => (
        <View key={index} className={`mx-4 mb-2 p-3 rounded-lg border ${tailwind.card.both} ${tailwind.border.both}`}>
          {/* Track title skeleton */}
          <Skeleton width="60%" height={16} borderRadius={3} />

          {/* Artist skeleton */}
          <Skeleton width="45%" height={13} borderRadius={3} style={{ marginTop: 6 }} />

          {/* Duration skeleton */}
          <Skeleton width={40} height={12} borderRadius={3} style={{ marginTop: 6 }} />
        </View>
      ))}

      {/* Another section */}
      <View className="px-4 py-3 mt-4 mb-1">
        <Skeleton width="40%" height={18} borderRadius={3} />
      </View>

      {/* More item skeletons */}
      {[1, 2].map((index) => (
        <View key={`section-${index}`} className={`mx-4 mb-2 p-3 rounded-lg border ${tailwind.card.both} ${tailwind.border.both}`}>
          <Skeleton width="65%" height={16} borderRadius={3} />
          <Skeleton width="50%" height={13} borderRadius={3} style={{ marginTop: 6 }} />
          <Skeleton width={40} height={12} borderRadius={3} style={{ marginTop: 6 }} />
        </View>
      ))}
    </ScrollView>
  );
};
