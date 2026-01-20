export type RootStackParamList = {
  MainDrawer: { screen?: string };
  Login: undefined;
  Register: undefined;
  NotFound: undefined;
};

export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  EventDetails: { eventId: string };
};
