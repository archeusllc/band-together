export enum FollowEntityType {
  USER = 'USER',
  TAG = 'TAG',
  GUILD = 'GUILD',
}

export interface Follow {
  followId: string;
  userId: string;
  entityType: FollowEntityType;
  followedUserId: string | null;
  tagId: string | null;
  guildId: string | null;
  createdAt: string;
}
