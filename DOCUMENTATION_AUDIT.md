# Documentation Review & Cleanup Notes

Date: January 13, 2026

## Summary

Reviewed all documentation files (README.md files across all modules, DEVELOPMENT.md, CLAUDE.md, and wiki pages) for consistency with actual project structure and implementation status.

## Issues Found & Fixed

### 1. **Client README.md** - Contains unimplemented feature descriptions
**File:** `/Users/blee/band-together/client/README.md`

**Issue:** The README lists feature descriptions that appear to be aspirational rather than documenting implemented features:
- "View upcoming gigs / Add gig details (venue, time, pay rate) / Attach setlists to gigs" 
- "Create and join bands / Manage member roles (admin/member) / Band profile with image and description"

**Status:** These may be partially implemented but are not documented as such. Should verify implementation status in the actual client code before documenting.

**Action Needed:**
- [ ] Check if these features are actually implemented in the Expo client
- [ ] If implemented: Add technical details to wiki Client-Architecture.md
- [ ] If not implemented: Remove from README, add to GitHub issues/Projects board as features to implement

### 2. **API README.md** - Contains comprehensive API endpoint documentation
**File:** `/Users/blee/band-together/api/README.md`

**Issue:** Extensive API endpoint documentation exists (Auth, Bands, Setlists, Rehearsals, Gigs, Songs) with detailed request/response patterns shown.

**Status:** This documentation suggests all these endpoints are implemented. Need to verify against actual API code.

**Action Needed:**
- [ ] Verify all listed endpoints exist and are functional in bt-api repo
- [ ] Move comprehensive endpoint documentation to wiki API-Architecture.md
- [ ] Simplify README to just quick start
- [ ] Create GitHub issues for any endpoints that are documented but not implemented

### 3. **DB README.md** - Shows sample Prisma models
**File:** `/Users/blee/band-together/db/README.md`

**Issue:** Contains sample Prisma model code snippets that may not match the actual schema:
- Shows `BandMember` with `role: String`
- Shows `Setlist` with `title` field
- Shows `Rehearsal` with `title`, `startTime`, `endTime`, `location`
- Shows `Gig` with `title`, `startTime`, `endTime`, `venue`, `address`, `payRate`

**Status:** Verified schema.prisma - these models actually exist and fields match! ✅ No changes needed here.

### 4. **Features.md (Wiki)** - Mentions Phase 2 and Phase 3 features
**File:** `/Users/blee/band-together/wiki/Features.md`

**Issue:** Describes future phases (2 and 3) which are not MVP. Currently accurate - clearly marks as future phases.

**Status:** OK - properly labeled as future work ✅

### 5. **Roadmap.md (Wiki)** - Unchecked checkboxes for Phase 2 and 3
**File:** `/Users/blee/band-together/wiki/Roadmap.md`

**Issue:** Shows Phase 2 and 3 features with unchecked boxes, which is appropriate for roadmap.

**Status:** OK - properly indicates unstarted work ✅

### 6. **Client README.md** - Duplicate "Documentation" section
**File:** `/Users/blee/band-together/client/README.md`

**Issue:** Has two separate "Documentation" sections:
1. Line ~32: "See the [wiki](...) for detailed architecture..."
2. Line ~55: "Full project documentation: [Band Together Wiki](...)"

Also has duplicate "Future Phases" and "Related Repositories" sections.

**Status:** Redundant content - should be cleaned up.

**Action:** Remove duplicate sections, keep only the first documentation link.

### 7. **API README.md** - Duplicate sections and content
**File:** `/Users/blee/band-together/api/README.md`

**Issue:** Has "Future Phases" section and duplicate documentation links at the end.

**Status:** Redundant - should consolidate.

**Action:** Remove duplicate documentation references and consolidate related repos.

### 8. **DB README.md** - Future schema changes documented
**File:** `/Users/blee/band-together/db/README.md`

**Issue:** Contains section "Future Schema Changes" describing Phase 2 and 3 models that don't exist yet.

**Status:** OK as context - but could be moved to wiki for cleaner README.

**Action:** Consider moving "Future Schema Changes" to wiki, keep README minimal.

### 9. **DEVELOPMENT.md** - Accurate but could reference more wiki content
**File:** `/Users/blee/band-together/DEVELOPMENT.md`

**Issue:** None found - this file is well-structured and minimal. ✅

### 10. **CLAUDE.md** - Recently updated, appears consistent
**File:** `/Users/blee/band-together/CLAUDE.md`

**Issue:** None found - recent update made this consistent. ✅

### 11. **Client README.md** - "Development" section with type-check command
**File:** `/Users/blee/band-together/client/README.md`

**Issue:** Mentions `bun run type-check` command which may or may not be implemented.

**Status:** Needs verification.

**Action:**
- [ ] Verify if type-check script exists in bt-client package.json
- [ ] If exists: OK
- [ ] If not: Remove from README

---

## Recommendations

### HIGH PRIORITY - Remove immediately from submodule READMEs:

1. **client/README.md** - Remove:
   - Duplicate "Documentation" section (keep first one)
   - "Future Phases" section (this is in Features wiki)
   - "Related Repositories" section (move to end if kept)

2. **api/README.md** - Remove:
   - "Future Phases" section (move to wiki Features page if needed)
   - Duplicate documentation reference at end
   - "Related Repositories" section (move to end if kept)

3. **db/README.md** - Consider:
   - Moving "Future Schema Changes" to wiki Database-Schema.md
   - Keep README focused on immediate development needs

### MEDIUM PRIORITY - Verify implementation:

1. **Verify API endpoints** - Check bt-api repo to confirm all documented endpoints exist
2. **Verify client features** - Check bt-client repo to confirm Gig/Band management UIs exist
3. **Verify type-check commands** - Confirm `bun run type-check` exists in bt-client and bt-api

### LOW PRIORITY - Documentation improvements:

1. Add comprehensive endpoint documentation to wiki API-Architecture.md
2. Move client feature details to wiki Client-Architecture.md
3. Consolidate "Related Repositories" sections into footer of each README (or remove if redundant)

---

## Items to Create as GitHub Issues/Tasks:

If not yet implemented, create issues for:

- [ ] Client: Gig calendar management UI
- [ ] Client: Band member role management UI
- [ ] API: Verify all Gig endpoints working
- [ ] API: Verify all Band endpoints working
- [ ] API: Verify all Setlist endpoints working
- [ ] API: Verify all Rehearsal endpoints working
- [ ] API: Verify all Song endpoints working
- [ ] API: Verify all Auth endpoints working
- [ ] Build: Verify type-check scripts exist and work
- [ ] Build: Verify build scripts exist and work for all packages

---

## Files Already Audited & Approved:

✅ README.md (main) - Minimal, accurate, good
✅ DEVELOPMENT.md - Well-structured, minimal
✅ CLAUDE.md - Recently updated, consistent
✅ shared/README.md - Minimal, accurate
✅ Features.md (wiki) - Properly categorized
✅ Roadmap.md (wiki) - Proper use of checkboxes
✅ Tech-Stack.md (wiki) - Accurate
✅ Repo-Structure.md (wiki) - Accurate
✅ Client-Architecture.md (wiki) - Accurate
✅ API-Architecture.md (wiki) - Accurate
✅ Database-Schema.md (wiki) - Accurate
✅ Development-Workflows.md (wiki) - Accurate
✅ Branch-Configuration.md (wiki) - Accurate
✅ Home.md (wiki) - Accurate, good organization

---

## Files Needing Cleanup:

⚠️ **High Priority:**
- client/README.md - Remove duplicates, consolidate sections
- api/README.md - Remove duplicates, consolidate sections
- db/README.md - Consider moving future schema to wiki

---

## Action Items Summary:

1. **Cleanup submodule READMEs** (remove duplicate sections)
2. **Verify API endpoints** in bt-api repository
3. **Verify client features** in bt-client repository
4. **Create GitHub issues** for unimplemented features
5. **Update wiki** with detailed API endpoint documentation
