import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { DrawerParamList } from '@navigation/types';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
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
import type { SetList, SetItem, SetSection, Track } from '@band-together/shared';

type Props = DrawerScreenProps<DrawerParamList, 'SetlistDetails'>;

interface DisplayItem {
  type: 'header' | 'item';
  data: SetSection | (SetItem & { track?: Track });
  id: string;
}

export const SetlistDetailsScreen = ({ route }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<DrawerParamList>>();
  const { setlistId } = route.params;
  const { user, loading: authLoading } = useAuth();
  const [setlist, setSetlist] = useState<SetList & { setItems?: Array<SetItem & { track?: any }>; setSections?: SetSection[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSongSearch, setShowSongSearch] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteItemConfirm, setDeleteItemConfirm] = useState<(SetItem & { track?: Track }) | null>(null);
  const [deleteSectionConfirm, setDeleteSectionConfirm] = useState<SetSection | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<SetItem & { track?: Track } | null>(null);
  const [operationLoading, setOperationLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Connect to WebSocket using Eden Treaty
      const socket = api.setlist[setlistId].ws.subscribe();

      socket.subscribe((message: any) => {
        console.log('[WebSocket] Received message:', message.type, message);

        if (message.type === 'presence-update') {
          console.log('[WebSocket] Presence update:', message.presence);
        } else {
          // For any data mutation event, refresh the setlist
          console.log('[WebSocket] Data changed, refreshing...');
          fetchSetlistDetails();
        }
      });

      socket.on('open', () => {
        console.log('[WebSocket] Connected to setlist');
      });

      socket.on('close', () => {
        console.log('[WebSocket] Disconnected from setlist');
      });

      socket.on('error', (error: any) => {
        console.error('[WebSocket] Connection error:', error);
      });

      return () => {
        console.log('[WebSocket] Closing socket for setlist:', setlistId);
        socket.close();
      };
    }, [setlistId])
  );

  const isOwner = user && setlist && user.userId === (setlist as any).ownerId;

  const showShare = route.params.modalState === 'share';

  const setShowShare = (show: boolean) => navigation.navigate('SetlistDetails', { setlistId, modalState: show ? 'share' : undefined });

  const fetchSetlistDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await setlistService.getSetlistById(setlistId);

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
      setLoading(false);
    }
  };


  // Wait for Firebase auth to initialize before fetching
  useEffect(() => {
    if (authLoading) return;

    fetchSetlistDetails();
  }, [setlistId, authLoading]);

  const formatDuration = (seconds: number): string => {
    if (seconds === 0) return '0s';
    if (seconds < 60) return `${seconds}s`;

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  };

  const handleAddTrack = async (track: Track) => {
    if (!setlist) return;
    setOperationLoading(true);
    try {
      await setlistService.addSetItem(setlistId, {
        trackId: track.trackId,
      });
      // Refresh setlist data
      await fetchSetlistDetails();
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

  const handleReorderItems = async (newData: DisplayItem[]) => {
    if (!setlist?.setItems) return;

    // Extract only items (not headers) and map to reorder data
    const reorderedItems = newData
      .filter((item) => item.type === 'item')
      .map((item, index) => ({
        setItemId: (item.data as SetItem).setItemId,
        position: index,
      }));

    setOperationLoading(true);
    try {
      await setlistService.reorderSetItems(setlistId, reorderedItems);
      await fetchSetlistDetails();
    } catch (err) {
      setDeleteError(`Failed to reorder tracks: ${err instanceof Error ? err.message : 'Unknown error'}`);
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

  if (loading) {
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

  const renderItem = (props: any) => {
    const { item, drag, isActive } = props;

    if (item.type === 'header') {
      return (
        <SetSectionHeader
          section={item.data}
          isEditing={isEditing}
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
                      await setlistService.updateSection(setlistId, item.data.sectionId, {
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
              item.data.name
            );
          }}
          onDelete={() => handleDeleteSection(item.data)}
        />
      );
    }

    if (isEditing) {
      return (
        <ScaleDecorator>
          <View>
            <SetItemRow
              item={item.data}
              isEditing={true}
              isDragging={isActive}
              onEdit={() => setEditingItem(item.data)}
              onDelete={() => handleDeleteItem(item.data)}
            />
          </View>
        </ScaleDecorator>
      );
    }

    return (
      <View>
        <SetItemRow item={item.data} />
      </View>
    );
  };

  return (
    <View className={`flex-1 ${tailwind.background.both}`}>

      {/* Header with Edit and Share Buttons */}
      <View className={`${tailwind.card.both} border-b ${tailwind.border.both} px-4 py-3 flex-row items-center justify-between gap-2`}>
        <Text className={`text-lg font-bold ${tailwind.text.both} flex-1`}>
          {setlist.name}
        </Text>
        {isOwner && (
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => setShowShare(true)}
              disabled={operationLoading}
              className={`py-2 px-3 rounded-lg ${tailwind.activeBackground.both} flex-row items-center gap-1`}
            >
              <IconSymbol name="link" size={16} color={colors.brand.primary} />
              <Text className={`text-sm font-semibold ${tailwind.text.both}`}>Share</Text>
            </Pressable>
            <Pressable
              onPress={() => setIsEditing(!isEditing)}
              disabled={operationLoading}
              className={`py-2 px-4 rounded-lg ${isEditing ? 'bg-blue-500' : tailwind.activeBackground.both}`}
            >
              <Text className={`font-semibold ${isEditing ? 'text-white' : tailwind.text.both}`}>
                {isEditing ? 'Done' : 'Edit'}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setShowOptions(true);
              }}
              disabled={operationLoading}
              className={`py-2 px-3 rounded-lg ${tailwind.activeBackground.both} flex-row items-center gap-1`}
            >
              <IconSymbol name="settings" size={16} color={colors.brand.primary} />
              <Text className={`text-sm font-semibold ${tailwind.text.both}`}>More</Text>
            </Pressable>
          </View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className={`${tailwind.card.both} border-b ${tailwind.border.both} p-6`}>
          {/* Title and Privacy Icon */}
          <View className="flex-row items-center gap-3 mb-3">
            <View className={`w-12 h-12 rounded-lg ${tailwind.activeBackground.both} items-center justify-center`}>
              <IconSymbol name="musical-notes" size={24} color={colors.brand.primary} />
            </View>
            <View className="flex-1">
              <Text className={`text-2xl font-bold ${tailwind.text.both}`} numberOfLines={2}>
                {setlist.name}
              </Text>
              {!setlist.guildId && (
                <View className="flex-row items-center gap-1 mt-1">
                  <IconSymbol name="lock-closed" size={12} color={colors.brand.primary} />
                  <Text className={`text-xs ${tailwind.textMuted.both}`}>Private</Text>
                </View>
              )}
            </View>
          </View>

          {/* Description */}
          {setlist.description && (
            <Text className={`text-base ${tailwind.textMuted.both} mb-4`}>
              {setlist.description}
            </Text>
          )}

          {/* Stats */}
          <View className="flex-row gap-6 mb-4">
            {/* Track Count */}
            <View className="items-center">
              <Text className={`text-lg font-bold ${tailwind.text.both}`}>
                {setlist.setItems?.length || 0}
              </Text>
              <Text className={`text-xs ${tailwind.textMuted.both}`}>
                {(setlist.setItems?.length || 0) === 1 ? 'Track' : 'Tracks'}
              </Text>
            </View>

            {/* Total Duration */}
            <View className="items-center">
              <Text className={`text-lg font-bold ${tailwind.text.both}`}>
                {formatDuration(totalDuration)}
              </Text>
              <Text className={`text-xs ${tailwind.textMuted.both}`}>Duration</Text>
            </View>

            {/* Section Count */}
            {sections.length > 0 && (
              <View className="items-center">
                <Text className={`text-lg font-bold ${tailwind.text.both}`}>
                  {sections.length}
                </Text>
                <Text className={`text-xs ${tailwind.textMuted.both}`}>
                  {sections.length === 1 ? 'Set' : 'Sets'}
                </Text>
              </View>
            )}
          </View>

          {/* Action Buttons (editing mode) */}
          {isEditing && isOwner && (
            <View className="flex-row gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Pressable
                className={`flex-1 py-3 rounded-lg flex-row items-center justify-center gap-2 ${tailwind.activeBackground.both}`}
                onPress={() => setShowSongSearch(true)}
                disabled={operationLoading}
              >
                <IconSymbol name="add-circle" size={16} color={colors.brand.primary} />
                <Text className={`font-semibold ${tailwind.text.both}`}>Add Song</Text>
              </Pressable>
              <Pressable
                className={`flex-1 py-3 rounded-lg flex-row items-center justify-center gap-2 ${tailwind.activeBackground.both}`}
                onPress={() => setShowAddSection(true)}
                disabled={operationLoading}
              >
                <IconSymbol name="add-circle" size={16} color={colors.brand.primary} />
                <Text className={`font-semibold ${tailwind.text.both}`}>Add Section</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Tracks Section */}
        {displayItems.length > 0 ? (
          isEditing ? (
            <DraggableFlatList
              data={displayItems}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              onDragEnd={({ data }) => handleReorderItems(data)}
              scrollEnabled={false}
              activationDistance={10}
            />
          ) : (
            <FlatList
              data={displayItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderItem({ item })}
              scrollEnabled={false}
              nestedScrollEnabled={false}
            />
          )
        ) : (
          <View className="flex-1 items-center justify-center p-6 min-h-96">
            <IconSymbol name="ban" size={48} color={colors.light.muted} />
            <Text className={`text-base ${tailwind.text.both} mt-4 text-center`}>
              No tracks in this setlist yet
            </Text>
            <Text className={`text-sm ${tailwind.textMuted.both} mt-2 text-center`}>
              {isOwner && isEditing ? 'Tap "Add Song" to get started' : 'Add songs to get started'}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Modals */}
      <SongSearchModal
        visible={showSongSearch}
        onClose={() => setShowSongSearch(false)}
        onSelectTrack={handleAddTrack}
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
