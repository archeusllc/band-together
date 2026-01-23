// All controllers have been moved to their respective route subdirectories
// Re-export from their co-located locations for backwards compatibility
export { authController } from '@routes/auth/auth.controller';
export { feedController } from '@routes/feed/feed.controller';
export { followsController } from '@routes/follows/follows.controller';
export { eventsController } from '@routes/events/events.controller';
export { guildsController } from '@routes/guilds/guilds.controller';
export { tracksController } from '@routes/tracks/tracks.controller';
export { setlistController } from '@routes/setlists/setlists.controller';
