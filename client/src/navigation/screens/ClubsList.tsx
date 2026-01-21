import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '@navigation/types';
import { useAuth } from '@contexts';
import { guildService } from '@services';
import { GuildCard } from '@components';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

export default function ClubsListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { isAuthenticated } = useAuth();

  const [guilds, setGuilds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchGuilds();
  }, []);

  const fetchGuilds = async (pageNum: number = 1, isRefresh: boolean = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else if (pageNum === 1) {
      setLoading(true);
    }

    setError(null);

    try {
      const { data, error: err } = await guildService.getClubs(pageNum, 20);

      if (err || !data) {
        setError('Failed to load clubs');
        return;
      }

      if (isRefresh || pageNum === 1) {
        setGuilds(data.guilds);
      } else {
        setGuilds(prev => [...prev, ...data.guilds]);
      }

      setPage(pageNum);
      setHasMore(data.guilds.length === 20);
    } catch (err) {
      setError('Failed to load clubs');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchGuilds(1, true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchGuilds(page + 1);
    }
  };

  if (loading && guilds.length === 0) {
    return (
      <View className={`flex-1 ${tailwind.background.both} justify-center items-center`}>
        <ActivityIndicator size="large" color={colors.brand.primary} />
        <Text className={`text-base ${tailwind.textMuted.both} mt-4`}>
          Loading clubs...
        </Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${tailwind.background.both}`}>
      <FlatList
        data={guilds}
        keyExtractor={(item) => item.guildId}
        renderItem={({ item }) => (
          <GuildCard
            guild={item}
            onPress={() => navigation.navigate('ClubDetails', { clubId: item.guildId })}
          />
        )}
        contentContainerStyle={{ paddingVertical: 12 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.brand.primary}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-6xl mb-4">👥</Text>
            <Text className={`text-xl font-bold mb-2 text-center ${tailwind.text.both}`}>
              No Clubs Found
            </Text>
            <Text className={`text-base ${tailwind.textMuted.both} text-center px-10`}>
              Be the first to create a club!
            </Text>
          </View>
        }
        ListFooterComponent={
          hasMore && !refreshing && guilds.length > 0 ? (
            <View className="py-4">
              <ActivityIndicator size="small" color={colors.brand.primary} />
            </View>
          ) : null
        }
      />
    </View>
  );
}
