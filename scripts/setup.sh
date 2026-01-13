#!/bin/bash
# Complete project setup from fresh clone

set -e

echo "🎸 Band Together - Complete Setup"
echo "=================================="
echo ""

# Step 1: Initialize submodules
echo "📦 Step 1/5: Initializing git submodules..."
git submodule update --init --recursive
echo "✅ Submodules initialized"
echo ""

# Step 2: Setup .env files
echo "🔧 Step 2/5: Setting up environment files..."
./scripts/setup-env.sh
echo ""

# Step 3: Install dependencies
echo "📚 Step 3/5: Installing dependencies..."
make install
echo ""

# Step 4: Setup database
echo "🗄️  Step 4/5: Setting up database..."
./scripts/setup-db.sh
echo ""

# Step 5: Verify setup
echo "✅ Step 5/5: Verifying setup..."
echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Start the API server:  cd api && bun run dev"
echo "  2. Test the API:          curl http://localhost:3000/health"
echo "  3. View database:         http://localhost:8080 (Adminer)"
echo ""
echo "Available commands:"
echo "  make help                 Show all available commands"
echo "  make sync-all             Stage, commit, and push all changes"
echo "  docker compose down       Stop the database"
echo ""
