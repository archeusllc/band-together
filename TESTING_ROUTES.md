# Navigation Route Testing Plan

## Overview
This document lists all user-facing paths in the Band Together app, organized by category. Test these paths manually to verify the new slug-based navigation works correctly.

---

## Test Scenarios

### Prerequisites
- [ ] App is running on all platforms you want to test (iOS, Android, Web)
- [ ] You have test data in the database (acts, venues, clubs, events, setlists)
- [ ] You can manually navigate and test back button behavior

---

## DRAWER NAVIGATION (Main Menu Items)

These are the primary entry points from the drawer menu. Back button should show hamburger menu, not back arrow.

| Route | URL Path | Expected Behavior |
|-------|----------|-------------------|
| Home | `/` | Dashboard, no back button, hamburger menu visible |
| Acts List | `/acts` | List of acts, no back button, hamburger menu visible |
| Venues List | `/venues` | List of venues, no back button, hamburger menu visible |
| Clubs List | `/clubs` | List of clubs, no back button, hamburger menu visible |
| Profile | `/profile` | User profile, no back button, hamburger menu visible |
| Settings | `/settings` | Settings page, no back button, hamburger menu visible |
| Setlist Manager | `/setlists` | User's setlists, no back button, hamburger menu visible |
| Guild Invitations | `/invitations` | Pending invitations, no back button, hamburger menu visible |

### How to Test
1. Open app, verify each drawer item loads
2. Verify hamburger menu (☰) is visible in top-left
3. Tap hamburger to toggle drawer open/closed
4. Tap another drawer item, verify transition works

---

## ACT NAVIGATION (Guild Type: Act)

### List & Create
| Route | URL Path | Expected Behavior |
|-------|----------|-------------------|
| Acts List | `/acts` | List all acts |
| Create Act | `/act/create` | Form to create new act, back arrow visible |

### Details & Management
Test with an actual act slug (replace `my-band` with real slug):

| Route | URL Path | Expected Behavior |
|-------|----------|-------------------|
| Act Details | `/act/my-band` | Act profile, back arrow visible, shows edit/delete if owner |
| Edit Act | `/act/my-band/edit` | Edit form, back arrow visible |

### How to Test
1. Go to Acts List from drawer
2. Tap create button → should navigate to `/act/create` with back arrow
3. Create an act or find existing one with slug (e.g., "my-band")
4. Tap on an act card → should navigate to `/act/my-band`
5. Press back button → should return to Acts List
6. Tap edit button → should navigate to `/act/my-band/edit`
7. Press back button → should return to Act Details
8. Press back button → should return to Acts List

---

## VENUE NAVIGATION (Guild Type: Venue)

### List & Create
| Route | URL Path | Expected Behavior |
|-------|----------|-------------------|
| Venues List | `/venues` | List all venues |
| Create Venue | `/venue/create` | Form to create new venue, back arrow visible |

### Details & Management
Test with an actual venue slug (replace `the-tavern` with real slug):

| Route | URL Path | Expected Behavior |
|-------|----------|-------------------|
| Venue Details | `/venue/the-tavern` | Venue profile, back arrow visible, shows edit/delete if owner |
| Edit Venue | `/venue/the-tavern/edit` | Edit form, back arrow visible |

### How to Test
1. Go to Venues List from drawer
2. Tap create button → should navigate to `/venue/create` with back arrow
3. Find existing venue or create one with slug (e.g., "the-tavern")
4. Tap on a venue card → should navigate to `/venue/the-tavern`
5. Press back button → should return to Venues List
6. Tap edit button → should navigate to `/venue/the-tavern/edit`
7. Press back button → should return to Venue Details
8. Press back button → should return to Venues List

---

## CLUB NAVIGATION (Guild Type: Club)

### List & Create
| Route | URL Path | Expected Behavior |
|-------|----------|-------------------|
| Clubs List | `/clubs` | List all clubs |
| Create Club | `/club/create` | Form to create new club, back arrow visible |

### Details & Management
Test with an actual club slug (replace `music-collective` with real slug):

| Route | URL Path | Expected Behavior |
|-------|----------|-------------------|
| Club Details | `/club/music-collective` | Club profile, back arrow visible, shows edit/delete if owner |
| Edit Club | `/club/music-collective/edit` | Edit form, back arrow visible |

### How to Test
1. Go to Clubs List from drawer
2. Tap create button → should navigate to `/club/create` with back arrow
3. Find existing club or create one with slug (e.g., "music-collective")
4. Tap on a club card → should navigate to `/club/music-collective`
5. Press back button → should return to Clubs List
6. Tap edit button → should navigate to `/club/music-collective/edit`
7. Press back button → should return to Club Details
8. Press back button → should return to Clubs List

---

## EVENT NAVIGATION (Now Using Slugs!)

**KEY CHANGE:** Events now use slug-based URLs instead of IDs. Example slug: `friday-jam-session`

### Details
Test with an actual event slug (replace `friday-jam-session` with real slug):

| Route | URL Path | Expected Behavior |
|-------|----------|-------------------|
| Event Details | `/event/friday-jam-session` | Event profile, back arrow visible |
| Edit Event | `/event/friday-jam-session/edit` | Edit form, back arrow visible |

### Guild Event Management
Test with guild slug (e.g., `my-band`) and event slug (e.g., `friday-jam`):

| Route | URL Path | Expected Behavior |
|-------|----------|-------------------|
| Guild Events List | `/guild/my-band/events` | List of events for guild, back arrow visible |
| Create Guild Event | `/guild/my-band/events/create` | Create event form, back arrow visible |
| Guild Event Details | `/event/friday-jam/details` | Event details, back arrow visible, shows edit/delete if owner |
| Edit Guild Event | `/event/friday-jam/edit` | Edit event form, back arrow visible |

### How to Test
1. Find an event with a slug (or create one)
2. Navigate to `/event/friday-jam-session` directly
3. Verify back arrow is visible, hamburger menu is NOT visible
4. Tap back → should return to previous screen or list
5. Go to an act/venue/club that has events
6. Find "Events" section or button → should navigate to `/guild/my-band/events`
7. Tap create button → should navigate to `/guild/my-band/events/create`
8. Create/find an event, tap on it → should navigate to `/event/friday-jam/details`
9. Press back button → should return to events list
10. Tap edit button → should navigate to `/event/friday-jam/edit`
11. Press back button → should return to event details
12. Press back button → should return to events list

---

## SETLIST NAVIGATION (Now Using Slugs!)

**KEY CHANGE:** Setlists now use slug-based URLs instead of IDs. Example slug: `my-awesome-setlist`

### Management
Test with an actual setlist slug (replace `my-awesome-setlist` with real slug):

| Route | URL Path | Expected Behavior |
|-------|----------|-------------------|
| Setlist Manager | `/setlists` | List of user's setlists, no back button (drawer item) |
| Create Setlist | `/setlist/create` | Create setlist form, back arrow visible |
| Setlist Details | `/setlist/my-awesome-setlist` | Setlist view, back arrow visible, shows edit/delete if owner |
| Shared Setlist (Public) | `/setlist/shared/abc123token` | Read-only setlist view, no auth required, modal presentation |

### How to Test
1. Go to Setlist Manager from drawer
2. Tap create button → should navigate to `/setlist/create` with back arrow
3. Create a setlist or find existing one with slug (e.g., "my-awesome-setlist")
4. Tap on a setlist → should navigate to `/setlist/my-awesome-setlist`
5. Verify back arrow is visible, back button returns to Setlist Manager
6. Look for edit option → should navigate to `/setlist/my-awesome-setlist/edit` (if implemented)
7. Test share URL → should navigate to `/setlist/shared/abc123token` with modal presentation

---

## GUILD MANAGEMENT NAVIGATION

**KEY CHANGE:** Removed `guildType(act|venue|club)` from URLs. Now just use `guild/:guildSlug`

### Guild Details
Test with actual guild slug (replace `my-band` with real slug):

| Route | URL Path | Expected Behavior |
|-------|----------|-------------------|
| Guild Members | `/guild/my-band/members` | Member list, back arrow visible, shows invite button if owner |
| Guild Invitations | `/invitations` | Pending invites, no back button (drawer item) |

### How to Test
1. Navigate to an act/venue/club details page
2. Find members section → should navigate to `/guild/my-band/members`
3. Verify back arrow visible
4. Press back → should return to guild details
5. Find invite button → should show invite modal or navigate to invite screen
6. Go to Guild Invitations from drawer → should load pending guild invites

---

## BACK BUTTON BEHAVIOR (Critical Tests)

### Test 1: Navigation Stack (Push/Pop)
```
Home (drawer) → Acts List (drawer) → Act Details → back → Acts List → back → Home
```
Expected: Each press of back should return to previous screen, eventually to drawer navigation.

### Test 2: Deep Link Entry
```
Paste `/event/friday-jam` directly in URL bar (web) or use deep link
```
Expected: Should load event details with back button. Pressing back doesn't have previous screen history, so behavior depends on implementation.

### Test 3: Cross-Drawer Navigation
```
Home (drawer) → Acts List → Act Details → open drawer → Venues List → Venue Details → back → Venues List
```
Expected: Back button works within ContentStack, not affected by drawer changes.

### Test 4: Modal Behavior
```
Shared Setlist URL: `/setlist/shared/abc123token`
```
Expected: Should open as modal overlay, not push to stack.

---

## NO QUERY STRINGS VERIFICATION

Check the URL bar on web for these anti-patterns. None should appear:

| ❌ Old Pattern | ✅ New Pattern |
|---|---|
| `/event/xyz?id=123` | `/event/friday-jam` |
| `/guild/abc?guildType=act` | `/guild/my-band` |
| `/setlist/def?shareToken=token` | `/setlist/shared/token` |
| `/guild/xyz/members?guildId=123` | `/guild/my-band/members` |

---

## Platform-Specific Tests

### Web (Browser)
- [ ] Test typing URLs directly in address bar
- [ ] Test browser back button
- [ ] Test deep links from different domains
- [ ] Verify no query strings appear

### iOS (Simulator or Device)
- [ ] Test gesture swipe-back (right edge swipe)
- [ ] Test back button in header
- [ ] Test drawer hamburger menu
- [ ] Test deep links from Safari/Mail

### Android (Simulator or Device)
- [ ] Test hardware back button
- [ ] Test back button in header
- [ ] Test drawer hamburger menu
- [ ] Test deep links from apps

---

## Success Criteria

✅ All tests pass if:
1. **Back button works correctly** - Returns to previous screen in ContentStack
2. **No query strings** - URL bar only shows path params (slugs)
3. **All slugs resolve** - Navigating to `/event/slug` loads that event
4. **Drawer works** - Drawer items show hamburger, detail screens show back arrow
5. **Deep links work** - Can paste URLs directly and app loads correct screen
6. **Modal overlays work** - Shared setlist opens as modal, not push
7. **Cross-platform** - All tests pass on web, iOS, and Android

---

## Test Data Needed

Before testing, ensure you have in database:
- [ ] At least 2 acts with slugs (e.g., "my-band", "rock-group")
- [ ] At least 2 venues with slugs (e.g., "the-tavern", "jazz-club")
- [ ] At least 2 clubs with slugs (e.g., "music-collective", "jam-session-crew")
- [ ] At least 2 events with slugs (e.g., "friday-jam", "saturday-show")
- [ ] At least 1 setlist with slug (e.g., "my-awesome-setlist")
- [ ] At least 1 guild invitation pending

---

## Debugging Tips

If a route doesn't work:

1. **Check the URL** - Is the slug correct? Use the actual slug from the app.
2. **Check the API** - Does the `/events/slug/:slug` endpoint exist and return data?
3. **Check the navigation** - Is the route defined in `navigation/index.tsx`?
4. **Check the types** - Does the route have a matching param type in `navigation/types.ts`?
5. **Check the screen** - Is the screen component trying to fetch the slug correctly?

### Common Issues

**Problem:** Back button doesn't work
- **Cause:** Screen not in ContentStack
- **Fix:** Add screen to ContentStack in `navigation/index.tsx`

**Problem:** Can't load event by slug
- **Cause:** API endpoint missing or slug not in database
- **Fix:** Ensure `/events/slug/:slug` endpoint exists and event has a slug

**Problem:** Query strings appearing in URL
- **Cause:** Route using `?param=value` instead of path params
- **Fix:** Check navigation.navigate calls to use params object, not query string

**Problem:** Back button shows hamburger instead of arrow
- **Cause:** Screen using wrong header component
- **Fix:** Ensure screen has `header: () => <AppHeader showBack />` in options

---

## Next Steps After Testing

Once all tests pass:
1. Create issues for any failing routes
2. Document which platforms have issues (web/iOS/Android)
3. Update this document with results
4. Consider adding automated navigation tests

