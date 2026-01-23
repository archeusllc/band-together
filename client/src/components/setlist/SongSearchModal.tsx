import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { trackService } from '@services';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import type { Track } from '@band-together/shared';

interface SongSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectTrack: (track: Track) => void;
}

const formatDuration = (seconds: number): string => {
  if (seconds === 0) return '0s';
  if (seconds < 60) return `${seconds}s`;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
};

export const SongSearchModal = ({ visible, onClose, onSelectTrack }: SongSearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear timeout on unmount
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [debounceTimer]);

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

      setTracks(data.data || []);
      if (!data.data || data.data.length === 0) {
        setError(null); // No error, just no results
      }
    } catch (err) {
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

  const handleSelectTrack = (track: Track) => {
    onSelectTrack(track);
    setSearchQuery('');
    setTracks([]);
    onClose();
  };

  const renderTrackItem = ({ item }: { item: Track }) => (
    <Pressable
      className={`border-b ${tailwind.border.both} p-4`}
      onPress={() => handleSelectTrack(item)}
    >
      <View className="flex-1">
        {/* Title and Duration */}
        <View className="flex-row items-center justify-between mb-1">
          <Text className={`text-base font-semibold ${tailwind.text.both} flex-1`} numberOfLines={1}>
            {item.title}
          </Text>
          <Text className={`text-sm ${tailwind.textMuted.both} ml-2`}>
            {formatDuration(item.defaultDuration || 0)}
          </Text>
        </View>

        {/* Artist and Type */}
        <View className="flex-row items-center gap-2">
          {item.artist && (
            <Text className={`text-sm ${tailwind.textMuted.both} flex-1`} numberOfLines={1}>
              {item.artist}
            </Text>
          )}
          {item.defaultTuning && (
            <Text className={`text-xs px-2 py-1 rounded ${tailwind.activeBackground.both} ${tailwind.textMuted.both}`}>
              {item.defaultTuning}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );

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
              <IconSymbol name="xmark.circle.fill" size={20} color={colors.brand.error} />
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
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={colors.brand.primary} />
            <Text className={`text-base ${tailwind.textMuted.both} mt-4`}>
              Searching songs...
            </Text>
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center p-6">
            <IconSymbol name="exclamationmark.circle" size={48} color={colors.brand.error} />
            <Text className={`text-base ${tailwind.text.both} mt-4 text-center`}>
              {error}
            </Text>
          </View>
        ) : searchQuery.trim().length === 0 ? (
          <View className="flex-1 justify-center items-center p-6">
            <IconSymbol name="magnifyingglass" size={48} color={colors.light.muted} />
            <Text className={`text-base ${tailwind.text.both} mt-4 text-center`}>
              Start typing to search for songs
            </Text>
          </View>
        ) : tracks.length === 0 ? (
          <View className="flex-1 justify-center items-center p-6">
            <IconSymbol name="music.note.slash" size={48} color={colors.light.muted} />
            <Text className={`text-base ${tailwind.text.both} mt-4 text-center`}>
              No songs found for "{searchQuery}"
            </Text>
          </View>
        ) : (
          <FlatList
            data={tracks}
            keyExtractor={(item) => item.trackId}
            renderItem={renderTrackItem}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        )}
      </View>
    </Modal>
  );
};
