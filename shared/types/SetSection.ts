// Base SetSection type is exported from Prisma-generated types
// Custom DTOs and extended types below

import type { SetSection } from '../generated/prisma-client/index.js';

export type { SetSection };

export interface CreateSetSectionInput {
  name: string;
  position: number;
  breakDuration?: number;
}

export interface UpdateSetSectionInput {
  name?: string;
  position?: number;
  breakDuration?: number;
}
