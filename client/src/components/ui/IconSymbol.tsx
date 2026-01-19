import { SymbolView, SymbolViewProps, SFSymbol } from 'expo-symbols';
import { StyleSheet } from 'react-native';

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  ...rest
}: Omit<SymbolViewProps, 'name'> & { name: string; size?: number; color?: string }) {
  return (
    <SymbolView
      weight="regular"
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={name as SFSymbol}
      style={[styles.icon, { width: size, height: size }, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
  },
});
