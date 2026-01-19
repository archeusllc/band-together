#!/bin/bash

# Connect to PostgreSQL database via Docker

CONTAINER_NAME="bandtogether-postgres"

# Check if container is running
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo "⚠️  PostgreSQL container is not running"
  echo ""
  read -p "Would you like to start it? [Y/n] " -n 1 -r
  echo ""
  
  if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
    echo "🚀 Starting Docker containers..."
    cd "$(dirname "$0")/.." && docker compose up -d
    
    if [ $? -eq 0 ]; then
      echo "✅ Containers started successfully!"
      echo "⏳ Waiting for database to be ready..."
      sleep 3
    else
      echo "❌ Failed to start containers"
      exit 1
    fi
  else
    echo "❌ Cannot connect without running container"
    exit 1
  fi
fi

echo "🔌 Connecting to PostgreSQL database..."
docker exec -it "$CONTAINER_NAME" psql -U postgres -d band_together
