import { SharePermission } from './SharePermission';

export interface SetListShare {
  shareId: string;
  setListId: string;
  shareToken: string;
  permission: SharePermission;
  expiresAt: string | null;
  createdAt: string;
  createdBy: string;
}

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
