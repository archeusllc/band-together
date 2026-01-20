# Guild CRUD Screens - Implementation Template

## Completed Screens
✅ ActsList - List screen template
✅ ActDetails - Details screen template
✅ CreateAct - Create screen template
✅ EditAct - Edit screen template
✅ VenuesList - List screen (mirrors ActsList pattern)
✅ ClubsList - List screen (mirrors ActsList pattern)

## Remaining Screens to Create

### Quick Duplication Pattern

All remaining screens follow these simple replacements from their Act counterparts:

#### For Venues Details & Create & Edit:
```
File names: s/Act/Venue/g
Navigation: s/ActDetails/VenueDetails/g, s/CreateAct/CreateVenue/g, s/EditAct/EditVenue/g
Service calls: s/getActById/getVenueById/g, s/createAct/createVenue/g, s/updateAct/updateVenue/g, s/deleteAct/deleteVenue/g
Parameters: s/actId/venueId/g
Form type: guildType="VENUE"
Icon: "building.2" (instead of "music.note")
Emoji in list: 🏢
Fields in form: address, city, state, zipCode (instead of bio)
Details display: Show venue.address, venue.city, venue.state, venue.zipCode

#### For Clubs Details & Create & Edit:
```
File names: s/Act/Club/g
Navigation: s/ActDetails/ClubDetails/g, s/CreateAct/CreateClub/g, s/EditAct/EditClub/g
Service calls: s/getActById/getClubById/g, s/createAct/createClub/g, s/updateAct/updateClub/g, s/deleteAct/deleteClub/g
Parameters: s/actId/clubId/g
Form type: guildType="CLUB"
Icon: "person.3.fill" (instead of "music.note")
Emoji in list: 👥
Fields in form: description (instead of bio)
Details display: Show club.description

## File Mapping

### Venues Screens to Create:
- `client/src/navigation/screens/VenueDetails.tsx` - Copy ActDetails.tsx and apply changes
- `client/src/navigation/screens/CreateVenue.tsx` - Copy CreateAct.tsx and apply changes
- `client/src/navigation/screens/EditVenue.tsx` - Copy EditAct.tsx and apply changes

### Clubs Screens to Create:
- `client/src/navigation/screens/ClubDetails.tsx` - Copy ActDetails.tsx and apply changes
- `client/src/navigation/screens/CreateClub.tsx` - Copy CreateAct.tsx and apply changes
- `client/src/navigation/screens/EditClub.tsx` - Copy EditAct.tsx and apply changes

## Next Steps After Creating Screens

1. **Update Navigation Integration:**
   - Edit `client/src/components/DrawerContent.tsx` - Add menu items for Venues/Clubs
   - Register all 12 screens in main drawer navigator

2. **Export Screens:**
   - Update `client/src/navigation/screens/index.ts` - Export all 12 screens

3. **Testing:**
   - Verify API endpoints work with Postman/Swagger
   - Test complete user flow for each guild type
   - Test authorization (edit/delete permission checks)

## Key Field Differences by Guild Type

### ACT
- Form field: `bio` (multiline, 500 chars)
- Display: Act bio in details
- Icon: music.note
- Color: Blue (#3B82F6)

### VENUE
- Form fields: `address`, `city`, `state`, `zipCode`
- Display: Full address in details with location icon
- Icon: building.2
- Color: Green (#10B981)

### CLUB
- Form field: `description` (multiline, 1000 chars)
- Display: Club description in details
- Icon: person.3.fill
- Color: Amber (#F59E0B)
