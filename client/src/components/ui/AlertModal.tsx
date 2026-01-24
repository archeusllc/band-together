import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { tailwind, colors } from '@theme';

export interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

export interface AlertModalProps {
  visible: boolean;
  title: string;
  message: string;
  buttons?: AlertButton[];
  onDismiss?: () => void;
}

export const AlertModal = ({
  visible,
  title,
  message,
  buttons = [],
  onDismiss,
}: AlertModalProps) => {
  if (!visible) return null;

  // Provide default OK button if none specified
  const displayButtons = buttons.length > 0 ? buttons : [{ text: 'OK', onPress: onDismiss }];

  const getButtonStyle = (style?: string) => {
    switch (style) {
      case 'destructive':
        return 'bg-red-100 dark:bg-red-900/30';
      case 'cancel':
        return tailwind.activeBackground.both;
      default:
        return tailwind.activeBackground.both;
    }
  };

  const getButtonTextStyle = (style?: string) => {
    switch (style) {
      case 'destructive':
        return 'text-red-600 dark:text-red-400';
      case 'cancel':
        return tailwind.text.both;
      default:
        return tailwind.text.both;
    }
  };

  return (
    <View
      className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
      style={{ pointerEvents: 'box-none' }}
    >
      <Pressable
        className={`${tailwind.card.both} rounded-lg p-4 w-80 max-w-full`}
        style={{ pointerEvents: 'box-only' }}
        onPress={() => {}}
      >
        {/* Title */}
        <Text className={`text-lg font-bold ${tailwind.text.both} mb-2`}>
          {title}
        </Text>

        {/* Message */}
        <Text className={`${tailwind.textMuted.both} mb-6`}>
          {message}
        </Text>

        {/* Buttons */}
        <View className="gap-2">
          {displayButtons.map((button, index) => (
            <Pressable
              key={index}
              onPress={button.onPress}
              className={`rounded-lg p-3 ${getButtonStyle(button.style)}`}
            >
              <Text className={`font-semibold text-center ${getButtonTextStyle(button.style)}`}>
                {button.text}
              </Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </View>
  );
};
