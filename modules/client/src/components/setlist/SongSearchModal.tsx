import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Modal,
  ScrollView,
} from 'react-native';
import { trackService } from '@services';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import type { TrackSearchResult } from '@archeusllc/types';
import { useColorScheme } from 'react-native';

interface SongSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectTrack: (track: TrackSearchResult) => void;
  existingTrackIds?: Set<string>;
}

const formatDuration = (seconds: number): string => {
  if (seconds === 0) return '0s';
  if (seconds < 60) return `${seconds}s`;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
};

export const SongSearchModal = ({ visible, onClose, onSelectTrack, existingTrackIds }: SongSearchModalProps) => {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? colors.dark.text : colors.light.text;
  const mutedColor = colorScheme === 'dark' ? colors.dark.muted : colors.light.muted;

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState<TrackSearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    // Clear timeout on unmount
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [debounceTimer]);

  useEffect(() => {
    // Reset search state when modal opens
    if (visible) {
      setSearchQuery('');
      setTracks([]);
      setError(null);
      if (debounceTimer) clearTimeout(debounceTimer);
    }
  }, [visible]);

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setTracks([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: searchError } = await trackService.searchTracks(
        query,
        'SONG',
        20,
        0,
        'title',
        'asc'
      );

      if (searchError || !data) {
        setError('Failed to search songs');
        setTracks([]);
        return;
      }

      // Handle both response formats: { data: [...] } or direct array
      const tracksArray = Array.isArray(data) ? data : (data?.data || []);
      setTracks(tracksArray);
      setRenderKey(prev => prev + 1); // Force ScrollView remount for fresh render
      if (tracksArray.length === 0) {
        setError(null); // No error, just no results
      }
    } catch (err) {
      console.error('🔍 [TrackSearch] Exception:', err);
      setError('An error occurred while searching');
      setTracks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);

    // Clear existing timer
    if (debounceTimer) clearTimeout(debounceTimer);

    // Set new timer for debounced search (300ms)
    const newTimer = setTimeout(() => {
      performSearch(text);
    }, 300);

    setDebounceTimer(newTimer);
  };

  const handleSelectTrack = (track: TrackSearchResult) => {
    onSelectTrack(track);
    // Don't clear state here - let the parent component handle modal closing
    // State will be reset when modal reopens via the useEffect on 'visible'
  };

  const renderTrackItem = ({ item }: { item: TrackSearchResult }) => {
    const isInSetlist = existingTrackIds?.has(item.trackId);

    return (
      <Pressable
        className={`border-b ${tailwind.border.both} p-4`}
        onPress={() => handleSelectTrack(item)}
      >
        {/* Top row: Title | Duration */}
        <View className="flex-row items-center justify-between mb-2">
          <Text
            style={{ color: textColor, fontSize: 16, fontWeight: '600', flex: 1 }}
            numberOfLines={1}
          >
            {item.title || 'Unknown Title'}
          </Text>
          <Text style={{ color: mutedColor, fontSize: 14, marginLeft: 8 }}>
            {item.defaultDuration ? formatDuration(item.defaultDuration) : '—'}
          </Text>
        </View>

        {/* Bottom row: Artist | In List Badge */}
        <View className="flex-row items-center justify-between">
          {item.artist && (
            <Text
              style={{ color: mutedColor, fontSize: 14 }}
              numberOfLines={1}
              className="flex-1"
            >
              {item.artist}
            </Text>
          )}
          {isInSetlist && (
            <View className="flex-row items-center gap-1 px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 ml-2">
              <IconSymbol name="checkmark-circle" size={12} color={colors.brand.primary} />
              <Text style={{ color: colors.brand.primary, fontSize: 11, fontWeight: '500' }}>
                In List
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className={`flex-1 ${tailwind.background.both}`}>
        {/* Header */}
        <View className={`border-b ${tailwind.border.both} p-4 pt-2`}>
          <View className="flex-row items-center justify-between mb-3">
            <Text className={`text-lg font-bold ${tailwind.text.both}`}>Add Song</Text>
            <Pressable onPress={onClose} className="flex-row items-center gap-1">
              <IconSymbol name="close-circle" size={20} color={colors.brand.error} />
              <Text className={`text-sm font-medium ${tailwind.error}`}>Close</Text>
            </Pressable>
          </View>

          {/* Search Input */}
          <TextInput
            className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg px-4 py-3 ${tailwind.text.both}`}
            placeholder="Search songs..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={handleSearchChange}
            autoFocus
            returnKeyType="search"
          />
        </View>

        {/* Content */}
        {tracks.length > 0 ? (
          <ScrollView key={`scrollview-${renderKey}`} className="flex-1">
            {tracks.map((item) => (
              <View key={item.trackId}>
                {renderTrackItem({ item })}
              </View>
            ))}
          </ScrollView>
        ) : loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={colors.brand.primary} />
            <Text className={`text-base ${tailwind.textMuted.both} mt-4`}>
              Searching songs...
            </Text>
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center p-6">
            <IconSymbol name="alert-circle" size={48} color={colors.brand.error} />
            <Text className={`text-base ${tailwind.text.both} mt-4 text-center`}>
              {error}
            </Text>
          </View>
        ) : searchQuery.trim().length === 0 ? (
          <View className="flex-1 justify-center items-center p-6">
            <IconSymbol name="search" size={48} color={colors.light.muted} />
            <Text className={`text-base ${tailwind.text.both} mt-4 text-center`}>
              Start typing to search for songs
            </Text>
          </View>
        ) : (
          <View className="flex-1 justify-center items-center p-6">
            <IconSymbol name="ban" size={48} color={colors.light.muted} />
            <Text className={`text-base ${tailwind.text.both} mt-4 text-center`}>
              No songs found for "{searchQuery}"
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );
};
