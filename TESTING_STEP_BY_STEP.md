# Step-by-Step Testing Guide

## Before You Start

Make sure:
- [ ] App is running on at least one platform (web, iOS, or Android)
- [ ] You can see the URL bar clearly (especially for web testing)
- [ ] You have access to test data (acts, venues, clubs, events, setlists)
- [ ] Keep this document open while testing

---

## PHASE 1: Drawer Navigation Tests (8 tests)

### Test 1.1: Home Screen
**Steps:**
1. Open the app (should load Home by default)
2. Look at the header - should show hamburger menu (☰), NOT back arrow

**Expected Results:**
- ✅ Screen shows home dashboard
- ✅ Header has hamburger menu (☰) on left
- ✅ URL shows `/` or blank

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

### Test 1.2: Acts List
**Steps:**
1. From Home, tap the hamburger menu (☰) to open drawer
2. Tap "Acts" in the drawer menu
3. Wait for Acts List to load

**Expected Results:**
- ✅ Acts List screen appears
- ✅ Header shows hamburger menu (☰)
- ✅ URL shows `/acts`

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

### Test 1.3: Venues List
**Steps:**
1. From current screen, tap hamburger menu (☰)
2. Tap "Venues" in the drawer menu
3. Wait for Venues List to load

**Expected Results:**
- ✅ Venues List screen appears
- ✅ Header shows hamburger menu (☰)
- ✅ URL shows `/venues`

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

### Test 1.4: Clubs List
**Steps:**
1. From current screen, tap hamburger menu (☰)
2. Tap "Clubs" in the drawer menu
3. Wait for Clubs List to load

**Expected Results:**
- ✅ Clubs List screen appears
- ✅ Header shows hamburger menu (☰)
- ✅ URL shows `/clubs`

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

### Test 1.5: Profile
**Steps:**
1. From current screen, tap hamburger menu (☰)
2. Tap "Profile" in the drawer menu
3. Wait for Profile to load

**Expected Results:**
- ✅ Profile screen appears
- ✅ Header shows hamburger menu (☰)
- ✅ URL shows `/profile`

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

### Test 1.6: Settings
**Steps:**
1. From current screen, tap hamburger menu (☰)
2. Tap "Settings" in the drawer menu
3. Wait for Settings to load

**Expected Results:**
- ✅ Settings screen appears
- ✅ Header shows hamburger menu (☰)
- ✅ URL shows `/settings`

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

### Test 1.7: Setlist Manager
**Steps:**
1. From current screen, tap hamburger menu (☰)
2. Tap "Setlist Manager" in the drawer menu
3. Wait for Setlist Manager to load

**Expected Results:**
- ✅ Setlist Manager screen appears
- ✅ Header shows hamburger menu (☰)
- ✅ URL shows `/setlists`

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

### Test 1.8: Guild Invitations
**Steps:**
1. From current screen, tap hamburger menu (☰)
2. Tap "Guild Invitations" in the drawer menu
3. Wait for Invitations to load

**Expected Results:**
- ✅ Guild Invitations screen appears
- ✅ Header shows hamburger menu (☰)
- ✅ URL shows `/invitations`

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

## PHASE 2: Act Navigation (Back Button Tests) - 3 tests

### Test 2.1: Create Act
**Steps:**
1. Go to Acts List (drawer → Acts)
2. Look for a "Create" button or "+" button
3. Tap it
4. Observe the header

**Expected Results:**
- ✅ Create Act form loads
- ✅ Header shows back arrow (←), NOT hamburger
- ✅ URL shows `/act/create`

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

### Test 2.2: Act Details & Back Button
**Steps:**
1. From Create Act screen, press the back arrow (←)
2. Should return to Acts List
3. Observe the header changed from back arrow to hamburger

**Expected Results:**
- ✅ Returns to Acts List
- ✅ Header shows hamburger (☰) again
- ✅ Back button works correctly (no crash)

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

### Test 2.3: Navigate to Act Details
**Steps:**
1. From Acts List, find and tap an Act card (or the first act)
2. Observe the header and URL

**Expected Results:**
- ✅ Act Details screen loads
- ✅ Header shows back arrow (←)
- ✅ URL shows `/act/{slug}` (e.g., `/act/my-band`)

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

## PHASE 3: Back Button Stack Test - 1 critical test

### Test 3.1: Navigation Stack (Acts → ActDetails → back → Acts → hamburger)
**Steps:**
1. You should be on Act Details from Test 2.3
2. Press the back arrow (←) in header
3. Should return to Acts List with hamburger menu
4. Verify you can open the drawer and navigate again

**Expected Results:**
- ✅ Pressing back returns to Acts List
- ✅ Header changes from back arrow to hamburger
- ✅ Hamburger menu opens/closes correctly
- ✅ Navigation stack is working

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

## PHASE 4: Venue Navigation (Similar pattern) - 1 quick test

### Test 4.1: Venues → Create Venue → Back → Venues
**Steps:**
1. Go to Venues List (drawer → Venues)
2. Tap create button (should show back arrow)
3. Verify URL is `/venue/create`
4. Press back arrow
5. Should return to Venues List with hamburger menu

**Expected Results:**
- ✅ Create Venue screen shows back arrow (←)
- ✅ URL is `/venue/create`
- ✅ Back button returns to Venues List
- ✅ Hamburger menu is back

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

## PHASE 5: Club Navigation (Similar pattern) - 1 quick test

### Test 5.1: Clubs → Create Club → Back → Clubs
**Steps:**
1. Go to Clubs List (drawer → Clubs)
2. Tap create button (should show back arrow)
3. Verify URL is `/club/create`
4. Press back arrow
5. Should return to Clubs List with hamburger menu

**Expected Results:**
- ✅ Create Club screen shows back arrow (←)
- ✅ URL is `/club/create`
- ✅ Back button returns to Clubs List
- ✅ Hamburger menu is back

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

## PHASE 6: Event Navigation (SLUG-BASED) - 3 tests

### Test 6.1: Load Event by Slug
**Steps:**
1. You should have at least one event with a slug
2. Navigate to an act/venue/club that has events
3. Look for an Events section or button
4. Tap on an event
5. Observe the URL and header

**Expected Results:**
- ✅ Event Details screen loads
- ✅ Header shows back arrow (←)
- ✅ URL shows `/event/{slug}` (e.g., `/event/friday-jam`)
- ✅ No query strings (no `?param=value`)

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

### Test 6.2: Edit Event (if available)
**Steps:**
1. From Event Details (Test 6.1)
2. Look for an Edit button
3. Tap it

**Expected Results:**
- ✅ Edit Event form loads
- ✅ Header shows back arrow (←)
- ✅ URL shows `/event/{slug}/edit`

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

### Test 6.3: Event Navigation Stack
**Steps:**
1. From Event Details, press back arrow
2. Should return to previous screen (Events List or guild details)
3. Verify hamburger menu is back

**Expected Results:**
- ✅ Back button works correctly
- ✅ Returns to previous screen
- ✅ Navigation stack is working

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

## PHASE 7: Guild Events List - 1 test

### Test 7.1: Guild Events
**Steps:**
1. From an act/venue/club details screen, look for Events section
2. Tap to navigate to guild events list
3. Observe URL and header

**Expected Results:**
- ✅ Guild Events List loads
- ✅ Header shows back arrow (←)
- ✅ URL shows `/guild/{slug}/events` (e.g., `/guild/my-band/events`)

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

## PHASE 8: Setlist Navigation (SLUG-BASED) - 2 tests

### Test 8.1: Create Setlist
**Steps:**
1. Go to Setlist Manager (drawer → Setlist Manager)
2. Tap create button
3. Observe header and URL

**Expected Results:**
- ✅ Create Setlist form loads
- ✅ Header shows back arrow (←)
- ✅ URL shows `/setlist/create`

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

### Test 8.2: Setlist Details by Slug
**Steps:**
1. From Setlist Manager, find and tap a setlist
2. Observe the header and URL

**Expected Results:**
- ✅ Setlist Details loads
- ✅ Header shows back arrow (←)
- ✅ URL shows `/setlist/{slug}` (e.g., `/setlist/my-awesome-setlist`)
- ✅ No query strings

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

## PHASE 9: Guild Members - 1 test

### Test 9.1: Guild Members Navigation
**Steps:**
1. Go to an act/venue/club details screen
2. Look for Members section or button
3. Tap it
4. Observe URL and header

**Expected Results:**
- ✅ Guild Members screen loads
- ✅ Header shows back arrow (←)
- ✅ URL shows `/guild/{slug}/members` (e.g., `/guild/my-band/members`)
- ✅ No guildType in URL (simplified from old pattern)

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

## PHASE 10: Critical Checks - 3 tests

### Test 10.1: No Query Strings Anywhere
**Steps:**
1. Throughout all tests above, watch the URL bar
2. Look for any `?param=value` patterns
3. Check especially during navigation between screens

**Expected Results:**
- ✅ No query strings appear anywhere
- ✅ All URLs use path parameters only (slugs)
- ✅ URL patterns like `/event/friday-jam` not `/event?slug=friday-jam`

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

### Test 10.2: Deep Links Work
**Steps (Web only):**
1. In browser address bar, type a complete URL like: `http://localhost:5173/event/friday-jam`
2. Press Enter
3. Observe if the correct screen loads

**Expected Results:**
- ✅ Event Details screen loads directly
- ✅ No NotFound page
- ✅ Event data is fetched and displayed

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

### Test 10.3: Back Button Never Gets Stuck
**Steps:**
1. Navigate through multiple screens (5+ screens)
2. Press back repeatedly
3. Continue until you're back at the drawer level

**Expected Results:**
- ✅ Each back press returns to previous screen
- ✅ No screens are skipped
- ✅ Eventually reach hamburger menu
- ✅ No crashes or freezes

**Result:** [ ] PASS [ ] FAIL
**Notes:** _________________

---

## Summary

Total Tests: 26
- Drawer Navigation: 8
- Act Navigation: 3
- Back Button Stack: 1
- Venue Navigation: 1
- Club Navigation: 1
- Event Navigation: 3
- Guild Events: 1
- Setlist Navigation: 2
- Guild Members: 1
- Critical Checks: 3

**Please test these in order and report your results!**

