import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { DrawerParamList } from '@navigation/types';
import { api, setlistService } from '@services';
import { useAuth } from '@contexts';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import { SetItemRow } from '@components/setlist/SetItemRow';
import { SetSectionHeader } from '@components/setlist/SetSectionHeader';
import { SongSearchModal } from '@components/setlist/SongSearchModal';
import { AddSectionModal } from '@components/setlist/AddSectionModal';
import { EditItemModal } from '@components/setlist/EditItemModal';
import { ShareModal } from '@components/setlist/ShareModal';
import { SetlistDetailsSkeleton } from '@components/setlist/SetlistDetailsSkeleton';
import { PresenceBadge } from '@components/ui';
import type { SetList, SetItem, SetSection, Track } from '@band-together/shared';

type Props = DrawerScreenProps<DrawerParamList, 'SetlistDetails'>;

interface DisplayItem {
  type: 'header' | 'item';
  data: SetSection | (SetItem & { track?: Track });
  id: string;
}

export const SetlistDetailsScreen = ({ route }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<DrawerParamList>>();
  const { setlistId, shareToken } = route.params;
  const { user, loading: authLoading } = useAuth();
  const [setlist, setSetlist] = useState<SetList & { setItems?: Array<SetItem & { track?: any }>; setSections?: SetSection[] } | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [backgroundRefreshing, setBackgroundRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [duplicateTrackConfirm, setDuplicateTrackConfirm] = useState<Track | null>(null);
  const [showSongSearch, setShowSongSearch] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteItemConfirm, setDeleteItemConfirm] = useState<(SetItem & { track?: Track }) | null>(null);
  const [deleteSectionConfirm, setDeleteSectionConfirm] = useState<SetSection | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<SetItem & { track?: Track } | null>(null);
  const [operationLoading, setOperationLoading] = useState(false);
  const [socket, setSocket] = useState<any>(null);
  const [presence, setPresence] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced refresh function - waits 200ms after last broadcast before fetching
  const debouncedRefresh = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    refreshTimeoutRef.current = setTimeout(() => {
      fetchSetlistDetails();
    }, 200); // 200ms debounce
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Connect to WebSocket using Eden Treaty with authentication parameters
      const socket = api.setlist[setlistId].ws.subscribe({
        query: {
          userId: user?.userId || undefined,
          userName: user?.displayName || user?.email?.split('@')[0] || undefined,
          shareToken: shareToken || undefined,
        }
      });
      setSocket(socket);

      socket.subscribe((message: any) => {
        console.log('[WebSocket] Received message:', message.type, message);

        if (message.type === 'presence-update') {
          console.log('[WebSocket] Presence update:', message.presence);
          setPresence(message.presence);
        } else {
          // For any data mutation event, debounce refresh to prevent excessive API calls
          console.log('[WebSocket] Data changed, refresh debounced...');
          debouncedRefresh();
        }
      });

      socket.on('open', () => {
        console.log('[WebSocket] Connected to setlist');
        setIsConnected(true);
      });

      socket.on('close', () => {
        console.log('[WebSocket] Disconnected from setlist');
        setIsConnected(false);
      });

      socket.on('error', (error: any) => {
        console.error('[WebSocket] Connection error:', error);
        setIsConnected(false);
      });

      return () => {
        if (refreshTimeoutRef.current) {
          clearTimeout(refreshTimeoutRef.current);
        }
        console.log('[WebSocket] Closing socket for setlist:', setlistId);
        socket.close();
      };
    }, [setlistId, shareToken, user])
  );

  const isOwner = user && setlist && user.userId === (setlist as any).ownerId;

  const showShare = route.params.modalState === 'share';

  const setShowShare = (show: boolean) => navigation.navigate('SetlistDetails', { setlistId, modalState: show ? 'share' : undefined });

  const fetchSetlistDetails = async () => {
    // Only show skeleton on initial load, not for background refreshes
    if (!setlist) {
      setInitialLoading(true);
    } else {
      setBackgroundRefreshing(true);
    }
    setError(null);
    try {
      const { data, error: fetchError } = await setlistService.getSetlistById(setlistId, shareToken);

      if (fetchError || !data) {
        // Provide more specific error message based on error content
        let errorMsg = 'Failed to load setlist';
        if (fetchError) {
          const errorStr = String(fetchError).toLowerCase();
          if (errorStr.includes('not found') || errorStr.includes('404')) {
            errorMsg = 'This setlist doesn\'t exist or has been deleted';
          } else if (errorStr.includes('unauthorized') || errorStr.includes('forbidden') || errorStr.includes('permission') || errorStr.includes('403')) {
            errorMsg = 'You don\'t have permission to view this setlist';
          }
        }
        setError(errorMsg);
        return;
      }

      setSetlist(data);
    } catch (err) {
      setError('An error occurred while loading the setlist');
    } finally {
      setInitialLoading(false);
      setBackgroundRefreshing(false);
    }
  };


  // Wait for Firebase auth to initialize before fetching
  useEffect(() => {
    if (authLoading) return;

    fetchSetlistDetails();
  }, [setlistId, authLoading]);

  const formatDurationRounded = (seconds: number): string => {
    if (seconds === 0) return '0 minutes';

    const totalMinutes = seconds / 60;

    // If less than 60 minutes, show in minutes
    if (totalMinutes < 60) {
      const minutes = Math.round(totalMinutes);
      return `~${minutes} minutes`;
    }

    // If 60+ minutes, show in hours rounded to nearest tenth
    const hours = totalMinutes / 60;
    const hoursRounded = Math.round(hours * 10) / 10;
    const hoursStr = hoursRounded % 1 === 0 ? hoursRounded.toString() : hoursRounded.toFixed(1);
    return `~${hoursStr} hour${hoursRounded === 1 ? '' : 's'}`;
  };

  const handleAddTrack = async (track: Track) => {
    if (!setlist) return;

    // Check if track already exists in setlist
    const trackExists = setlist.setItems?.some(item => item.trackId === track.trackId);

    if (trackExists) {
      // Show confirmation dialog
      setDuplicateTrackConfirm(track);
      return;
    }

    await performAddTrack(track);
  };

  const performAddTrack = async (track: Track) => {
    setOperationLoading(true);
    try {
      await setlistService.addSetItem(setlistId, {
        trackId: track.trackId,
      });
      // Refresh setlist data
      await fetchSetlistDetails();
      setShowSongSearch(false);
    } catch (err) {
      setDeleteError(`Failed to add track: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setOperationLoading(false);
    }
  };

  const handleDeleteItem = (item: SetItem & { track?: Track }) => {
    setDeleteItemConfirm(item);
  };

  const handleConfirmDeleteItem = async (item: SetItem & { track?: Track }) => {
    setOperationLoading(true);
    try {
      await setlistService.deleteSetItem(setlistId, item.setItemId);
      await fetchSetlistDetails();
      setDeleteItemConfirm(null);
    } catch (err) {
      setDeleteError(`Failed to delete track: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setOperationLoading(false);
    }
  };

  const handleUpdateItem = async (updates: {
    customTuning?: string;
    customNotes?: string;
    customDuration?: number;
  }) => {
    if (!editingItem) return;
    setOperationLoading(true);
    try {
      await setlistService.updateSetItem(setlistId, editingItem.setItemId, updates);
      await fetchSetlistDetails();
      setEditingItem(null);
    } catch (err) {
      throw err;
    } finally {
      setOperationLoading(false);
    }
  };

  const handleAddSection = async (name: string) => {
    setOperationLoading(true);
    try {
      await setlistService.addSection(setlistId, { name });
      await fetchSetlistDetails();
      setShowAddSection(false);
    } catch (err) {
      throw err;
    } finally {
      setOperationLoading(false);
    }
  };

  const handleDeleteSection = (section: SetSection) => {
    setDeleteSectionConfirm(section);
  };

  const handleConfirmDeleteSection = async (section: SetSection) => {
    setOperationLoading(true);
    try {
      await setlistService.deleteSection(setlistId, section.sectionId);
      await fetchSetlistDetails();
      setDeleteSectionConfirm(null);
    } catch (err) {
      setDeleteError(`Failed to delete section: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setOperationLoading(false);
    }
  };

  const handleDeleteSetlist = async () => {
    setOperationLoading(true);
    try {
      const result = await setlistService.deleteSetlist(setlistId);

      if (result.error) {
        setDeleteError(`Failed to delete setlist: ${result.error}`);
        return;
      }

      // Navigate back to setlist manager
      setShowDeleteConfirm(false);
      navigation.navigate('SetlistManager' as any);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setDeleteError(`Failed to delete setlist: ${errorMsg}`);
    } finally {
      setOperationLoading(false);
    }
  };

  const handleDuplicateSetlist = async () => {
    if (!setlist) return;
    setOperationLoading(true);
    try {
      const result = await setlistService.createSetlist({
        name: `${setlist.name} (Copy)`,
        description: setlist.description || '',
        guildId: setlist.guildId || undefined,
      });

      if (result.data) {
        // Copy all items from original setlist
        const items = setlist.setItems || [];
        for (const item of items) {
          await setlistService.addSetItem(result.data.setListId, {
            trackId: item.trackId,
            customTuning: item.customTuning ?? undefined,
            customNotes: item.customNotes ?? undefined,
            customDuration: item.customDuration ?? undefined,
            sectionId: item.sectionId ?? undefined,
            position: item.position ?? undefined,
          });
        }
        // Navigate to the new setlist after successful duplication
        navigation.navigate('SetlistDetails', { setlistId: result.data.setListId });
        // Success - setlist was duplicated and navigation will follow
      }
    } catch (err) {
      setDeleteError(`Failed to duplicate setlist: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setOperationLoading(false);
    }
  };

  const handleUpdateSetlistName = async (newName: string) => {
    if (!newName.trim() || !setlist) return;
    setOperationLoading(true);
    try {
      await setlistService.updateSetlist(setlistId, { name: newName.trim() });
      await fetchSetlistDetails();
    } catch (err) {
      setDeleteError(`Failed to update setlist name: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setOperationLoading(false);
    }
  };

  if (initialLoading && !setlist) {
    return <SetlistDetailsSkeleton />;
  }

  if (error || !setlist) {
    return (
      <View className={`flex-1 ${tailwind.background.both} items-center justify-center p-6`}>
        <IconSymbol name="alert-circle" size={48} color={colors.brand.error} />
        <Text className={`text-base ${tailwind.text.both} mt-4 text-center`}>
          {error || 'Setlist not found'}
        </Text>
      </View>
    );
  }

  // Calculate total duration
  const totalDuration = (setlist.setItems || []).reduce((sum, item) => {
    const duration = item.customDuration ?? item.track?.defaultDuration ?? 0;
    return sum + duration;
  }, 0);

  // Group items by section for display
  const sectionMap = new Map<string | null, typeof setlist.setItems>();
  (setlist.setItems || []).forEach((item) => {
    const sectionId = item.sectionId || null;
    if (!sectionMap.has(sectionId)) {
      sectionMap.set(sectionId, []);
    }
    sectionMap.get(sectionId)!.push(item);
  });

  // Create display list with sections as headers
  const displayItems: DisplayItem[] = [];
  const sections = setlist.setSections || [];

  // Add unsectioned items first (if any)
  const unsectionedItems = sectionMap.get(null) || [];
  if (unsectionedItems.length > 0) {
    unsectionedItems.forEach((item) => {
      displayItems.push({ type: 'item', data: item, id: `item-${item.setItemId}` });
    });
  }

  // Add sections with their items
  sections.forEach((section) => {
    displayItems.push({ type: 'header', data: section, id: `section-${section.sectionId}` });
    const sectionItems = sectionMap.get(section.sectionId) || [];
    sectionItems.forEach((item) => {
      displayItems.push({ type: 'item', data: item, id: `item-${item.setItemId}` });
    });
  });

  const renderItem = ({ item }: { item: DisplayItem }) => {
    if (item.type === 'header') {
      const section = item.data as SetSection;
      return (
        <SetSectionHeader
          section={section}
          isEditing={isOwner || false}
          isOwner={isOwner || false}
          onEdit={() => {
            Alert.prompt(
              'Edit Section Name',
              'Enter new section name',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Update',
                  onPress: async (newName: string | undefined) => {
                    if (!newName?.trim()) return;
                    setOperationLoading(true);
                    try {
                      await setlistService.updateSection(setlistId, section.sectionId, {
                        name: newName.trim(),
                      });
                      await fetchSetlistDetails();
                    } catch (err) {
                      setDeleteError(`Failed to update section: ${err instanceof Error ? err.message : 'Unknown error'}`);
                    } finally {
                      setOperationLoading(false);
                    }
                  },
                },
              ],
              'plain-text',
              section.name
            );
          }}
          onDelete={() => handleDeleteSection(section)}
        />
      );
    }

    const trackItem = item.data as SetItem & { track?: Track };
    return (
      <View>
        <SetItemRow
          item={trackItem}
          isEditing={isOwner || false}
          isOwner={isOwner || false}
          onEdit={() => setEditingItem(trackItem)}
          onDelete={() => handleDeleteItem(trackItem)}
        />
      </View>
    );
  };

  return (
    <View className={`flex-1 ${tailwind.background.both}`}>

      {/* Header with Setlist Name and Buttons */}
      <View className={`${tailwind.card.both} border-b ${tailwind.border.both} px-4 py-3`}>
        <View className="flex-row items-center justify-between gap-2 mb-2">
          {/* Left: Setlist Name with Edit Functionality */}
          <View className="flex-1 flex-row items-center gap-2">
            <View className={`w-8 h-8 rounded-lg ${tailwind.activeBackground.both} items-center justify-center flex-shrink-0`}>
              <IconSymbol name="musical-notes" size={16} color={colors.brand.primary} />
            </View>
            <View className="flex-1 min-w-0">
              {isOwner && isEditingName ? (
                <TextInput
                  className={`text-sm font-bold ${tailwind.text.both}`}
                  value={editedName}
                  onChangeText={setEditedName}
                  onBlur={async () => {
                    if (editedName.trim() && editedName !== setlist.name) {
                      await handleUpdateSetlistName(editedName.trim());
                    }
                    setIsEditingName(false);
                  }}
                  autoFocus
                  returnKeyType="done"
                />
              ) : (
                <Pressable
                  onPress={() => {
                    if (isOwner) {
                      setEditedName(setlist.name);
                      setIsEditingName(true);
                    }
                  }}
                >
                  <View className="flex-row items-center gap-1">
                    <Text className={`text-sm font-bold ${tailwind.text.both}`} numberOfLines={1}>
                      {setlist.name}
                    </Text>
                    {isOwner && (
                      <IconSymbol name="pencil" size={12} color={colors.brand.primary} />
                    )}
                  </View>
                </Pressable>
              )}
              {!setlist.guildId && (
                <View className="flex-row items-center gap-1 mt-0.5">
                  <IconSymbol name="lock-closed" size={10} color={colors.brand.primary} />
                  <Text className={`text-xs ${tailwind.textMuted.both}`}>Private</Text>
                </View>
              )}
            </View>
          </View>

          {/* Right: Live Indicator, Share and Options Buttons */}
          <View className="flex-row gap-1 flex-shrink-0 items-center">
            {/* Live Indicator */}
            <View className={`flex-row items-center gap-1 px-2.5 py-2 rounded-lg ${isConnected ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
              <View
                className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
                accessibilityLabel={isConnected ? 'Connected' : 'Disconnected'}
              />
              <Text className={`text-xs font-medium ${isConnected ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                {isConnected ? 'Live' : 'Offline'}
              </Text>
            </View>

            {isOwner && (
              <>
                <Pressable
                  onPress={() => setShowShare(true)}
                  disabled={operationLoading}
                  className={`p-2 rounded-lg ${tailwind.activeBackground.both}`}
                  accessibilityLabel="Share setlist"
                >
                  <IconSymbol name="share-social" size={16} color={colors.brand.primary} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setShowOptions(true);
                  }}
                  disabled={operationLoading}
                  className={`p-2 rounded-lg ${tailwind.activeBackground.both}`}
                  accessibilityLabel="More options"
                >
                  <IconSymbol name="ellipsis-vertical" size={16} color={colors.brand.primary} />
                </Pressable>
              </>
            )}
          </View>
        </View>

        {/* Presence Badge */}
        {presence.length > 0 && <PresenceBadge presence={presence} />}
      </View>

      {/* Tracks Section */}
      {displayItems.length > 0 ? (
        <FlatList
          data={displayItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          contentContainerStyle={isOwner ? { paddingBottom: 64 } : undefined}
          ListHeaderComponent={
            <View className={`${tailwind.card.both} border-b ${tailwind.border.both} px-4 py-3`}>
              {/* Stats Row */}
              <View className="flex-row justify-around gap-2">
                {/* Track Count */}
                <View className="items-center">
                  <Text className={`text-base font-bold ${tailwind.text.both}`}>
                    {setlist.setItems?.length || 0}
                  </Text>
                  <Text className={`text-xs ${tailwind.textMuted.both}`}>
                    {(setlist.setItems?.length || 0) === 1 ? 'Track' : 'Tracks'}
                  </Text>
                </View>

                {/* Total Duration */}
                <View className="items-center">
                  <Text className={`text-base font-bold ${tailwind.text.both}`}>
                    {formatDurationRounded(totalDuration)}
                  </Text>
                  <Text className={`text-xs ${tailwind.textMuted.both}`}>Duration</Text>
                </View>

                {/* Section Count */}
                {sections.length > 0 && (
                  <View className="items-center">
                    <Text className={`text-base font-bold ${tailwind.text.both}`}>
                      {sections.length}
                    </Text>
                    <Text className={`text-xs ${tailwind.textMuted.both}`}>
                      {sections.length === 1 ? 'Set' : 'Sets'}
                    </Text>
                  </View>
                )}
              </View>

            </View>
          }
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={isOwner ? { paddingBottom: 64 } : undefined}>
          <View className={`${tailwind.card.both} border-b ${tailwind.border.both} px-4 py-3`}>
            {/* Stats Row */}
            <View className="flex-row justify-around gap-2">
              {/* Track Count */}
              <View className="items-center">
                <Text className={`text-base font-bold ${tailwind.text.both}`}>
                  {setlist.setItems?.length || 0}
                </Text>
                <Text className={`text-xs ${tailwind.textMuted.both}`}>
                  {(setlist.setItems?.length || 0) === 1 ? 'Track' : 'Tracks'}
                </Text>
              </View>

              {/* Total Duration */}
              <View className="items-center">
                <Text className={`text-base font-bold ${tailwind.text.both}`}>
                  {formatDurationRounded(totalDuration)}
                </Text>
                <Text className={`text-xs ${tailwind.textMuted.both}`}>Duration</Text>
              </View>

              {/* Section Count */}
              {sections.length > 0 && (
                <View className="items-center">
                  <Text className={`text-base font-bold ${tailwind.text.both}`}>
                    {sections.length}
                  </Text>
                  <Text className={`text-xs ${tailwind.textMuted.both}`}>
                    {sections.length === 1 ? 'Set' : 'Sets'}
                  </Text>
                </View>
              )}
            </View>

          </View>

          <View className="flex-1 items-center justify-center p-6 min-h-96">
            <IconSymbol name="ban" size={48} color={colors.light.muted} />
            <Text className={`text-base ${tailwind.text.both} mt-4 text-center`}>
              No tracks in this setlist yet
            </Text>
            <Text className={`text-sm ${tailwind.textMuted.both} mt-2 text-center`}>
              {isOwner ? 'Tap "Add Song" to get started' : 'No tracks in this setlist'}
            </Text>
          </View>
        </ScrollView>
      )}

      {/* Bottom Action Bar (owner only) */}
      {isOwner && (
        <View className={`absolute bottom-0 left-0 right-0 flex-row border-t ${tailwind.border.both} ${tailwind.card.both}`}>
          <Pressable
            onPress={() => setShowAddSection(true)}
            disabled={operationLoading}
            className="flex-1 py-3 flex-row items-center justify-center gap-2 border-r border-slate-200 dark:border-slate-700"
            accessibilityLabel="Add section"
          >
            <IconSymbol name="add-circle" size={20} color={colors.brand.primary} />
            <Text className={`text-sm font-semibold ${tailwind.text.both}`}>Section</Text>
          </Pressable>
          <Pressable
            onPress={() => setShowSongSearch(true)}
            disabled={operationLoading}
            className="flex-1 py-3 flex-row items-center justify-center gap-2"
            accessibilityLabel="Add track"
          >
            <IconSymbol name="add-circle" size={20} color={colors.brand.primary} />
            <Text className={`text-sm font-semibold ${tailwind.text.both}`}>Track</Text>
          </Pressable>
        </View>
      )}

      {/* Modals */}
      <SongSearchModal
        visible={showSongSearch}
        onClose={() => setShowSongSearch(false)}
        onSelectTrack={handleAddTrack}
        existingTrackIds={new Set(setlist?.setItems?.map(item => item.trackId) || [])}
      />

      <AddSectionModal
        visible={showAddSection}
        onClose={() => setShowAddSection(false)}
        onAdd={handleAddSection}
        loading={operationLoading}
      />

      <EditItemModal
        visible={!!editingItem}
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onSave={handleUpdateItem}
        loading={operationLoading}
      />

      {setlist && (
        <ShareModal
          visible={showShare}
          setlistId={setlistId}
          setlistName={setlist.name}
          onClose={() => setShowShare(false)}
        />
      )}

      {/* Options Modal - Web-compatible alternative to Alert */}
      {showOptions && (
        <View
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
          style={{ pointerEvents: 'box-none' }}
        >
          <View
            className={`${tailwind.card.both} rounded-lg p-4 w-80 max-w-full`}
            style={{ pointerEvents: 'box-only' }}
          >
            <Text className={`text-lg font-bold ${tailwind.text.both} mb-4`}>
              Options
            </Text>
            <Text className={`${tailwind.textMuted.both} mb-6`}>
              What would you like to do?
            </Text>

            <View className="gap-2">
              <Pressable
                onPress={() => {
                  setShowOptions(false);
                  handleDuplicateSetlist();
                }}
                className={`${tailwind.activeBackground.both} rounded-lg p-3`}
              >
                <Text className={`font-semibold ${tailwind.text.both}`}>
                  Duplicate
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setShowOptions(false);
                  setShowDeleteConfirm(true);
                }}
                className={`bg-red-100 dark:bg-red-900/30 rounded-lg p-3`}
              >
                <Text className="font-semibold text-red-600 dark:text-red-400">
                  Delete
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setShowOptions(false);
                }}
                className={`${tailwind.activeBackground.both} rounded-lg p-3`}
              >
                <Text className={`font-semibold ${tailwind.text.both}`}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {/* Delete Confirmation Modal - Web-compatible alternative to Alert */}
      {showDeleteConfirm && (
        <View
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
          style={{ pointerEvents: 'box-none' }}
        >
          <View
            className={`${tailwind.card.both} rounded-lg p-4 w-80 max-w-full`}
            style={{ pointerEvents: 'box-only' }}
          >
            <Text className={`text-lg font-bold ${tailwind.text.both} mb-2`}>
              Delete Setlist
            </Text>
            <Text className={`${tailwind.textMuted.both} mb-6`}>
              Are you sure you want to delete "{setlist?.name}"? This action cannot be undone.
            </Text>

            <View className="gap-2">
              <Pressable
                onPress={() => {
                  setShowDeleteConfirm(false);
                  handleDeleteSetlist();
                }}
                disabled={operationLoading}
                className={`bg-red-100 dark:bg-red-900/30 rounded-lg p-3`}
              >
                <Text className="font-semibold text-red-600 dark:text-red-400">
                  {operationLoading ? 'Deleting...' : 'Delete'}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setShowDeleteConfirm(false);
                }}
                disabled={operationLoading}
                className={`${tailwind.activeBackground.both} rounded-lg p-3`}
              >
                <Text className={`font-semibold ${tailwind.text.both}`}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {/* Delete Item Confirmation Modal */}
      {deleteItemConfirm && (
        <View
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
          style={{ pointerEvents: 'box-none' }}
        >
          <View
            className={`${tailwind.card.both} rounded-lg p-4 w-80 max-w-full`}
            style={{ pointerEvents: 'box-only' }}
          >
            <Text className={`text-lg font-bold ${tailwind.text.both} mb-2`}>
              Delete Track
            </Text>
            <Text className={`${tailwind.textMuted.both} mb-6`}>
              Remove "{deleteItemConfirm.track?.title}" from setlist?
            </Text>

            <View className="gap-2">
              <Pressable
                onPress={() => handleConfirmDeleteItem(deleteItemConfirm)}
                disabled={operationLoading}
                className={`bg-red-100 dark:bg-red-900/30 rounded-lg p-3`}
              >
                <Text className="font-semibold text-red-600 dark:text-red-400">
                  {operationLoading ? 'Deleting...' : 'Delete'}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setDeleteItemConfirm(null)}
                disabled={operationLoading}
                className={`${tailwind.activeBackground.both} rounded-lg p-3`}
              >
                <Text className={`font-semibold ${tailwind.text.both}`}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {/* Delete Section Confirmation Modal */}
      {deleteSectionConfirm && (
        <View
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
          style={{ pointerEvents: 'box-none' }}
        >
          <View
            className={`${tailwind.card.both} rounded-lg p-4 w-80 max-w-full`}
            style={{ pointerEvents: 'box-only' }}
          >
            <Text className={`text-lg font-bold ${tailwind.text.both} mb-2`}>
              Delete Section
            </Text>
            <Text className={`${tailwind.textMuted.both} mb-6`}>
              Remove section "{deleteSectionConfirm.name}"? Tracks in this section will become unsectioned.
            </Text>

            <View className="gap-2">
              <Pressable
                onPress={() => handleConfirmDeleteSection(deleteSectionConfirm)}
                disabled={operationLoading}
                className={`bg-red-100 dark:bg-red-900/30 rounded-lg p-3`}
              >
                <Text className="font-semibold text-red-600 dark:text-red-400">
                  {operationLoading ? 'Deleting...' : 'Delete'}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setDeleteSectionConfirm(null)}
                disabled={operationLoading}
                className={`${tailwind.activeBackground.both} rounded-lg p-3`}
              >
                <Text className={`font-semibold ${tailwind.text.both}`}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {/* Duplicate Track Confirmation Modal */}
      {duplicateTrackConfirm && (
        <View
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
          style={{ pointerEvents: 'box-none' }}
        >
          <View
            className={`${tailwind.card.both} rounded-lg p-4 w-80 max-w-full`}
            style={{ pointerEvents: 'box-only' }}
          >
            <Text className={`text-lg font-bold ${tailwind.text.both} mb-2`}>
              Add Duplicate?
            </Text>
            <Text className={`${tailwind.textMuted.both} mb-6`}>
              "{duplicateTrackConfirm.title}" is already in this setlist. Add it again?
            </Text>

            <View className="gap-2">
              <Pressable
                onPress={() => {
                  performAddTrack(duplicateTrackConfirm);
                  setDuplicateTrackConfirm(null);
                }}
                disabled={operationLoading}
                className={`${tailwind.activeBackground.both} rounded-lg p-3`}
              >
                <Text className={`font-semibold ${tailwind.text.both}`}>
                  {operationLoading ? 'Adding...' : 'Add Duplicate'}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setDuplicateTrackConfirm(null)}
                disabled={operationLoading}
                className={`${tailwind.activeBackground.both} rounded-lg p-3`}
              >
                <Text className={`font-semibold ${tailwind.text.both}`}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {/* Delete Error Modal */}
      {deleteError && (
        <Pressable
          className="absolute inset-0 bg-black/50"
          onPress={() => setDeleteError(null)}
          style={{ pointerEvents: 'auto' }}
        >
          <View className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'box-none' }}>
            <Pressable
              className={`${tailwind.card.both} rounded-lg p-6 mx-6 max-w-sm`}
              onPress={() => { }}
              style={{ pointerEvents: 'box-only' }}
            >
              <Text className={`text-lg font-bold ${tailwind.text.both} mb-2`}>Error</Text>
              <Text className={`text-base ${tailwind.text.both} mb-6`}>{deleteError}</Text>
              <Pressable
                className="py-3 rounded-lg"
                style={{ backgroundColor: colors.brand.primary }}
                onPress={() => setDeleteError(null)}
              >
                <Text className="text-center font-semibold text-white">OK</Text>
              </Pressable>
            </Pressable>
          </View>
        </Pressable>
      )}
    </View>
  );
};
