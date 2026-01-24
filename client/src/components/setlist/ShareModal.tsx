import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Image,
  Clipboard,
} from 'react-native';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import { setlistService } from '@services';
import type { SetListShare } from '@band-together/shared';

interface ShareModalProps {
  visible: boolean;
  setlistId: string;
  setlistName: string;
  onClose: () => void;
}

export const ShareModal = ({ visible, setlistId, setlistName, onClose }: ShareModalProps) => {
  const [permission, setPermission] = useState<'VIEW_ONLY' | 'CAN_EDIT'>('VIEW_ONLY');
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [shares, setShares] = useState<SetListShare[]>([]);
  const [generatedShare, setGeneratedShare] = useState<SetListShare | null>(null);
  const [expiresAt, setExpiresAt] = useState<string>('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copyFeedback, setCopyFeedback] = useState<string>('');
  const [revokeConfirming, setRevokeConfirming] = useState<string | null>(null);
  const [revokeLoading, setRevokeLoading] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing shares when modal opens
  useEffect(() => {
    if (visible) {
      loadShares();
      // Generate a default share link immediately on open
      generateDefaultShare();
    }
  }, [visible]);

  // Generate a share link whenever permission or expiration changes
  useEffect(() => {
    if (visible && generatedShare) {
      // Only regenerate if the permission or expiration actually changed significantly
      // Debounce to avoid generating on every keystroke
      const timer = setTimeout(() => {
        generateNewShareWithSettings();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [permission, expiresAt, visible]);

  const loadShares = async () => {
    setListLoading(true);
    try {
      const { data, error } = await setlistService.listShares(setlistId);
      if (error || !data) {
        setError('Failed to load shares');
        return;
      }
      setShares(data);
    } catch (err) {
      console.error('Load shares error:', err);
    } finally {
      setListLoading(false);
    }
  };

  const generateShareUrl = (shareToken: string): string => {
    // Get the current host the app is running on
    const host = typeof window !== 'undefined' && window.location?.host
      ? window.location.host
      : 'band-together.app';
    const protocol = typeof window !== 'undefined' && window.location?.protocol
      ? window.location.protocol
      : 'https:';

    // Format: [protocol]//[host]/setlist/shared/[token]
    return `${protocol}//${host}/setlist/shared/${shareToken}`;
  };

  const generateQrCodeUrl = (shareToken: string): string => {
    const shareUrl = generateShareUrl(shareToken);
    // Using qrserver API: encodes URL as QR code
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareUrl)}`;
  };

  const generateDefaultShare = async () => {
    // Skip if we already have a generated share
    if (generatedShare) return;

    setLoading(true);
    try {
      const { data, error } = await setlistService.createShare(setlistId, {
        permission: 'VIEW_ONLY',
        expiresAt: undefined,
      });

      if (error || !data) {
        // Silent fail - user can generate manually if needed
        return;
      }

      const qrUrl = generateQrCodeUrl(data.shareToken);
      setGeneratedShare(data);
      setQrCodeUrl(qrUrl);
      setPermission('VIEW_ONLY');
      setExpiresAt('');
    } catch (err) {
      // Silent fail - user can generate manually if needed
      console.error('Failed to generate default share:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateNewShareWithSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await setlistService.createShare(setlistId, {
        permission,
        expiresAt: expiresAt || undefined,
      });

      if (error || !data) {
        // Show error for intentional regeneration
        setError('Failed to create share link');
        return;
      }

      const qrUrl = generateQrCodeUrl(data.shareToken);
      setGeneratedShare(data);
      setQrCodeUrl(qrUrl);
    } catch (err) {
      setError(`Failed to create share: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateShare = async () => {
    setLoading(true);
    try {
      const { data, error } = await setlistService.createShare(setlistId, {
        permission,
        expiresAt: expiresAt || undefined,
      });

      if (error || !data) {
        setError('Failed to create share link');
        return;
      }

      // Generate QR code URL
      const qrUrl = generateQrCodeUrl(data.shareToken);
      setGeneratedShare(data);
      setQrCodeUrl(qrUrl);
      setExpiresAt('');

      // Reload shares list
      await loadShares();
    } catch (err) {
      setError(`Failed to create share: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (!generatedShare) return;

    const shareUrl = generateShareUrl(generatedShare.shareToken);
    try {
      await Clipboard.setString(shareUrl);
      setCopyFeedback('Copied!');
      setTimeout(() => setCopyFeedback(''), 2000);
    } catch (err) {
      setError('Failed to copy link');
    }
  };

  const handleRevokeShare = async (shareId: string) => {
    setRevokeLoading(true);
    try {
      const { error } = await setlistService.revokeShare(setlistId, shareId);
      if (error) {
        setError('Failed to revoke share');
        return;
      }
      await loadShares();
      if (generatedShare?.shareId === shareId) {
        setGeneratedShare(null);
        setQrCodeUrl('');
      }
      setRevokeConfirming(null);
    } catch (err) {
      setError(`Failed to revoke share: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setRevokeLoading(false);
    }
  };

  const formatPermission = (perm: string): string => {
    return perm === 'VIEW_ONLY' ? 'View only' : 'Can edit';
  };

  const formatDate = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
          <View className="flex-row items-center justify-between mb-4">
            <Text className={`text-lg font-bold ${tailwind.text.both}`}>Share Setlist</Text>
            <Pressable onPress={onClose} disabled={loading || listLoading} className="flex-row items-center gap-1">
              <IconSymbol name="close-circle" size={24} color="#9CA3AF" />
              <Text className={`text-sm font-semibold ${tailwind.text.both}`}>Close</Text>
            </Pressable>
          </View>
          <Text className={`text-sm ${tailwind.textMuted.both}`}>{setlistName}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-4">
          {/* Generated Share Display - MOVED TO TOP */}
          {generatedShare && qrCodeUrl && (
            <View className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg p-4 mb-6`}>
              <Text className={`text-base font-semibold ${tailwind.text.both} mb-4`}>
                Your Share Link
              </Text>

              {/* QR Code */}
              <Pressable
                className="items-center mb-4 active:opacity-75"
                onPress={() => setShowQrModal(true)}
              >
                <View className="bg-white rounded-lg p-2">
                  <Image
                    source={{ uri: qrCodeUrl }}
                    style={{ width: 250, height: 250 }}
                  />
                </View>
                <Text className={`text-xs ${tailwind.textMuted.both} mt-2`}>
                  Tap to enlarge
                </Text>
              </Pressable>

              {/* Share URL */}
              <View className={`${tailwind.activeBackground.both} rounded-lg p-3 mb-3`}>
                <Text className={`text-xs font-semibold ${tailwind.textMuted.both} mb-1`}>
                  SHARE URL
                </Text>
                <Text className={`text-xs ${tailwind.text.both} mb-2 font-mono`} numberOfLines={2}>
                  {generateShareUrl(generatedShare.shareToken)}
                </Text>
              </View>

              {/* Copy Button */}
              <Pressable
                className={`py-3 rounded-lg border ${tailwind.border.both} flex-row items-center justify-center gap-2 ${
                  copyFeedback ? 'bg-green-500' : tailwind.activeBackground.both
                }`}
                onPress={handleCopyLink}
              >
                <IconSymbol
                  name={copyFeedback ? 'checkmark-circle' : 'copy'}
                  size={16}
                  color={copyFeedback ? '#FFFFFF' : colors.brand.primary}
                />
                <Text
                  className={`font-semibold ${copyFeedback ? 'text-white' : tailwind.text.both}`}
                >
                  {copyFeedback || 'Copy Link'}
                </Text>
              </Pressable>
            </View>
          )}

          {/* Generate New Share Section - MOVED BELOW */}
          <View className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg p-4 mb-6`}>
            <Text className={`text-base font-semibold ${tailwind.text.both} mb-4`}>
              Share Settings
            </Text>

            {/* Permission Selector */}
            <View className="mb-4">
              <Text className={`text-sm font-semibold ${tailwind.textMuted.both} mb-2`}>
                Permission Level
              </Text>
              <View className="flex-row gap-2">
                {['VIEW_ONLY', 'CAN_EDIT'].map((perm) => (
                  <Pressable
                    key={perm}
                    onPress={() => setPermission(perm as 'VIEW_ONLY' | 'CAN_EDIT')}
                    className={`flex-1 py-2 rounded-lg border ${tailwind.border.both} ${
                      permission === perm ? 'bg-blue-500' : tailwind.activeBackground.both
                    }`}
                  >
                    <Text
                      className={`text-center text-sm font-semibold ${
                        permission === perm ? 'text-white' : tailwind.text.both
                      }`}
                    >
                      {formatPermission(perm)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Expiration Date Input */}
            <View className="mb-4">
              <Text className={`text-sm font-semibold ${tailwind.textMuted.both} mb-2`}>
                Expiration (optional)
              </Text>
              <TextInput
                className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg px-4 py-3 ${tailwind.text.both}`}
                placeholder="YYYY-MM-DD HH:MM"
                placeholderTextColor="#9CA3AF"
                value={expiresAt}
                onChangeText={setExpiresAt}
                editable={!loading}
              />
              <Text className={`text-xs ${tailwind.textMuted.both} mt-1`}>
                Leave blank for no expiration
              </Text>
            </View>

            {/* Notes about auto-generation */}
            <View className={`${tailwind.activeBackground.both} rounded-lg p-3`}>
              <Text className={`text-xs ${tailwind.textMuted.both} text-center`}>
                Changes to settings will generate a new share link
              </Text>
            </View>
          </View>

          {/* Existing Shares Section */}
          <View>
            <Text className={`text-base font-semibold ${tailwind.text.both} mb-3`}>
              Active Shares ({shares.length})
            </Text>

            {listLoading ? (
              <View className="items-center py-6">
                <ActivityIndicator size="large" color={colors.brand.primary} />
              </View>
            ) : shares.length === 0 ? (
              <View className={`${tailwind.activeBackground.both} rounded-lg p-4 items-center`}>
                <IconSymbol name="unlink" size={24} color="#9CA3AF" />
                <Text className={`text-sm ${tailwind.textMuted.both} mt-2 text-center`}>
                  No active shares yet
                </Text>
              </View>
            ) : (
              <View className="gap-2">
                {shares.map((share) => (
                  <View
                    key={share.shareId}
                    className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg p-3 flex-row items-center justify-between`}
                  >
                    <View className="flex-1">
                      <View className="flex-row items-center gap-2 mb-1">
                        <Text className={`text-sm font-semibold ${tailwind.text.both}`}>
                          {formatPermission(share.permission)}
                        </Text>
                        {share.expiresAt && new Date(share.expiresAt) > new Date() && (
                          <Text className={`text-xs px-2 py-1 rounded ${tailwind.activeBackground.both} ${tailwind.textMuted.both}`}>
                            {formatDate(share.expiresAt)}
                          </Text>
                        )}
                        {share.expiresAt && new Date(share.expiresAt) <= new Date() && (
                          <Text className="text-xs px-2 py-1 rounded bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300">
                            Expired
                          </Text>
                        )}
                      </View>
                      <Text className={`text-xs ${tailwind.textMuted.both}`}>
                        Created {formatDate(share.createdAt)}
                      </Text>
                    </View>
                    <Pressable
                      className="flex-row items-center gap-1 px-3 py-2 rounded-lg active:bg-red-100 dark:active:bg-red-900/30"
                      onPress={() => setRevokeConfirming(share.shareId)}
                      disabled={loading || listLoading || revokeLoading}
                    >
                      <IconSymbol name="trash" size={14} color={colors.brand.error} />
                      <Text className="text-xs font-semibold text-red-600 dark:text-red-400">Revoke</Text>
                    </Pressable>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Spacing */}
          <View className="h-6" />
        </ScrollView>

        {/* Revoke Confirmation Modal */}
        {revokeConfirming && (
          <View
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
            style={{ pointerEvents: 'box-none' }}
          >
            <View
              className={`${tailwind.card.both} rounded-lg p-4 w-80 max-w-full`}
              style={{ pointerEvents: 'box-only' }}
            >
              <Text className={`text-lg font-bold ${tailwind.text.both} mb-2`}>
                Revoke Share
              </Text>
              <Text className={`${tailwind.textMuted.both} mb-6`}>
                This share link will no longer work. Users with the link will lose access.
              </Text>

              <View className="gap-2">
                <Pressable
                  onPress={() => handleRevokeShare(revokeConfirming)}
                  disabled={revokeLoading}
                  className={`bg-red-100 dark:bg-red-900/30 rounded-lg p-3`}
                >
                  <Text className="font-semibold text-red-600 dark:text-red-400">
                    {revokeLoading ? 'Revoking...' : 'Revoke'}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => setRevokeConfirming(null)}
                  disabled={revokeLoading}
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

        {/* QR Code Enlarged Modal */}
        {showQrModal && qrCodeUrl && (
          <Pressable
            className="absolute inset-0 z-50"
            onPress={() => setShowQrModal(false)}
            style={{ pointerEvents: 'auto' }}
          >
            <View className="absolute inset-0 bg-black/75" style={{ pointerEvents: 'none' }} />
            <View className="absolute inset-0 flex items-center justify-center p-6" style={{ pointerEvents: 'box-none' }}>
              <View className={`${tailwind.card.both} rounded-lg items-center justify-between`} style={{ pointerEvents: 'box-none', width: '100%', maxWidth: 500, paddingHorizontal: 24, paddingVertical: 24 }}>
                <View className="bg-white rounded-lg flex-1 w-full items-center justify-center" style={{ aspectRatio: 1 }}>
                  <Image
                    source={{ uri: qrCodeUrl }}
                    style={{ flex: 1, width: '100%' }}
                    resizeMode="contain"
                  />
                </View>
                <Text className={`text-xs ${tailwind.textMuted.both} mt-4 text-center`}>
                  Tap to close
                </Text>
              </View>
            </View>
          </Pressable>
        )}

        {/* Error Modal */}
        {error && (
          <Pressable
            className="absolute inset-0 bg-black/50 z-50"
            onPress={() => setError(null)}
            style={{ pointerEvents: 'auto' }}
          >
            <View className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'box-none' }}>
              <Pressable
                className={`${tailwind.card.both} rounded-lg p-6 mx-6 max-w-sm`}
                onPress={() => {}}
                style={{ pointerEvents: 'box-only' }}
              >
                <Text className={`text-lg font-bold ${tailwind.text.both} mb-2`}>Error</Text>
                <Text className={`text-base ${tailwind.text.both} mb-6`}>{error}</Text>
                <Pressable
                  className="py-3 rounded-lg"
                  style={{ backgroundColor: colors.brand.primary }}
                  onPress={() => setError(null)}
                >
                  <Text className="text-center font-semibold text-white">OK</Text>
                </Pressable>
              </Pressable>
            </View>
          </Pressable>
        )}
      </View>
    </Modal>
  );
};
