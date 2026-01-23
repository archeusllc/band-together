import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { tailwind, colors } from '@theme';
import { IconSymbol } from '@ui';

interface AddSectionModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string) => Promise<void>;
  loading?: boolean;
}

export const AddSectionModal = ({ visible, onClose, onAdd, loading = false }: AddSectionModalProps) => {
  const [name, setName] = useState('');

  const handleAdd = async () => {
    if (!name.trim()) {
      Alert.alert('Section name is required');
      return;
    }

    try {
      await onAdd(name.trim());
      setName('');
    } catch (error) {
      Alert.alert('Error', `Failed to add section: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleClose = () => {
    setName('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      {/* Backdrop */}
      <Pressable
        className={`flex-1 ${tailwind.background.both} opacity-50`}
        onPress={handleClose}
      />

      {/* Modal Content */}
      <View className={`absolute bottom-0 left-0 right-0 ${tailwind.card.both} rounded-t-2xl p-6 gap-4`}>
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className={`text-lg font-bold ${tailwind.text.both}`}>Add Section</Text>
          <Pressable onPress={handleClose} disabled={loading}>
            <IconSymbol name="xmark.circle.fill" size={24} color={colors.light.muted} />
          </Pressable>
        </View>

        {/* Input */}
        <View>
          <Text className={`text-sm font-semibold ${tailwind.textMuted.both} mb-2`}>
            Section Name
          </Text>
          <TextInput
            className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg px-4 py-3 ${tailwind.text.both}`}
            placeholder="e.g., Set 1, Encore, Acoustic"
            placeholderTextColor={colors.light.muted}
            value={name}
            onChangeText={setName}
            editable={!loading}
            returnKeyType="done"
            onSubmitEditing={handleAdd}
          />
        </View>

        {/* Buttons */}
        <View className="flex-row gap-3 mt-2">
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
            onPress={handleAdd}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-center font-semibold text-white">Add Section</Text>
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
