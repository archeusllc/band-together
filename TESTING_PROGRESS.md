# Navigation Testing Progress

## Testing Status: In Progress

Started: 2026-01-28

---

## Category 1: Drawer Navigation (Main Menu Items)

These should show hamburger menu (☰), no back arrow.

| # | Route | URL | Status | Notes |
|---|-------|-----|--------|-------|
| 1.1 | Home | `/` | ⏳ PENDING | Should load dashboard |
| 1.2 | Acts List | `/acts` | ⏳ PENDING | Should load acts list |
| 1.3 | Venues List | `/venues` | ⏳ PENDING | Should load venues list |
| 1.4 | Clubs List | `/clubs` | ⏳ PENDING | Should load clubs list |
| 1.5 | Profile | `/profile` | ⏳ PENDING | Should load user profile |
| 1.6 | Settings | `/settings` | ⏳ PENDING | Should load settings |
| 1.7 | Setlist Manager | `/setlists` | ⏳ PENDING | Should load user's setlists |
| 1.8 | Guild Invitations | `/invitations` | ⏳ PENDING | Should load pending invites |

---

## Category 2: Act Navigation

These should show back arrow (←) in header.

| # | Route | URL | Status | Notes |
|---|-------|-----|--------|-------|
| 2.1 | Create Act | `/act/create` | ⏳ PENDING | Form with back button |
| 2.2 | Act Details | `/act/{slug}` | ⏳ PENDING | Example: `/act/my-band` |
| 2.3 | Edit Act | `/act/{slug}/edit` | ⏳ PENDING | Example: `/act/my-band/edit` |

**Test Sequence:**
1. Go to Acts List (drawer)
2. Tap create button → verify `/act/create` loads
3. Create act or navigate to existing `/act/my-band`
4. Press back button → should return to Acts List
5. Verify hamburger menu is back (not back arrow)

---

## Category 3: Venue Navigation

These should show back arrow (←) in header.

| # | Route | URL | Status | Notes |
|---|-------|-----|--------|-------|
| 3.1 | Create Venue | `/venue/create` | ⏳ PENDING | Form with back button |
| 3.2 | Venue Details | `/venue/{slug}` | ⏳ PENDING | Example: `/venue/the-tavern` |
| 3.3 | Edit Venue | `/venue/{slug}/edit` | ⏳ PENDING | Example: `/venue/the-tavern/edit` |

**Test Sequence:**
1. Go to Venues List (drawer)
2. Tap create button → verify `/venue/create` loads
3. Create venue or navigate to existing `/venue/the-tavern`
4. Press back button → should return to Venues List

---

## Category 4: Club Navigation

These should show back arrow (←) in header.

| # | Route | URL | Status | Notes |
|---|-------|-----|--------|-------|
| 4.1 | Create Club | `/club/create` | ⏳ PENDING | Form with back button |
| 4.2 | Club Details | `/club/{slug}` | ⏳ PENDING | Example: `/club/music-collective` |
| 4.3 | Edit Club | `/club/{slug}/edit` | ⏳ PENDING | Example: `/club/music-collective/edit` |

**Test Sequence:**
1. Go to Clubs List (drawer)
2. Tap create button → verify `/club/create` loads
3. Create club or navigate to existing `/club/music-collective`
4. Press back button → should return to Clubs List

---

## Category 5: Event Navigation (SLUG-BASED)

These should show back arrow (←) in header.

| # | Route | URL | Status | Notes |
|---|-------|-----|--------|-------|
| 5.1 | Event Details | `/event/{eventSlug}` | ⏳ PENDING | Example: `/event/friday-jam` |
| 5.2 | Edit Event | `/event/{eventSlug}/edit` | ⏳ PENDING | Example: `/event/friday-jam/edit` |
| 5.3 | Guild Events List | `/guild/{guildSlug}/events` | ⏳ PENDING | Example: `/guild/my-band/events` |
| 5.4 | Create Guild Event | `/guild/{guildSlug}/events/create` | ⏳ PENDING | Example: `/guild/my-band/events/create` |
| 5.5 | Guild Event Details | `/event/{eventSlug}/details` | ⏳ PENDING | Example: `/event/friday-jam/details` |

**Test Sequence:**
1. Find an event with slug or create one
2. Navigate to `/event/friday-jam`
3. Verify back arrow visible
4. If event has guild, check Edit button → `/event/friday-jam/edit`
5. Go back and check guild events: `/guild/my-band/events`
6. Tap create event → `/guild/my-band/events/create`

---

## Category 6: Setlist Navigation (SLUG-BASED)

These should show back arrow (←) in header.

| # | Route | URL | Status | Notes |
|---|-------|-----|--------|-------|
| 6.1 | Create Setlist | `/setlist/create` | ⏳ PENDING | Form with back button |
| 6.2 | Setlist Details | `/setlist/{setlistSlug}` | ⏳ PENDING | Example: `/setlist/my-awesome-setlist` |
| 6.3 | Shared Setlist | `/setlist/shared/{token}` | ⏳ PENDING | Example: `/setlist/shared/abc123` |

**Test Sequence:**
1. Go to Setlist Manager (drawer)
2. Tap create button → verify `/setlist/create` loads
3. Create setlist or navigate to existing `/setlist/my-awesome-setlist`
4. Press back button → should return to Setlist Manager
5. Test sharing: `/setlist/shared/token` should open as modal

---

## Category 7: Guild Management Navigation

These should show back arrow (←) in header.

| # | Route | URL | Status | Notes |
|---|-------|-----|--------|-------|
| 7.1 | Guild Members | `/guild/{guildSlug}/members` | ⏳ PENDING | Example: `/guild/my-band/members` |

**Test Sequence:**
1. Navigate to a guild (act/venue/club)
2. Find members section → should navigate to `/guild/my-band/members`
3. Verify back arrow visible
4. Press back → should return to guild details

---

## Critical Tests

| # | Test | Status | Notes |
|---|------|--------|-------|
| C1 | No query strings in URL | ⏳ PENDING | Watch URL bar for `?param=value` patterns |
| C2 | Back button returns to previous screen | ⏳ PENDING | Test in ContentStack navigation |
| C3 | Hamburger menu shows on drawer items | ⏳ PENDING | Verify not replaced by back arrow |
| C4 | Deep links work | ⏳ PENDING | Paste URLs directly in browser |
| C5 | Slugs resolve correctly | ⏳ PENDING | Events/setlists load by slug |
| C6 | Modal overlays work | ⏳ PENDING | Shared setlist should open as modal |

---

## Test Results Summary

- Total tests: 30+
- Passed: 0
- Failed: 0
- Pending: 30+

---

## Instructions

For each test:
1. **Load the screen** - Use drawer navigation, button taps, or paste URL
2. **Observe the header** - Check for hamburger (☰) or back arrow (←)
3. **Check the URL** - Verify it matches expected path, no query strings
4. **Test back button** - Press back, verify it returns to previous screen
5. **Report result** - Update status to ✅ PASS or ❌ FAIL with notes

