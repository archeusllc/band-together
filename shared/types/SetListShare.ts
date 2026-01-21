// Base SetListShare type and SharePermission enum are exported from Prisma-generated types
// Custom DTOs and extended types below

import type { SetListShare, SharePermission } from '../generated/prisma-client/index.js';

export type { SetListShare, SharePermission };

export interface CreateSetListShareInput {
  permission: SharePermission;
  expiresAt?: Date;
}

export interface SetListShareWithDetails extends SetListShare {
  creator: {
    userId: string;
    displayName: string | null;
  };
}
