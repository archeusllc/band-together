#!/bin/bash
# Setup .env files from .env.example

set -e

echo "🔧 Setting up .env files..."

# Root .env for docker compose
if [ ! -f .env ]; then
  if [ -f .env.example ]; then
    cp .env.example .env
    echo "✅ Created .env from .env.example"
  else
    echo "⚠️  No .env.example found in root"
  fi
else
  echo "ℹ️  .env already exists in root"
fi

# Shared .env
if [ ! -f shared/.env ]; then
  if [ -f shared/.env.example ]; then
    cp shared/.env.example shared/.env
    echo "✅ Created shared/.env from shared/.env.example"
  else
    echo "⚠️  No .env.example found in shared/"
  fi
else
  echo "ℹ️  shared/.env already exists"
fi

# DB .env
if [ ! -f db/.env ]; then
  if [ -f db/.env.example ]; then
    cp db/.env.example db/.env
    echo "✅ Created db/.env from db/.env.example"
  else
    echo "⚠️  No .env.example found in db/"
  fi
else
  echo "ℹ️  db/.env already exists"
fi

# API .env
if [ ! -f api/.env ]; then
  if [ -f api/.env.example ]; then
    cp api/.env.example api/.env
    echo "✅ Created api/.env from api/.env.example"
  else
    echo "⚠️  No .env.example found in api/"
  fi
else
  echo "ℹ️  api/.env already exists"
fi

echo "✅ Environment setup complete!"
