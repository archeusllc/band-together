#!/bin/bash
# Complete project setup from fresh clone

set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
source "$SCRIPT_DIR/lib.sh"

require_bun
require_docker_running

echo "🎸 Band Together - Complete Setup"
echo "=================================="
echo ""

# Step 1: Initialize submodules
echo "📦 Step 1/7: Initializing git submodules..."
git submodule update --init --recursive
echo "✅ Submodules initialized"
echo ""

# Step 2: Checkout main branch in submodules
echo "🔀 Step 2/7: Checking out origin/main in submodules..."
git submodule foreach 'git checkout -b main --track origin/main || git checkout main'
echo "✅ Submodules on origin/main"
echo ""

# Step 3: Setup .env files
echo "🔧 Step 3/7: Setting up environment files..."
"$SCRIPT_DIR"/setup-env.sh
echo ""

# Step 4: Setup git hooks
echo "🪝 Step 4/7: Setting up git hooks..."
"$SCRIPT_DIR"/setup-hooks.sh
echo ""

# Step 5: Install dependencies
echo "📚 Step 5/7: Installing dependencies..."
make install
echo ""

# Step 6: Setup database
echo "🗄️  Step 6/7: Setting up database..."
"$SCRIPT_DIR"/setup-db.sh
echo ""

# Step 7: Verify setup
echo "✅ Step 7/7: Verifying setup..."
echo ""
echo "🎉 Setup complete!"
echo ""
echo "📱 Starting development environment..."
echo ""

# Run the dev script
exec "$SCRIPT_DIR"/dev.sh
