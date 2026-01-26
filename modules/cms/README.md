# Band Together CMS (Content Management System)

A standalone content management system for managing the Band Together track database. This includes a JWT-authenticated REST API and a React frontend dashboard for content curation.

## Architecture

The CMS app is organized into two main modules:

- **`modules/api-cms/`** - Elysia backend with JWT authentication
- **`modules/cms/`** - React frontend with Vite

Both share a PostgreSQL database with the main Band Together application.

## Quick Start

### Prerequisites

- Node.js 18+ (or Bun 1.3+)
- PostgreSQL 14+
- Bun package manager

### Setup

1. **Install dependencies**:
   ```bash
   cd modules/api-cms && bun install
   cd ../cms && bun install
   ```

2. **Configure environment variables**:

   Create `modules/api-cms/.env.development`:
   ```bash
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/band_together"
   JWT_SECRET="your-super-secret-key-here"
   JWT_EXPIRES_IN="7d"
   SPOTIFY_CLIENT_ID="your-spotify-client-id"
   SPOTIFY_CLIENT_SECRET="your-spotify-client-secret"
   ADMIN_CLIENT_URL="http://localhost:5173"
   ```

   Create `modules/cms/.env`:
   ```bash
   VITE_API_URL="http://localhost:3001"
   ```

3. **Start the services**:

   Terminal 1 - API server:
   ```bash
   cd modules/api-cms
   bun start
   # API runs on http://localhost:3001
   ```

   Terminal 2 - React dev server:
   ```bash
   cd modules/cms
   bun start
   # Client runs on http://localhost:5173
   ```

4. **Access the admin panel**:
   - Open http://localhost:5173 in your browser
   - Log in with: `admin@bandtogether.dev` / `ChangeMeInProduction123!`

## Features

### Track Management
- Create, read, update, delete tracks
- Soft delete with restore capability
- Search and filter by title, artist, type
- Filter by active/inactive status
- Manage track tags and genres
- View track metadata (duration, tuning)

### Tag Management
- Create and delete tags
- Organize tags by category
- View tag usage counts
- Quick tag assignment to tracks

### Bulk Import
- **CSV Upload** - Import from spreadsheet files
  - Download CSV template for consistency
  - Validation with detailed error reporting
  - Support for optional fields (duration, tuning)
- **JSON Upload** - Import from structured JSON files
- **Spotify Integration** - Search and import directly from Spotify
  - Search millions of tracks from Spotify catalog
  - Auto-populate metadata (artist, duration)
  - Batch import with checkboxes

### Dashboard
- Quick access to all features
- Intuitive navigation
- Admin user authentication with logout

## API Endpoints

All endpoints require JWT authentication via `Authorization: Bearer <token>` header.

### Authentication
- `POST /auth/login` - Login with email/password
- `GET /auth/me` - Get current admin user
- `POST /auth/logout` - Logout (optional, use client-side clear)

### Tracks
- `GET /tracks` - List all tracks (filters: q, type, active, limit, offset)
- `POST /tracks` - Create new track
- `GET /tracks/:trackId` - Get single track with details
- `PATCH /tracks/:trackId` - Update track metadata
- `DELETE /tracks/:trackId` - Soft delete (set isActive=false)
- `PATCH /tracks/:trackId/restore` - Restore deleted track
- `POST /tracks/:trackId/tags/:tagId` - Add tag to track
- `DELETE /tracks/:trackId/tags/:tagId` - Remove tag from track

### Tags
- `GET /tags` - List all tags (optionally grouped by category)
- `POST /tags` - Create new tag
- `DELETE /tags/:tagId` - Delete tag
- `GET /tags/categories/list` - Get distinct tag categories

### Import
- `GET /import/csv-template` - Download CSV template with examples
- `POST /import/csv` - Bulk import from CSV file
- `POST /import/json` - Bulk import from JSON file
- Returns: success count, failure count, and detailed error list

### Spotify
- `GET /spotify/search` - Search Spotify catalog (query, limit)
- `POST /spotify/import` - Import selected tracks from search results

## Creating/Managing Admin Users

### Initial Admin User

The database comes with a default admin user:

- **Email**: `admin@bandtogether.dev`
- **Password**: `ChangeMeInProduction123!`

Change this password immediately in production!

### Add New Admin User

1. Connect to PostgreSQL:
   ```bash
   psql "postgresql://postgres:postgres@localhost:5432/band_together"
   ```

2. Generate a bcrypt hash for your password:
   ```bash
   node -e "import('bcrypt').then(b => b.hash('YourPassword123!', 10)).then(console.log)"
   ```

3. Insert the new admin user:
   ```sql
   INSERT INTO "AdminUser" (email, "passwordHash", "displayName", "isActive")
   VALUES ('newadmin@example.com', '$2b$10$...', 'New Admin', true);
   ```

## File Structure

```
modules/
├── api-cms/
│   ├── src/
│   │   ├── index.ts                    # Main Elysia app entry point
│   │   ├── config/
│   │   │   └── jwt.config.ts           # JWT secret and expiration config
│   │   ├── middleware/
│   │   │   └── jwt.middleware.ts       # JWT verification and auth gate
│   │   ├── routes/
│   │   │   ├── auth/                   # Authentication endpoints
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── tracks/                 # Track management endpoints
│   │   │   │   ├── tracks.routes.ts
│   │   │   │   ├── tracks.controller.ts
│   │   │   │   ├── tracks.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── tags/                   # Tag management endpoints
│   │   │   │   ├── tags.routes.ts
│   │   │   │   ├── tags.controller.ts
│   │   │   │   ├── tags.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── import/                 # Bulk import endpoints
│   │   │   │   ├── import.routes.ts
│   │   │   │   ├── import.controller.ts
│   │   │   │   └── index.ts
│   │   │   └── spotify/                # Spotify integration endpoints
│   │   │       ├── spotify.routes.ts
│   │   │       ├── spotify.controller.ts
│   │   │       └── index.ts
│   │   ├── services/
│   │   │   ├── import.service.ts       # CSV/JSON parsing and validation
│   │   │   └── spotify.service.ts      # Spotify API client
│   │   ├── generated/
│   │   │   └── prisma-client/          # Auto-generated Prisma types
│   │   └── test/
│   │       └── fixtures/               # Sample CSV and JSON files
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── cms/
│   ├── src/
│   │   ├── App.tsx                     # Route definitions and layout
│   │   ├── main.tsx                    # React entry point
│   │   ├── index.css                   # Global styles
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx         # Authentication state management
│   │   ├── components/
│   │   │   ├── ProtectedRoute.tsx      # Route protection wrapper
│   │   │   ├── Layout.tsx              # Navigation bar and app shell
│   │   │   └── Layout.css
│   │   └── pages/
│   │       ├── Login.tsx               # Login form page
│   │       ├── Login.css
│   │       ├── Dashboard.tsx           # Overview with feature cards
│   │       ├── Tracks.tsx              # Track CRUD interface
│   │       ├── Tags.tsx                # Tag management interface
│   │       └── Import.tsx              # Bulk import with tabs
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   └── .env
│
└── README.md                            # This file
```

## Development Workflow

### Running Tests

API tests:
```bash
cd modules/api-cms
bun test
```

### Building for Production

API:
```bash
cd modules/api-cms
bun run build
```

Client:
```bash
cd modules/cms
bun run build
# Output in modules/cms/dist/
```

### Database Migrations

After schema changes in `modules/db/prisma/schema.prisma`:

```bash
cd modules/db
bun push
bun generate

# Reinstall Prisma client in api
cd ../api && bun install
```

## Bulk Import Formats

### CSV Format

Download the template from the admin panel or use this structure:

```csv
title,artist,type,duration,tuning
"Purple Haze","Jimi Hendrix","SONG","189",""
"Smoke on the Water","Deep Purple","SONG","312",""
"Backing Track 1","Various","BACKING_TRACK","240","E"
"Jazz Standard","Miles Davis","INSTRUMENTAL","180","C"
"Demo Version","Test Artist","DEMO","150","D"
```

**Columns:**
- `title` - Track name (required)
- `artist` - Artist name (required)
- `type` - One of: SONG, BACKING_TRACK, INSTRUMENTAL, DEMO (required)
- `duration` - Length in seconds (optional)
- `tuning` - Tuning info like "E", "Drop D" (optional)

### JSON Format

```json
[
  {
    "title": "Purple Haze",
    "artist": "Jimi Hendrix",
    "type": "SONG",
    "duration": 189,
    "tuning": ""
  },
  {
    "title": "Backing Track 1",
    "artist": "Various",
    "type": "BACKING_TRACK",
    "duration": 240,
    "tuning": "E"
  }
]
```

## Environment Variables

### Admin API (.env.development)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | PostgreSQL connection | `postgresql://user:pass@localhost:5432/band_together` |
| `JWT_SECRET` | Yes | Secret for signing JWT tokens | `your-64-char-random-string` |
| `JWT_EXPIRES_IN` | Yes | Token expiration | `7d` |
| `SPOTIFY_CLIENT_ID` | Yes | From Spotify Developer Dashboard | `abc123def456` |
| `SPOTIFY_CLIENT_SECRET` | Yes | From Spotify Developer Dashboard | `xyz789abc123` |
| `ADMIN_CLIENT_URL` | No | CORS origin for client | `http://localhost:5173` |

### Admin Client (.env)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_URL` | Yes | Admin API base URL | `http://localhost:3001` |

## Security Considerations

1. **JWT Secret**: Use a strong random string (minimum 32 characters)
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Password Security**:
   - All admin passwords are hashed with bcrypt (10 salt rounds)
   - Change default password immediately in production
   - Require strong passwords for new admin users

3. **CORS Configuration**:
   - Configure only trusted client origins
   - Update `ADMIN_CLIENT_URL` for production domain

4. **Database Access**:
   - Use strong PostgreSQL password
   - Restrict database access to admin app server only
   - Enable SSL for remote connections

5. **API Security**:
   - All endpoints require valid JWT token
   - Consider implementing rate limiting for production
   - Monitor for suspicious login attempts

6. **HTTPS in Production**:
   - Deploy behind HTTPS reverse proxy (Nginx, Apache)
   - Use valid SSL certificate
   - Implement HSTS headers

## Troubleshooting

### API won't start
```bash
# Check database connection
psql $DATABASE_URL

# Reinstall dependencies
bun install

# Check for PORT 3001 in use
lsof -i :3001
```

### Login fails
- Verify admin user exists in database
- Check JWT_SECRET is set correctly
- Verify DATABASE_URL is correct
- Check bcrypt hash is valid

### Spotify search not working
- Verify SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET are set
- Check Spotify credentials in Developer Dashboard
- Ensure client credentials OAuth flow is enabled

### Imports fail with validation errors
- Download and use the CSV template
- Verify all required fields are present
- Check that track type is valid (SONG, BACKING_TRACK, INSTRUMENTAL, DEMO)
- Duration should be in seconds as number

### Client can't reach API
- Verify API is running on port 3001
- Check VITE_API_URL in client .env
- Verify CORS is enabled (ADMIN_CLIENT_URL in API .env)
- Check browser console for CORS errors

## Next Steps / Future Enhancements

- [ ] Admin user role-based access control (RBAC)
- [ ] Rate limiting on API endpoints
- [ ] Audit logging for all admin actions
- [ ] Batch operations for bulk updates
- [ ] Advanced search with Elasticsearch
- [ ] Export track data to CSV/JSON
- [ ] Spotify playlist import (import entire playlists)
- [ ] Track validation before import
- [ ] Admin dashboard with import statistics
- [ ] API key authentication for programmatic access

## License

Same as Band Together main project
