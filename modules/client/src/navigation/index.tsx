import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '@components/DrawerContent';
import { AppHeader } from '@components/AppHeader';
import {
  HomeScreen,
  ProfileScreen,
  SettingsScreen,
  LoginScreen,
  RegisterScreen,
  NotFoundScreen,
  EventDetailsScreen,
  // Acts
  ActsListScreen,
  ActDetailsScreen,
  CreateActScreen,
  EditActScreen,
  // Venues
  VenuesListScreen,
  VenueDetailsScreen,
  CreateVenueScreen,
  EditVenueScreen,
  // Clubs
  ClubsListScreen,
  ClubDetailsScreen,
  CreateClubScreen,
  EditClubScreen,
  // Tools
  SetlistManagerScreen,
  // Setlists
  SetlistDetailsScreen,
  CreateSetlistScreen,
} from '@screens';
import { SharedSetlist } from './screens/SharedSetlist';
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
        header: () => <AppHeader />,
      },
    },
    ActsList: {
      screen: ActsListScreen,
      linking: {
        path: 'acts',
      },
      options: {
        header: () => <AppHeader />,
      },
    },
    ActDetails: {
      screen: ActDetailsScreen,
      linking: {
        path: 'act/:actId',
      },
      options: {
        header: () => <AppHeader />,
        drawerItemStyle: { display: 'none' },
      },
    },
    CreateAct: {
      screen: CreateActScreen,
      linking: {
        path: 'act/create',
      },
      options: {
        header: () => <AppHeader />,
        drawerItemStyle: { display: 'none' },
      },
    },
    EditAct: {
      screen: EditActScreen,
      linking: {
        path: 'act/:actId/edit',
      },
      options: {
        header: () => <AppHeader />,
        drawerItemStyle: { display: 'none' },
      },
    },
    VenuesList: {
      screen: VenuesListScreen,
      linking: {
        path: 'venues',
      },
      options: {
        header: () => <AppHeader />,
      },
    },
    VenueDetails: {
      screen: VenueDetailsScreen,
      linking: {
        path: 'venue/:venueId',
      },
      options: {
        header: () => <AppHeader />,
        drawerItemStyle: { display: 'none' },
      },
    },
    CreateVenue: {
      screen: CreateVenueScreen,
      linking: {
        path: 'venue/create',
      },
      options: {
        header: () => <AppHeader />,
        drawerItemStyle: { display: 'none' },
      },
    },
    EditVenue: {
      screen: EditVenueScreen,
      linking: {
        path: 'venue/:venueId/edit',
      },
      options: {
        header: () => <AppHeader />,
        drawerItemStyle: { display: 'none' },
      },
    },
    ClubsList: {
      screen: ClubsListScreen,
      linking: {
        path: 'clubs',
      },
      options: {
        header: () => <AppHeader />,
      },
    },
    ClubDetails: {
      screen: ClubDetailsScreen,
      linking: {
        path: 'club/:clubId',
      },
      options: {
        header: () => <AppHeader />,
        drawerItemStyle: { display: 'none' },
      },
    },
    CreateClub: {
      screen: CreateClubScreen,
      linking: {
        path: 'club/create',
      },
      options: {
        header: () => <AppHeader />,
        drawerItemStyle: { display: 'none' },
      },
    },
    EditClub: {
      screen: EditClubScreen,
      linking: {
        path: 'club/:clubId/edit',
      },
      options: {
        header: () => <AppHeader />,
        drawerItemStyle: { display: 'none' },
      },
    },
    Profile: {
      screen: ProfileScreen,
      linking: {
        path: 'profile',
      },
      options: {
        header: () => <AppHeader />,
      },
    },
    Settings: {
      screen: SettingsScreen,
      linking: {
        path: 'settings',
      },
      options: {
        header: () => <AppHeader />,
      },
    },
    EventDetails: {
      screen: EventDetailsScreen,
      linking: {
        path: 'event/:eventId',
      },
      options: {
        header: () => <AppHeader />,
        drawerItemStyle: { display: 'none' },
      },
    },
    // Tools
    SetlistManager: {
      screen: SetlistManagerScreen,
      linking: {
        path: 'setlists',
      },
      options: {
        header: () => <AppHeader />,
      },
    },
    // Setlists
    SetlistDetails: {
      screen: SetlistDetailsScreen,
      linking: {
        path: 'setlist/:setlistId/:modalState?',
      },
      options: {
        header: () => <AppHeader />,
        drawerItemStyle: { display: 'none' },
      },
    },
    CreateSetlist: {
      screen: CreateSetlistScreen,
      linking: {
        path: 'setlist/create',
      },
      options: {
        header: () => <AppHeader />,
        drawerItemStyle: { display: 'none' },
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
        headerShown: false,
      },
    },
    Register: {
      screen: RegisterScreen,
      linking: {
        path: 'register',
      },
      options: {
        presentation: 'modal',
        headerShown: false,
      },
    },
    NotFound: {
      screen: NotFoundScreen,
      linking: {
        path: '*',
      },
      options: {
        headerShown: false,
      },
    },
    SharedSetlist: {
      screen: SharedSetlist,
      linking: {
        path: 'setlist/shared/:shareToken',
      },
      options: {
        title: 'Shared Setlist',
        presentation: 'modal',
      },
    },
  },
});

const RootNavigator = createStaticNavigation(RootStack);

export function Navigation(props: any) {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  // Apply dark class to root element on web for Tailwind dark mode
  useEffect(() => {
    if (Platform.OS === 'web') {
      const htmlElement = document.documentElement;
      if (colorScheme === 'dark') {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    }
  }, [colorScheme]);

  // Build linking prefixes dynamically for web to support localhost and local network URLs
  const getLinkingPrefixes = () => {
    const prefixes = ['bandtogethermobile://', 'bandtogether://'];

    // On web, include both the current host and the production domain
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.location) {
      const { protocol, host } = window.location;
      // Add current host prefix (e.g., http://localhost:3000, https://192.168.1.100:5173, etc.)
      prefixes.push(`${protocol}//${host}`);
    }

    // Always include Expo Hosting domain
    prefixes.push('https://band-together.expo.app');

    return prefixes;
  };

  return (
    <RootNavigator
      {...props}
      theme={theme}
      linking={{
        prefixes: getLinkingPrefixes(),
      }}
    />
  );
}

