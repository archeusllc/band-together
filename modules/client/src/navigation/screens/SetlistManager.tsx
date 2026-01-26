import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, Pressable, SectionList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@navigation/types';
import { setlistService } from '@services';
import { useAuth } from '@contexts';
import { SetlistCard, SetlistCardSkeleton } from '@components/setlist';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import type { SetList } from '@archeusllc/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SetlistSection {
  title: string;
  data: (SetList & { setItems?: any[]; setSections?: any[]; shares?: any[] })[];
  icon: string;
}

export const SetlistManagerScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { loading: authLoading, isAuthenticated } = useAuth();

  const [sections, setSections] = useState<SetlistSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch setlists after auth has finished initializing
    // This ensures Firebase has restored the session and getIdToken() will work
    if (!authLoading) {
      fetchSetlists();
    }
  }, [authLoading]);

  // Refetch setlists when screen gains focus
  // This handles: deletion refresh, post-login auto-load, and navigation back to screen
  useFocusEffect(
    useCallback(() => {
      // Only refetch if authenticated and auth has finished initializing
      // This prevents fetching before login completes
      if (!authLoading && isAuthenticated) {
        fetchSetlists();
      }
    }, [authLoading, isAuthenticated])
  );

  const fetchSetlists = async (isRefresh: boolean = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      const { data, error: err } = await setlistService.getUserSetlists();

      if (err || !data) {
        setError('Failed to load setlists');
        return;
      }

      const newSections: SetlistSection[] = [];

      if (data.personal && data.personal.length > 0) {
        newSections.push({
          title: 'My Setlists',
          data: data.personal,
          icon: 'musical-notes',
        });
      }

      if (data.guild && data.guild.length > 0) {
        newSections.push({
          title: 'Act Setlists',
          data: data.guild,
          icon: 'business',
        });
      }

      if (data.sharedWithMe && data.sharedWithMe.length > 0) {
        newSections.push({
          title: 'Shared With Me',
          data: data.sharedWithMe,
          icon: 'share-social',
        });
      }

      setSections(newSections);
    } catch (err) {
      setError('Failed to load setlists');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchSetlists(true);
  };

  const handleCreateSetlist = () => {
    navigation.navigate('MainDrawer', { screen: 'CreateSetlist' });
  };

  if (loading && sections.length === 0) {
    return (
      <View className={`flex-1 ${tailwind.background.both}`}>
        <View className="flex-row items-center gap-2 px-4 py-3 mt-2 mb-1">
          <View className="w-4 h-4 bg-blue-500 rounded" />
          <View className="flex-1 h-5 bg-slate-200 dark:bg-slate-700 rounded w-24" />
        </View>
        {[1, 2, 3].map((i) => (
          <SetlistCardSkeleton key={i} />
        ))}
      </View>
    );
  }

  // Show login prompt for unauthenticated users
  if (!authLoading && !isAuthenticated) {
    return (
      <View className={`flex-1 ${tailwind.background.both}`}>
        <View className="flex-1 justify-center items-center px-5">
          <Text className={`text-3xl font-bold mb-4 ${tailwind.text.both}`}>
            My Setlists
          </Text>
          <Text className={`text-base ${tailwind.textMuted.both} mb-8 text-center`}>
            Please log in to create and manage your setlists
          </Text>
          <View className="gap-3 w-full max-w-xs">
            <Pressable
              className="bg-blue-500 py-3 px-6 rounded-lg items-center"
              onPress={() => navigation.navigate('Login' as any)}
            >
              <Text className="text-white text-base font-semibold">Login</Text>
            </Pressable>
            <Pressable
              className="bg-transparent py-3 px-6 rounded-lg items-center border border-blue-500"
              onPress={() => navigation.navigate('Register' as any)}
            >
              <Text className={tailwind.primary}>Create Account</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  if (error && sections.length === 0) {
    // If unauthenticated and there's an error, show login prompt instead of error
    if (!isAuthenticated) {
      return (
        <View className={`flex-1 ${tailwind.background.both}`}>
          <View className="flex-1 justify-center items-center px-5">
            <Text className={`text-3xl font-bold mb-4 ${tailwind.text.both}`}>
              My Setlists
            </Text>
            <Text className={`text-base ${tailwind.textMuted.both} mb-8 text-center`}>
              Please log in to create and manage your setlists
            </Text>
            <View className="gap-3 w-full max-w-xs">
              <Pressable
                className="bg-blue-500 py-3 px-6 rounded-lg items-center"
                onPress={() => navigation.navigate('Login' as any)}
              >
                <Text className="text-white text-base font-semibold">Login</Text>
              </Pressable>
              <Pressable
                className="bg-transparent py-3 px-6 rounded-lg items-center border border-blue-500"
                onPress={() => navigation.navigate('Register' as any)}
              >
                <Text className={tailwind.primary}>Create Account</Text>
              </Pressable>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View className={`flex-1 ${tailwind.background.both} justify-center items-center px-6`}>
        <Text className="text-4xl mb-4">⚠️</Text>
        <Text className={`text-lg font-bold mb-2 text-center ${tailwind.text.both}`}>
          Failed to Load Setlists
        </Text>
        <Text className={`text-base ${tailwind.textMuted.both} text-center mb-6`}>
          {error}
        </Text>
        <Pressable
          onPress={handleRefresh}
          className={`${tailwind.card.both} px-6 py-3 rounded-lg border ${tailwind.border.both}`}
        >
          <Text className={`font-semibold ${tailwind.text.both}`}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  const isEmpty = sections.length === 0;

  return (
    <View className={`flex-1 ${tailwind.background.both}`}>
      {isEmpty && !loading ? (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-6xl mb-4">🎵</Text>
          <Text className={`text-xl font-bold mb-2 text-center ${tailwind.text.both}`}>
            No Setlists Yet
          </Text>
          <Text className={`text-base ${tailwind.textMuted.both} text-center mb-6`}>
            Create your first setlist to organize your tracks
          </Text>
          <Pressable
            onPress={handleCreateSetlist}
            className={`bg-blue-500 px-6 py-3 rounded-lg flex-row items-center gap-2`}
          >
            <IconSymbol name="add" size={18} color="white" />
            <Text className="text-white font-semibold">Create Setlist</Text>
          </Pressable>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.setListId}
          renderItem={({ item }) => (
            <SetlistCard
              setlist={item}
              onPress={() => navigation.navigate('MainDrawer', { screen: 'SetlistDetails', params: { setlistId: item.setListId } })}
            />
          )}
          renderSectionHeader={({ section }) => (
            <View className="flex-row items-center gap-2 px-4 py-3 mt-2 mb-1">
              <IconSymbol name={section.icon as any} size={16} color={colors.brand.primary} />
              <Text className={`text-lg font-bold ${tailwind.text.both}`}>
                {section.title}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingVertical: 12 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.brand.primary}
            />
          }
          ListEmptyComponent={
            !loading ? (
              <View className="flex-1 justify-center items-center py-20 px-6">
                <Text className="text-5xl mb-4">📋</Text>
                <Text className={`text-lg font-bold mb-2 text-center ${tailwind.text.both}`}>
                  No Setlists Found
                </Text>
                <Text className={`text-base ${tailwind.textMuted.both} text-center`}>
                  Create your first setlist to get started
                </Text>
              </View>
            ) : null
          }
          ListFooterComponent={
            !loading && sections.length > 0 ? (
              <View className="px-4 py-4 mt-2">
                <Pressable
                  onPress={handleCreateSetlist}
                  className={`${tailwind.card.both} py-4 rounded-lg border ${tailwind.border.both} items-center flex-row justify-center gap-2`}
                >
                  <IconSymbol name="add" size={18} color={colors.brand.primary} />
                  <Text className={`font-semibold ${tailwind.text.both}`}>
                    Create New Setlist
                  </Text>
                </Pressable>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};
