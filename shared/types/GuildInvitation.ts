export enum GuildInvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export interface GuildInvitation {
  invitationId: string;
  guildId: string;
  invitedUserId: string;
  invitedById: string | null;
  status: GuildInvitationStatus;
  createdAt: string;
  respondedAt: string | null;
}
