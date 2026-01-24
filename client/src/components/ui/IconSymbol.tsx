import { Ionicons } from '@expo/vector-icons';

export const IconSymbol = ({
  name,
  size = 24,
  color,
  ...rest
}: {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  [key: string]: any;
}) => {
  return <Ionicons name={name} size={size} color={color} {...rest} />;
};
