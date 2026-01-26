import React, { useEffect } from 'react';
import { Text, View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '@navigation/types';
import { useFeed } from '@contexts';
import { FeedCard } from '@components';
import { tailwind } from '@theme';

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { events, loading, refreshing, hasMore, error, fetchFeed, refreshFeed, loadMore } = useFeed();

  useEffect(() => {
    fetchFeed();
  }, []);

  if (loading && events.length === 0) {
    return (
      <View className={`flex-1 ${tailwind.background.both} justify-center items-center`}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className={`text-base ${tailwind.textMuted.both} mt-4`}>
          Loading feed...
        </Text>
      </View>
    );
  }

  if (error && events.length === 0) {
    return (
      <View className={`flex-1 ${tailwind.background.both} justify-center items-center px-5`}>
        <Text className="text-6xl mb-4">⚠️</Text>
        <Text className={`text-xl font-bold mb-2 text-center ${tailwind.text.both}`}>
          Failed to Load Feed
        </Text>
        <Text className={`text-sm ${tailwind.textMuted.both} text-center`}>
          {error}
        </Text>
      </View>
    );
  }

  if (events.length === 0) {
    return (
      <View className={`flex-1 ${tailwind.background.both} justify-center items-center px-5`}>
        <Text className="text-6xl mb-4">🎵</Text>
        <Text className={`text-2xl font-bold mb-2 text-center ${tailwind.text.both}`}>
          No Events Yet
        </Text>
        <Text className={`text-base ${tailwind.textMuted.both} text-center`}>
          Check back later for upcoming shows and performances
        </Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${tailwind.background.both}`}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.eventId}
        renderItem={({ item }) => (
          <FeedCard
            event={item}
            onPress={() => {
              navigation.navigate('EventDetails', { eventId: item.eventId });
            }}
          />
        )}
        contentContainerStyle={{ paddingVertical: 12 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshFeed}
            tintColor="#3B82F6"
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          hasMore && !refreshing ? (
            <View className="py-4">
              <ActivityIndicator size="small" color="#3B82F6" />
            </View>
          ) : null
        }
      />
    </View>
  );
};


