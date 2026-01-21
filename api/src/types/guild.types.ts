import { Guild, Act, Venue, Club, User } from '@band-together/shared';

// Query types
export interface GetGuildsQuery {
  page?: number;
  limit?: number;
  search?: string;
}

// Request body types
export interface CreateActBody {
  name: string;
  bio?: string;
  avatar?: string;
}

export interface CreateVenueBody {
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  avatar?: string;
}

export interface CreateClubBody {
  name: string;
  description?: string;
  avatar?: string;
}

export interface UpdateActBody {
  name?: string;
  bio?: string;
  avatar?: string;
}

export interface UpdateVenueBody {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  avatar?: string;
}

export interface UpdateClubBody {
  name?: string;
  description?: string;
  avatar?: string;
}

// Response types
export interface GuildResponse extends Guild {
  currentOwner?: Pick<User, 'userId' | 'displayName' | 'avatar'>;
  members?: Pick<User, 'userId' | 'displayName' | 'avatar'>[];
  act: Act | null;
  venue: Venue | null;
  club: Club | null;
}

export interface GuildsListResponse {
  guilds: GuildResponse[];
  total: number;
  page: number;
  limit: number;
}
