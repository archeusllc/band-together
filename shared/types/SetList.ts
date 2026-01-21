import { SharePermission } from './SharePermission';
import { SetItem } from './SetItem';
import { SetSection } from './SetSection';

export interface SetList {
  setListId: string;
  name: string;
  description: string | null;
  ownerId: string;
  guildId: string | null;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

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
