import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tailwind, colors } from "@theme";
import { IconSymbol } from "@ui";
import { AlertModal } from "@ui";
import type { SetSection } from "@archeusllc/types";

interface EditSectionModalProps {
  visible: boolean;
  section: SetSection | null;
  onClose: () => void;
  onSave: (updates: {
    name?: string;
    breakDuration?: number | null;
  }) => Promise<void>;
  loading?: boolean;
}

const formatDuration = (seconds: number): string => {
  if (seconds === 0) return "0:00";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const mm = hours > 0 ? String(minutes).padStart(2, "0") : String(minutes);
  const ss = String(secs).padStart(2, "0");

  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
};

const parseDuration = (input: string): number | null => {
  if (!input.trim()) return null;

  // Format 1: "m:ss" or "h:mm:ss" → seconds
  const colonMatch = input.match(/^(\d+):(\d{1,2})(?::(\d{1,2}))?$/);
  if (colonMatch) {
    const part1 = parseInt(colonMatch[1], 10);
    const part2 = parseInt(colonMatch[2], 10);
    const part3 = colonMatch[3] ? parseInt(colonMatch[3], 10) : null;

    if (part3 !== null) {
      // h:mm:ss format
      if (part2 >= 60 || part3 >= 60) return null;
      return part1 * 3600 + part2 * 60 + part3;
    } else {
      // m:ss format
      if (part2 >= 60) return null;
      return part1 * 60 + part2;
    }
  }

  // Format 2: "m" or "m s" → seconds
  const textMatch = input.match(/^(\d+)m\s*(\d+)?s?$/);
  if (textMatch) {
    const minutes = parseInt(textMatch[1], 10);
    const seconds = textMatch[2] ? parseInt(textMatch[2], 10) : 0;
    return minutes * 60 + seconds;
  }

  // Format 3: just "225" → 225 seconds
  const numberMatch = input.match(/^\d+$/);
  if (numberMatch) {
    return parseInt(input, 10);
  }

  return null; // Invalid format
};

export const EditSectionModal = ({
  visible,
  section,
  onClose,
  onSave,
  loading = false,
}: EditSectionModalProps) => {
  const [name, setName] = useState("");
  const [breakDuration, setBreakDuration] = useState("");
  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    title: string;
    message: string;
  }>({ visible: false, title: "", message: "" });

  // Initialize form with current values when modal opens
  useEffect(() => {
    if (section && visible) {
      setName(section.name);
      setBreakDuration(
        section.breakDuration ? String(section.breakDuration) : "",
      );
    }
  }, [section, visible]);

  if (!section) return null;

  const handleSave = async () => {
    try {
      const updates: Parameters<typeof onSave>[0] = {};

      // Only include fields that have changed
      if (name !== section.name) {
        if (!name.trim()) {
          setAlertConfig({
            visible: true,
            title: "Invalid Name",
            message: "Section name cannot be empty",
          });
          return;
        }
        updates.name = name.trim();
      }

      if (
        breakDuration !==
        (section.breakDuration ? String(section.breakDuration) : "")
      ) {
        if (breakDuration === "") {
          updates.breakDuration = null;
        } else {
          const parsedDuration = parseDuration(breakDuration);
          if (parsedDuration !== null) {
            updates.breakDuration = parsedDuration;
          } else {
            setAlertConfig({
              visible: true,
              title: "Invalid Duration",
              message:
                "Invalid duration format. Use m:ss (e.g., 15:30), h:mm:ss (e.g., 1:30:00), m or s (e.g., 15m 30s), or seconds (e.g., 930)",
            });
            return;
          }
        }
      }

      await onSave(updates);
      handleClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setAlertConfig({
        visible: true,
        title: "Error",
        message: `Failed to update section: ${errorMessage}`,
      });
    }
  };

  const handleClose = () => {
    setName("");
    setBreakDuration("");
    onClose();
  };

  const handleClearBreak = () => {
    setBreakDuration("");
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
      >
        <SafeAreaView
          edges={["top"]}
          className={`flex-1 ${tailwind.background.both}`}
        >
          {/* Header */}
          <View className={`border-b ${tailwind.border.both} p-4`}>
            <View className="flex-row items-center justify-between">
              <Text className={`text-lg font-bold ${tailwind.text.both}`}>
                Edit Section
              </Text>
              <Pressable onPress={handleClose} disabled={loading}>
                <IconSymbol name="close-circle" size={24} color="#9CA3AF" />
              </Pressable>
            </View>
          </View>

          {/* Form */}
          <ScrollView
            className="flex-1 p-4"
            showsVerticalScrollIndicator={false}
          >
            {/* Section Name */}
            <View className="mb-6">
              <Text
                className={`text-sm font-semibold ${tailwind.textMuted.both} mb-2`}
              >
                Section Name
              </Text>
              <TextInput
                className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg px-4 py-3 ${tailwind.text.both}`}
                placeholder="e.g., Set 1 or Intro"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
                editable={!loading}
                returnKeyType="next"
              />
            </View>

            {/* Break Duration */}
            <View className="mb-6">
              <Text
                className={`text-sm font-semibold ${tailwind.textMuted.both} mb-2`}
              >
                Break Duration{" "}
                <Text className={`${tailwind.textMuted.both}}`}>
                  (optional)
                </Text>
              </Text>
              <TextInput
                className={`${tailwind.card.both} border ${tailwind.border.both} rounded-lg px-4 py-3 ${tailwind.text.both}`}
                placeholder="e.g., 15:30 or 1:30:00 or 15m 30s"
                placeholderTextColor="#9CA3AF"
                value={breakDuration}
                onChangeText={setBreakDuration}
                editable={!loading}
                returnKeyType="done"
              />
              {breakDuration && (
                <Text className={`text-xs ${tailwind.textMuted.both} mt-2`}>
                  {parseDuration(breakDuration) !== null
                    ? `≈ ${formatDuration(parseDuration(breakDuration)!)}`
                    : "Invalid format (use m:ss, h:mm:ss, m or s, or seconds)"}
                </Text>
              )}
              {breakDuration && parseDuration(breakDuration) !== null && (
                <Pressable
                  onPress={handleClearBreak}
                  disabled={loading}
                  className={`mt-3 ${tailwind.activeBackground.both} rounded-lg py-2`}
                >
                  <Text
                    className={`text-center text-sm font-semibold ${tailwind.textMuted.both}`}
                  >
                    Clear Break
                  </Text>
                </Pressable>
              )}
            </View>

            {/* Spacing for buttons */}
            <View className="h-4" />
          </ScrollView>

          {/* Buttons */}
          <View
            className={`border-t ${tailwind.border.both} p-4 gap-3 flex-row`}
          >
            <Pressable
              className={`flex-1 py-3 rounded-lg border ${tailwind.border.both} ${tailwind.activeBackground.both}`}
              onPress={handleClose}
              disabled={loading}
            >
              <Text
                className={`text-center font-semibold ${tailwind.text.both}`}
              >
                Cancel
              </Text>
            </Pressable>

            <Pressable
              className={`flex-1 py-3 rounded-lg ${loading ? "opacity-50" : ""}`}
              style={{ backgroundColor: colors.brand.primary }}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-center font-semibold text-white">
                  Save Changes
                </Text>
              )}
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Alert Modal for errors and validation */}
      <AlertModal
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttons={[
          {
            text: "OK",
            onPress: () => setAlertConfig({ ...alertConfig, visible: false }),
            style: "default",
          },
        ]}
      />
    </>
  );
};
