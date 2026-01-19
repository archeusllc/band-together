export interface Venue {
  venueId: string;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}
