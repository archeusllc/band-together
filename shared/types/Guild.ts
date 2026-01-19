export enum GuildType {
  ACT = 'ACT',
  VENUE = 'VENUE',
  CLUB = 'CLUB',
}

export interface Guild {
  guildId: string;
  name: string;
  guildType: GuildType;
  createdAt: string;
  currentOwnerId: string;
}
