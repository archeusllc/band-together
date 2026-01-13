#!/bin/bash
# Complete project setup from fresh clone

set -e

echo "🎸 Band Together - Complete Setup"
echo "=================================="
echo ""

# Step 1: Initialize submodules
echo "📦 Step 1/6: Initializing git submodules..."
git submodule update --init --recursive
echo "✅ Submodules initialized"
echo ""

# Step 2: Checkout main branch in submodules
echo "🔀 Step 2/6: Checking out origin/main in submodules..."
git submodule foreach 'git checkout -b main --track origin/main || git checkout main'
echo "✅ Submodules on origin/main"
echo ""

# Step 3: Setup .env files
echo "🔧 Step 3/6: Setting up environment files..."
./scripts/setup-env.sh
echo ""

# Step 4: Install dependencies
echo "📚 Step 4/6: Installing dependencies..."
make install
echo ""

# Step 5: Setup database
echo "🗄️  Step 5/6: Setting up database..."
./scripts/setup-db.sh
echo ""

# Step 6: Verify setup
echo "✅ Step 6/6: Verifying setup..."
echo ""
echo "🎉 Setup complete!"
echo ""
echo "📱 Starting development environment..."
echo ""

# Run the dev script
exec ./scripts/dev.sh
