import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';
import type { SetItem, Track } from '@archeusllc/types';

const COMMON_TUNINGS = [
  { label: 'Standard (E A D G B E)', value: 'Standard' },
  { label: 'Drop D (D A D G B E)', value: 'Drop D' },
  { label: 'Drop C (C G C F A D)', value: 'Drop C' },
  { label: 'Half Step Down (Eb)', value: 'Half Step Down' },
  { label: 'Whole Step Down (D)', value: 'Whole Step Down' },
  { label: 'Open D (D A D F# A D)', value: 'Open D' },
  { label: 'Open G (D G D G B D)', value: 'Open G' },
  { label: 'Drop C# (C# G# C# F# A# D#)', value: 'Drop C#' },
];

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
  if (seconds === 0) return '0:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const mm = hours > 0 ? String(minutes).padStart(2, '0') : String(minutes);
  const ss = String(secs).padStart(2, '0');

  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
};

const parseDuration = (input: string): number | null => {
  if (!input.trim()) return null;

  // Format: "1:20" or "1m 20s" → 80 seconds
  const mmssMatch = input.match(/^(\d+):(\d{1,2})$/);
  if (mmssMatch) {
    const minutes = parseInt(mmssMatch[1], 10);
    const seconds = parseInt(mmssMatch[2], 10);
    if (seconds >= 60) return null; // Invalid
    return minutes * 60 + seconds;
  }

  // Format: "3m 45s" or "3m" → 225 or 180 seconds
  const textMatch = input.match(/^(\d+)m\s*(\d+)?s?$/);
  if (textMatch) {
    const minutes = parseInt(textMatch[1], 10);
    const seconds = textMatch[2] ? parseInt(textMatch[2], 10) : 0;
    return minutes * 60 + seconds;
  }

  // Format: just "225" → 225 seconds
  const numberMatch = input.match(/^\d+$/);
  if (numberMatch) {
    return parseInt(input, 10);
  }

  return null; // Invalid format
};

export const EditItemModal = ({ visible, item, onClose, onSave, loading = false }: EditItemModalProps) => {
  const [tuning, setTuning] = useState('');
  const [customTuning, setCustomTuning] = useState('');
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showTuningPicker, setShowTuningPicker] = useState(false);

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
        if (duration === '') {
          updates.customDuration = undefined;
        } else {
          const parsedDuration = parseDuration(duration);
          if (parsedDuration !== null) {
            updates.customDuration = parsedDuration;
          } else {
            setError('Invalid duration format. Use m:ss (e.g., 3:45), m or s (e.g., 3m 45s), or seconds (e.g., 225)');
            return;
          }
        }
      }

      await onSave(updates);
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to update item: ${errorMessage}`);
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
              <IconSymbol name="close-circle" size={24} color="#9CA3AF" />
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
              Tuning <Text className={`${tailwind.textMuted.both}}`}>(optional)</Text>
            </Text>
            <Pressable
              onPress={() => setShowTuningPicker(true)}
              disabled={loading}
              className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg px-4 py-3 flex-row items-center justify-between`}
            >
              <Text className={tuning ? tailwind.text.both : '#9CA3AF'}>
                {tuning || (item.track.defaultTuning || 'Select tuning')}
              </Text>
              <IconSymbol name="chevron-down" size={16} color="#9CA3AF" />
            </Pressable>
          </View>

          {/* Tuning Picker Modal */}
          {showTuningPicker && (
            <View
              className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
              style={{ pointerEvents: 'box-none' }}
            >
              <View
                className={`${tailwind.card.both} rounded-lg max-h-96 w-80 mx-4`}
                style={{ pointerEvents: 'auto' }}
              >
                <View className={`border-b ${tailwind.border.both} p-4`}>
                  <Text className={`text-lg font-bold ${tailwind.text.both}`}>Select Tuning</Text>
                </View>

                <ScrollView className="max-h-72">
                  {COMMON_TUNINGS.map((t) => (
                    <Pressable
                      key={t.value}
                      onPress={() => {
                        setTuning(t.value);
                        setCustomTuning('');
                        if (t.value !== 'Custom') {
                          setShowTuningPicker(false);
                        }
                      }}
                      className={`border-b ${tailwind.border.both} px-4 py-3 flex-row items-center justify-between`}
                    >
                      <Text className={tailwind.text.both}>{t.label}</Text>
                      {tuning === t.value && (
                        <IconSymbol name="checkmark" size={20} color={colors.brand.primary} />
                      )}
                    </Pressable>
                  ))}

                  {/* Custom Option */}
                  <Pressable
                    onPress={() => {
                      setTuning('');
                      setShowTuningPicker(false);
                    }}
                    className={`border-b ${tailwind.border.both} px-4 py-3 flex-row items-center justify-between`}
                  >
                    <Text className={tailwind.text.both}>Custom</Text>
                    {!COMMON_TUNINGS.find(t => t.value === tuning) && tuning && (
                      <IconSymbol name="checkmark" size={20} color={colors.brand.primary} />
                    )}
                  </Pressable>
                </ScrollView>

                <View className={`border-t ${tailwind.border.both} p-4`}>
                  <Pressable
                    onPress={() => setShowTuningPicker(false)}
                    className={`${tailwind.activeBackground.both} rounded-lg py-3`}
                  >
                    <Text className={`text-center font-semibold ${tailwind.text.both}`}>Done</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}

          {/* Custom Tuning Input (when Custom is selected) */}
          {!COMMON_TUNINGS.find(t => t.value === tuning) && tuning === '' && (
            <View className="mb-6">
              <Text className={`text-sm font-semibold ${tailwind.textMuted.both} mb-2`}>
                Custom Tuning
              </Text>
              <TextInput
                className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg px-4 py-3 ${tailwind.text.both}`}
                placeholder="e.g., DADGAD"
                placeholderTextColor="#9CA3AF"
                value={customTuning}
                onChangeText={(text) => {
                  setCustomTuning(text);
                  setTuning(text);
                }}
                editable={!loading}
                returnKeyType="next"
              />
            </View>
          )}

          {/* Duration */}
          <View className="mb-6">
            <Text className={`text-sm font-semibold ${tailwind.textMuted.both} mb-2`}>
              Duration <Text className={`${tailwind.textMuted.both}}`}>(optional)</Text>
            </Text>
            <TextInput
              className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg px-4 py-3 ${tailwind.text.both}`}
              placeholder="e.g., 3:45 or 3m 45s or 225"
              placeholderTextColor="#9CA3AF"
              value={duration}
              onChangeText={setDuration}
              editable={!loading}
              returnKeyType="next"
            />
            {duration && (
              <Text className={`text-xs ${tailwind.textMuted.both} mt-2`}>
                {parseDuration(duration) !== null
                  ? `≈ ${formatDuration(parseDuration(duration)!)}`
                  : 'Invalid format'}
              </Text>
            )}
          </View>

          {/* Notes */}
          <View className="mb-6">
            <Text className={`text-sm font-semibold ${tailwind.textMuted.both} mb-2`}>
              Notes <Text className={`${tailwind.textMuted.both}}`}>(optional)</Text>
            </Text>
            <TextInput
              className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg px-4 py-3 ${tailwind.text.both} h-24`}
              placeholder="e.g., Play with palm muting, start with clean tone..."
              placeholderTextColor="#9CA3AF"
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

        {/* Error Modal */}
        {error && (
          <Pressable
            className="absolute inset-0 bg-black/50"
            onPress={() => setError(null)}
            style={{ pointerEvents: 'auto' }}
          >
            <View className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'box-none' }}>
              <Pressable
                className={`${tailwind.card.both} rounded-lg p-6 mx-6 max-w-sm`}
                onPress={() => {}}
                style={{ pointerEvents: 'auto' }}
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
