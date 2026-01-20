import { useColorScheme } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '@/components/DrawerContent';
import {
  HomeScreen,
  ProfileScreen,
  SettingsScreen,
  LoginScreen,
  RegisterScreen,
  NotFoundScreen,
  EventDetailsScreen,
} from '@screens';
import { lightTheme, darkTheme } from './themes';
import type { RootStackParamList, DrawerParamList } from './types';

export type { RootStackParamList, DrawerParamList } from './types';

const MainDrawer = createDrawerNavigator({
  drawerContent: (props) => <DrawerContent {...props} />,
  screens: {
    Home: {
      screen: HomeScreen,
      linking: {
        path: '',
      },
      options: {
        title: 'Home',
        headerShown: true,
      },
    },
    Profile: {
      screen: ProfileScreen,
      linking: {
        path: 'profile',
      },
      options: {
        title: 'Profile',
        headerShown: true,
      },
    },
    Settings: {
      screen: SettingsScreen,
      linking: {
        path: 'settings',
      },
      options: {
        title: 'Settings',
        headerShown: true,
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    MainDrawer: {
      screen: MainDrawer,
      linking: {
        path: '',
      },
      options: {
        headerShown: false,
      },
    },
    Login: {
      screen: LoginScreen,
      linking: {
        path: 'login',
      },
      options: {
        presentation: 'modal',
        title: 'Login',
      },
    },
    Register: {
      screen: RegisterScreen,
      linking: {
        path: 'register',
      },
      options: {
        presentation: 'modal',
        title: 'Register',
      },
    },
    EventDetails: {
      screen: EventDetailsScreen,
      linking: {
        path: 'event/:eventId',
      },
      options: {
        presentation: 'card',
        title: 'Event Details',
        headerShown: true,
      },
    },
    NotFound: {
      screen: NotFoundScreen,
      linking: {
        path: '*',
      },
      options: {
        title: 'Not Found',
      },
    },
  },
});

const RootNavigator = createStaticNavigation(RootStack);

export function Navigation(props: any) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return <RootNavigator {...props} theme={theme} />;
}

