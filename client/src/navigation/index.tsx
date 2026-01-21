import { useColorScheme } from 'react-native';
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
        path: 'tools/setlists',
      },
      options: {
        header: () => <AppHeader />,
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
  },
});

const RootNavigator = createStaticNavigation(RootStack);

export function Navigation(props: any) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return <RootNavigator {...props} theme={theme} />;
}

