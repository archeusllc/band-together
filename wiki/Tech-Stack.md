# Tech Stack

## Client
- **Framework:** Expo 54 (React Native + Web)
- **Language:** TypeScript
- **Styling:** NativeWind (Tailwind CSS)
- **Runtime:** Bun

## Backend
- **Runtime:** Bun
- **Framework:** Elysia
- **ORM:** Prisma
- **Database:** PostgreSQL

## Firebase Services
- Authentication
- Cloud Messaging (push notifications)
- Storage (files, images, audio)

## Development
- **Local:** Docker (Postgres + API)
- **Deploy target:** Railway or Fly.io (when ready)

## Diagram

```mermaid
graph TB
    subgraph Client["Client (Expo)"]
        UI["React Native + NativeWind"]
        Web["Web (expo web)"]
        Mobile["iOS / Android"]
    end

    subgraph Firebase["Firebase Services"]
        Auth["Firebase Auth"]
        Storage["Firebase Storage"]
        FCM["Firebase Cloud Messaging"]
    end

    subgraph Backend["Backend (Docker - Local Dev)"]
        API["Bun / Elysia API"]
        Prisma["Prisma ORM"]
        DB[(PostgreSQL)]
    end

    UI --> Auth
    UI --> Storage
    UI --> FCM
    UI --> API
    API --> Prisma
    Prisma --> DB
    API -.->|"verify tokens"| Auth
```
