#!/bin/bash
# Setup database: generate Prisma client and run migrations

set -e

echo "🗄️  Setting up database..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker and try again."
  exit 1
fi

# Check if PostgreSQL container is running
if ! docker ps | grep -q bandtogether-postgres; then
  echo "⚠️  PostgreSQL container is not running."
  echo "   Starting Docker Compose..."
  docker compose up -d
  echo "   Waiting for PostgreSQL to be ready..."
  sleep 5
fi

# Generate Prisma client (also copies to shared)
echo "📦 Generating Prisma client..."
cd db && bunx --bun bun run generate && cd ..

# Run migrations
echo "📋 Running database migrations..."
cd db && bunx --bun prisma migrate deploy && cd ..

echo "✅ Database setup complete!"
echo "   You can view the database at http://localhost:8080 (Adminer)"
