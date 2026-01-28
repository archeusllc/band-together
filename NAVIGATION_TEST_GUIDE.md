# Navigation Testing Guide

## New URL Structure

### Main Pages (Drawer Menu)
- `/` - Home
- `/acts` - Acts List
- `/venues` - Venues List
- `/clubs` - Clubs List
- `/profile` - User Profile
- `/settings` - Settings
- `/setlists` - Setlist Manager
- `/invitations` - Guild Invitations

### Guild Pages (All types use `/g/`)
- `/g/:guildSlug` - Guild Detail (Act/Venue/Club - auto-detected)
- `/g/create` - Create Guild
- `/g/:guildSlug/edit` - Edit Guild
- `/g/:guildSlug/members` - Guild Members
- `/g/:guildSlug/events` - Guild Events List
- `/g/:guildSlug/events/create` - Create Event

### Event Pages
- `/e/:eventSlug` - Event Detail
- `/e/:eventSlug/edit` - Edit Event
- `/e/:eventSlug/details` - Event Details

### Setlist Pages
- `/s/:setlistSlug` - Setlist Detail
- `/s/create` - Create Setlist
- `/setlist/shared/:shareToken` - Shared Setlist (modal)

### Auth & Modals
- `/login` - Login (modal)
- `/register` - Register (modal)
- `*` - Not Found

## Test Cases

### Navigation Flow Tests
1. **Home → Acts → Act Detail → Back → Acts**
   - Expected: Back button returns to Acts, not Home
   - URL path: `/acts` → `/g/the-midnight` → `/acts`

2. **Hamburger Menu**
   - Expected: Menu visible on all screens
   - Expected: Clicking items navigates correctly and closes menu
   - Expected: Back button works after menu navigation

3. **Deep Links**
   - Test: `http://localhost:8081/g/my-band`
   - Expected: Loads Act/Venue/Club detail screen
   - Test: `http://localhost:8081/e/friday-jam`
   - Expected: Loads Event detail screen

4. **Guild Type Detection**
   - Acts should show act-specific content at `/g/band-name`
   - Venues should show venue-specific content at `/g/venue-name`
   - Clubs should show club-specific content at `/g/club-name`

### URL Validation Checklist
- [ ] No duplicate route patterns (each screen defined once)
- [ ] All URLs use slugs (no IDs in paths)
- [ ] No query strings in any URLs
- [ ] Hamburger menu visible on every screen
- [ ] Back button works correctly through stack history
- [ ] Deep links load correct screens

## Architecture
- **Single RootStack**: All screens at same level
- **No nested navigators**: Eliminates conflicts
- **Modal drawer**: Presentational overlay, not a navigator
- **Type-safe**: Full TypeScript support
- **Slug-based**: All routes use slug parameters

## Known Limitations
- Drawer doesn't slide (uses fade animation) - UX trade-off for reliable navigation
- Can be enhanced with custom slide animation later

## Next Steps
1. Test on web, iOS, and Android
2. Verify deep linking works
3. Test back button across all flows
4. Confirm hamburger menu accessibility
