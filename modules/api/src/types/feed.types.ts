import { CalendarEvent, Follow, FollowEntityType } from '@archeusllc/types';

export interface GetFeedQuery {
  page?: number;
  limit?: number;
}

export interface GetEventsQuery {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  venueId?: string;
  actId?: string;
}

export interface CreateFollowBody {
  entityType: FollowEntityType;
  followedUserId?: string;
  tagId?: string;
  guildId?: string;
}

export interface FeedResponse {
  events: CalendarEvent[];
  total: number;
  page: number;
  limit: number;
}

export interface FollowsResponse {
  follows: Follow[];
  total: number;
}
