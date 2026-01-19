#!/bin/bash

# Pre-commit hook to prevent committing dirty submodules

echo "🔍 Checking submodule status..."

# Check if any submodules are dirty
DIRTY_SUBMODULES=$(git submodule status | grep -E '^\+.*-dirty')

if [ -n "$DIRTY_SUBMODULES" ]; then
  echo ""
  echo "❌ ERROR: Cannot commit - submodules have uncommitted changes:"
  echo ""
  echo "$DIRTY_SUBMODULES"
  echo ""
  echo "Please commit changes in dirty submodules first:"
  echo "  1. cd into the submodule directory"
  echo "  2. git add . && git commit -m 'your message'"
  echo "  3. git push origin main"
  echo ""
  echo "Or use: bun stage-all && bun commit-all -m 'message' && bun push-all"
  exit 1
fi

echo "✅ All submodules clean"
exit 0
