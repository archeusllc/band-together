import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { navigationColors } from '../theme/colors';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...navigationColors.light,
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...navigationColors.dark,
  },
};
