// Base SetList type is exported from Prisma-generated types
// Custom DTOs and extended types below

import type { SetList, SharePermission } from '../generated/prisma-client/index.js';
import { SetItem } from './SetItem';
import { SetSection } from './SetSection';

export type { SetList };

export interface CreateSetListInput {
  name: string;
  description?: string;
  guildId?: string;
}

export interface UpdateSetListInput {
  name?: string;
  description?: string | null;
}

export interface SetListWithDetails extends SetList {
  owner?: {
    userId: string;
    displayName: string | null;
    avatar: string | null;
  };
  guild?: {
    guildId: string;
    name: string;
    guildType: string;
  };
  setItems?: SetItem[];
  setSections?: SetSection[];
}
