import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import type { SetItem, Track } from '@band-together/shared';

interface EditItemModalProps {
  visible: boolean;
  item: (SetItem & { track?: Track }) | null;
  onClose: () => void;
  onSave: (updates: {
    customTuning?: string;
    customNotes?: string;
    customDuration?: number;
  }) => Promise<void>;
  loading?: boolean;
}

const formatDuration = (seconds: number): string => {
  if (seconds === 0) return '0s';
  if (seconds < 60) return `${seconds}s`;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
};

export const EditItemModal = ({ visible, item, onClose, onSave, loading = false }: EditItemModalProps) => {
  const [tuning, setTuning] = useState('');
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState('');

  // Initialize form with current values when modal opens
  useEffect(() => {
    if (item) {
      setTuning(item.customTuning || item.track?.defaultTuning || '');
      setNotes(item.customNotes || '');
      setDuration(item.customDuration ? String(item.customDuration) : '');
    }
  }, [item, visible]);

  if (!item || !item.track) return null;

  const handleSave = async () => {
    try {
      const updates: Parameters<typeof onSave>[0] = {};

      // Only include fields that have changed
      if (tuning !== (item.customTuning || item.track?.defaultTuning || '')) {
        updates.customTuning = tuning || undefined;
      }
      if (notes !== (item.customNotes || '')) {
        updates.customNotes = notes || undefined;
      }
      if (duration !== (item.customDuration ? String(item.customDuration) : '')) {
        const durationNum = duration ? parseInt(duration, 10) : undefined;
        if (!isNaN(durationNum as any) || duration === '') {
          updates.customDuration = durationNum;
        }
      }

      await onSave(updates);
      onClose();
    } catch (error) {
      Alert.alert('Error', `Failed to update item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleClose = () => {
    setTuning('');
    setNotes('');
    setDuration('');
    onClose();
  };

  const displayDuration = item.customDuration ?? item.track?.defaultDuration ?? 0;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View className={`flex-1 ${tailwind.background.both}`}>
        {/* Header */}
        <View className={`border-b ${tailwind.border.both} p-4 pt-2`}>
          <View className="flex-row items-center justify-between mb-4">
            <Text className={`text-lg font-bold ${tailwind.text.both}`}>Edit Track</Text>
            <Pressable onPress={handleClose} disabled={loading}>
              <IconSymbol name="xmark.circle.fill" size={24} color={colors.light.muted} />
            </Pressable>
          </View>

          {/* Track Info */}
          <View className={`${tailwind.activeBackground.both} rounded-lg p-3`}>
            <Text className={`text-base font-semibold ${tailwind.text.both}`} numberOfLines={1}>
              {item.track.title}
            </Text>
            {item.track.artist && (
              <Text className={`text-sm ${tailwind.textMuted.both} mt-1`} numberOfLines={1}>
                {item.track.artist}
              </Text>
            )}
          </View>
        </View>

        {/* Form */}
        <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
          {/* Default Values Reference */}
          <View className={`${tailwind.activeBackground.both} rounded-lg p-3 mb-6`}>
            <Text className={`text-xs font-semibold ${tailwind.textMuted.both} mb-2`}>TRACK DEFAULTS</Text>
            <View className="gap-1">
              {item.track.defaultTuning && (
                <Text className={`text-sm ${tailwind.text.both}`}>
                  Tuning: <Text className={`${tailwind.textMuted.both}`}>{item.track.defaultTuning}</Text>
                </Text>
              )}
              <Text className={`text-sm ${tailwind.text.both}`}>
                Duration: <Text className={`${tailwind.textMuted.both}`}>{formatDuration(item.track.defaultDuration || 0)}</Text>
              </Text>
            </View>
          </View>

          {/* Tuning */}
          <View className="mb-6">
            <Text className={`text-sm font-semibold ${tailwind.textMuted.both} mb-2`}>
              Tuning <Text className={`${tailwind.text.both}}`}>(optional)</Text>
            </Text>
            <TextInput
              className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg px-4 py-3 ${tailwind.text.both}`}
              placeholder={item.track.defaultTuning || 'Standard, Drop D, etc.'}
              placeholderTextColor={colors.light.muted}
              value={tuning}
              onChangeText={setTuning}
              editable={!loading}
              returnKeyType="next"
            />
          </View>

          {/* Duration */}
          <View className="mb-6">
            <Text className={`text-sm font-semibold ${tailwind.textMuted.both} mb-2`}>
              Duration in Seconds <Text className={`${tailwind.text.both}}`}>(optional)</Text>
            </Text>
            <TextInput
              className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg px-4 py-3 ${tailwind.text.both}`}
              placeholder={String(item.track.defaultDuration || 0)}
              placeholderTextColor={colors.light.muted}
              value={duration}
              onChangeText={setDuration}
              editable={!loading}
              keyboardType="number-pad"
              returnKeyType="next"
            />
            {duration && !isNaN(parseInt(duration, 10)) && (
              <Text className={`text-xs ${tailwind.textMuted.both} mt-2`}>
                ≈ {formatDuration(parseInt(duration, 10))}
              </Text>
            )}
          </View>

          {/* Notes */}
          <View className="mb-6">
            <Text className={`text-sm font-semibold ${tailwind.textMuted.both} mb-2`}>
              Notes <Text className={`${tailwind.text.both}}`}>(optional)</Text>
            </Text>
            <TextInput
              className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg px-4 py-3 ${tailwind.text.both} h-24`}
              placeholder="e.g., Play with palm muting, start with clean tone..."
              placeholderTextColor={colors.light.muted}
              value={notes}
              onChangeText={setNotes}
              editable={!loading}
              multiline
              returnKeyType="done"
              textAlignVertical="top"
            />
          </View>

          {/* Spacing for buttons */}
          <View className="h-4" />
        </ScrollView>

        {/* Buttons */}
        <View className={`border-t ${tailwind.border.both} p-4 gap-3 flex-row`}>
          <Pressable
            className={`flex-1 py-3 rounded-lg border ${tailwind.border.both} ${tailwind.activeBackground.both}`}
            onPress={handleClose}
            disabled={loading}
          >
            <Text className={`text-center font-semibold ${tailwind.text.both}`}>Cancel</Text>
          </Pressable>

          <Pressable
            className={`flex-1 py-3 rounded-lg ${loading ? 'opacity-50' : ''}`}
            style={{ backgroundColor: colors.brand.primary }}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-center font-semibold text-white">Save Changes</Text>
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
