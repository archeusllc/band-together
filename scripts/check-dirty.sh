#!/bin/bash

# Check if any submodules have uncommitted changes

echo "🔍 Checking submodule status..."
echo ""

# Get submodule status
SUBMODULE_STATUS=$(git submodule status)

# Check for dirty submodules
DIRTY=$(echo "$SUBMODULE_STATUS" | grep -E '^\+.*-dirty')

if [ -n "$DIRTY" ]; then
  echo "❌ Dirty submodules found:"
  echo ""
  echo "$DIRTY"
  echo ""
  exit 1
else
  echo "✅ All submodules are clean"
  exit 0
fi
