import 'dotenv/config';
import { PrismaClient as _PrismaClient, Prisma } from './generated/prisma-client/index.js';
import { PrismaPg } from '@prisma/adapter-pg'

const {
  DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/band_together'
} = process.env;

// Change the adapter depending on the db used - in this case, PostgreSQL
const adapter = new PrismaPg({
  connectionString: DATABASE_URL
});

export const PrismaClient = (options?: Prisma.PrismaClientOptions) => new _PrismaClient({
  adapter,
  ...options
});

// Export Prisma-generated types (always in sync with schema)
export type {
  User,
  Follow,
  Tag,
  Guild,
  Act,
  Venue,
  Club,
  Track,
  CalendarEvent,
  FeedActivity,
  GuildInvitation,
  SetList,
  SetItem,
  SetSection,
  SetListShare,
} from './generated/prisma-client/index.js';

// Export enums as values (not just types)
export {
  GuildType,
  GuildInvitationStatus,
  FollowEntityType,
  TrackType,
  SharePermission,
} from './generated/prisma-client/index.js';

// Export custom types and input DTOs
export * from './types/index';
export * from './generated/api-types/index';
