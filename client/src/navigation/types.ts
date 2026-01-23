export type RootStackParamList = {
  MainDrawer: { screen?: string };
  Login: undefined;
  Register: undefined;
  NotFound: undefined;
  SharedSetlist: { shareToken: string };
};

export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  EventDetails: { eventId: string };
  // Acts
  ActsList: undefined;
  ActDetails: { actId: string };
  CreateAct: undefined;
  EditAct: { actId: string };
  // Venues
  VenuesList: undefined;
  VenueDetails: { venueId: string };
  CreateVenue: undefined;
  EditVenue: { venueId: string };
  // Clubs
  ClubsList: undefined;
  ClubDetails: { clubId: string };
  CreateClub: undefined;
  EditClub: { clubId: string };
  // Tools
  SetlistManager: undefined;
  // Setlists
  SetlistDetails: { setlistId: string; modalState?: string };
  CreateSetlist: undefined;
};
