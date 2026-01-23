import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { RootStackParamList } from '@navigation/types';
import { setlistService, setlistWSService } from '@services';
import { useAuth } from '@contexts';
import { SetItemRow, SetSectionHeader, SetlistPresence } from '@components';
import { tailwind, colors } from '@theme';
import type { SetList, SetItem, SetSection, Track } from '@band-together/shared';

type Props = NativeStackScreenProps<RootStackParamList, 'SharedSetlist'>;

interface DisplayItem {
  type: 'header' | 'item';
  data: SetSection | (SetItem & { track?: Track });
  id: string;
}

export const SharedSetlist = ({ route, navigation }: Props) => {
  const { shareToken } = route.params;
  const { user } = useAuth();

  // State
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [setlist, setSetlist] = useState<SetList & {
    setItems: (SetItem & { track: Track; section: SetSection | null })[];
    setSections: SetSection[];
    shares: any[];
  } | null>(null);
  const [canEdit, setCanEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [presence, setPresence] = useState<any[]>([]);

  // Fetch setlist by share token
  const fetchSetlist = async () => {
    setError(null);

    try {
      const { data, error: fetchError } = await setlistService.getSetlistByShareToken(
        shareToken
      );

      if (fetchError || !data) {
        setError('Unable to load setlist. The link may be expired or invalid.');
        setSetlist(null);
        return;
      }

      setSetlist(data as any);

      // Check permission from share
      const share = (data as any).shares?.find((s: any) => s.shareToken === shareToken);
      setCanEdit(share?.permission === 'CAN_EDIT');
    } catch (err) {
      setError('Failed to load setlist');
      console.error('[SharedSetlist] Error fetching setlist:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchSetlist();
  }, [shareToken]);

  // WebSocket connection
  useEffect(() => {
    if (!setlist) return;

    const setupWebSocket = async () => {
      try {
        const userName = user?.email?.split('@')[0] || 'Guest';
        await setlistWSService.connect(setlist.setListId, user?.userId, userName);
        setWsConnected(true);
      } catch (err) {
        console.error('[SharedSetlist] WebSocket connection failed:', err);
      }
    };

    setupWebSocket();

    return () => {
      setlistWSService.disconnect();
      setWsConnected(false);
    };
  }, [setlist, user]);

  // WebSocket event handlers
  useEffect(() => {
    if (!wsConnected) return;

    const handleUpdate = () => fetchSetlist();
    const handlePresenceUpdate = (data: any) => {
      setPresence(data.presence || []);
    };

    setlistWSService.on('item-added', handleUpdate);
    setlistWSService.on('item-updated', handleUpdate);
    setlistWSService.on('item-deleted', handleUpdate);
    setlistWSService.on('reordered', handleUpdate);
    setlistWSService.on('section-added', handleUpdate);
    setlistWSService.on('section-updated', handleUpdate);
    setlistWSService.on('section-deleted', handleUpdate);
    setlistWSService.on('presence-update', handlePresenceUpdate);

    return () => {
      setlistWSService.off('item-added', handleUpdate);
      setlistWSService.off('item-updated', handleUpdate);
      setlistWSService.off('item-deleted', handleUpdate);
      setlistWSService.off('reordered', handleUpdate);
      setlistWSService.off('section-added', handleUpdate);
      setlistWSService.off('section-updated', handleUpdate);
      setlistWSService.off('section-deleted', handleUpdate);
      setlistWSService.off('presence-update', handlePresenceUpdate);
    };
  }, [wsConnected]);

  // Broadcast editing status
  useEffect(() => {
    if (!canEdit || !wsConnected) return;

    if (isEditing) {
      setlistWSService.startEditing();
    } else {
      setlistWSService.stopEditing();
    }
  }, [isEditing, canEdit, wsConnected]);

  // Group items by section
  const displayItems = useMemo(() => {
    if (!setlist?.setItems) return [];

    const items: DisplayItem[] = [];
    const itemsBySection = new Map<
      string | null,
      Array<SetItem & { track?: Track }>
    >();

    // Group items by sectionId
    setlist.setItems.forEach((item) => {
      const sectionId = item.sectionId || null;
      if (!itemsBySection.has(sectionId)) {
        itemsBySection.set(sectionId, []);
      }
      itemsBySection.get(sectionId)!.push(item);
    });

    // Add unsectioned items first
    const unsectioned = itemsBySection.get(null) || [];
    unsectioned.forEach((item) => {
      items.push({ type: 'item', data: item, id: item.setItemId });
    });

    // Add sections with their items
    const sections = (setlist.setSections || []).sort(
      (a, b) => a.position - b.position
    );
    sections.forEach((section) => {
      items.push({ type: 'header', data: section, id: section.sectionId });
      const sectionItems = itemsBySection.get(section.sectionId) || [];
      sectionItems.forEach((item) => {
        items.push({ type: 'item', data: item, id: item.setItemId });
      });
    });

    return items;
  }, [setlist]);

  // Calculate total duration
  const totalDuration = useMemo(() => {
    if (!setlist?.setItems) return 0;
    return setlist.setItems.reduce((sum, item) => {
      const duration = item.customDuration ?? item.track?.defaultDuration ?? 0;
      return sum + duration;
    }, 0);
  }, [setlist]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handlers
  const handleEditPress = () => {
    if (!user && canEdit) {
      Alert.alert('Sign In Required', 'You need to sign in to edit this setlist.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign In', onPress: () => navigation.navigate('Login') },
      ]);
      return;
    }

    setIsEditing(!isEditing);
  };

  const handleAddItem = useCallback(
    async (trackId: string) => {
      if (!setlist || !canEdit) return;

      const { error } = await setlistService.addSetItem(
        setlist.setListId,
        { trackId },
        shareToken
      );

      if (error) {
        Alert.alert('Error', 'Failed to add track to setlist');
      }
    },
    [setlist, canEdit, shareToken]
  );

  const handleDeleteItem = useCallback(
    async (setItemId: string) => {
      if (!setlist || !canEdit) return;

      Alert.alert('Delete Track', 'Remove this track from the setlist?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const { error } = await setlistService.deleteSetItem(
              setlist.setListId,
              setItemId,
              shareToken
            );

            if (error) {
              Alert.alert('Error', 'Failed to delete track');
            }
          },
        },
      ]);
    },
    [setlist, canEdit, shareToken]
  );

  const handleReorder = useCallback(
    async (newData: DisplayItem[]) => {
      if (!setlist || !canEdit) return;

      const itemPositions = newData
        .filter((d) => d.type === 'item')
        .map((d, index) => ({
          setItemId: (d.data as SetItem).setItemId,
          position: index,
        }));

      const { error } = await setlistService.reorderSetItems(
        setlist.setListId,
        itemPositions,
        shareToken
      );

      if (error) {
        Alert.alert('Error', 'Failed to reorder tracks');
        fetchSetlist();
      }
    },
    [setlist, canEdit, shareToken]
  );

  // Render item for FlatList
  const renderItem = useCallback(
    ({ item }: { item: DisplayItem }) => {
      if (item.type === 'header') {
        return (
          <SetSectionHeader
            section={item.data as SetSection}
            isEditing={isEditing}
          />
        );
      }

      return (
        <SetItemRow
          item={item.data as SetItem & { track?: Track }}
          isEditing={isEditing}
          onDelete={() => handleDeleteItem((item.data as SetItem).setItemId)}
        />
      );
    },
    [isEditing, handleDeleteItem]
  );

  // Render item for DraggableFlatList
  const renderDraggableItem = useCallback(
    (props: RenderItemParams<DisplayItem>) => {
      const { item, drag, isActive } = props;

      if (item.type === 'header') {
        return (
          <SetSectionHeader
            section={item.data as SetSection}
            isEditing={isEditing}
          />
        );
      }

      return (
        <SetItemRow
          item={item.data as SetItem & { track?: Track }}
          isEditing={isEditing}
          isDragging={isActive}
          onDelete={() => handleDeleteItem((item.data as SetItem).setItemId)}
        />
      );
    },
    [isEditing, handleDeleteItem]
  );

  // Loading state
  if (loading) {
    return (
      <View className={`flex-1 items-center justify-center ${tailwind.background.both}`}>
        <ActivityIndicator size="large" />
        <Text className={`mt-4 ${tailwind.textMuted.both}`}>
          Loading shared setlist...
        </Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View
        className={`flex-1 items-center justify-center ${tailwind.background.both} p-4`}
      >
        <Text className={`text-xl font-bold ${tailwind.error} mb-4`}>
          Unable to Load Setlist
        </Text>
        <Text className={`${tailwind.textMuted.both} text-center mb-6`}>
          {error}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setLoading(true);
            fetchSetlist();
          }}
        >
          <Text className={tailwind.primary}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Empty state
  if (!setlist) {
    return (
      <View className={`flex-1 items-center justify-center ${tailwind.background.both}`}>
        <Text className={`text-lg ${tailwind.textMuted.both}`}>
          Setlist not found
        </Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${tailwind.background.both}`}>
      {/* Header */}
      <View className={`${tailwind.card.both} border-b ${tailwind.border.both} p-4`}>
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className={`text-2xl font-bold ${tailwind.text.both}`}>
              {setlist.name}
            </Text>
            {setlist.description && (
              <Text className={`mt-2 ${tailwind.textMuted.both}`}>
                {setlist.description}
              </Text>
            )}
            <Text className={`mt-1 text-sm ${tailwind.textMuted.both}`}>
              {displayItems.filter((i) => i.type === 'item').length} songs •{' '}
              {formatDuration(totalDuration)}
            </Text>
          </View>

          {canEdit && (
            <TouchableOpacity
              onPress={handleEditPress}
              className={`ml-4 px-4 py-2 rounded ${
                isEditing ? `${tailwind.card.both} border ${tailwind.border.both}` : ''
              }`}
            >
              <Text className={tailwind.primary}>
                {isEditing ? 'Done' : 'Edit'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Presence indicator */}
        <SetlistPresence presence={presence} isConnected={wsConnected} />

        {canEdit && !user && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="mt-3"
          >
            <Text className={`${tailwind.primary} font-semibold`}>
              Sign in to edit
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Content - List or Empty */}
      {displayItems.length === 0 ? (
        <View className="flex-1 items-center justify-center p-4">
          <Text className={tailwind.textMuted.both}>
            This setlist is empty.
          </Text>
        </View>
      ) : isEditing ? (
        <DraggableFlatList
          data={displayItems}
          renderItem={renderDraggableItem}
          keyExtractor={(item) => item.id}
          onDragEnd={(data) => handleReorder(data.data)}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetchSetlist();
              }}
            />
          }
        />
      ) : (
        <FlatList
          data={displayItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetchSetlist();
              }}
            />
          }
        />
      )}
    </View>
  );
};
