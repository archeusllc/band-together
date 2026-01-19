export interface CalendarEvent {
  eventId: string;
  title: string | null;
  description: string | null;
  poster: string | null;
  startTime: string;
  duration: number;
  venueId: string;
  createdAt: string;
  updatedAt: string;
}
