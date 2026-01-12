#!/bin/bash

# Sync all changes: stage, commit, and push in one go

# Check if message flag is provided
if [ "$1" = "-m" ] && [ -n "$2" ]; then
  COMMIT_MSG="-m"
  COMMIT_ARG="$2"
else
  COMMIT_MSG=""
  COMMIT_ARG=""
fi

echo "🔄 Band Together Sync: Stage → Commit → Push"
echo ""

# Stage all changes
echo "📝 Step 1: Staging changes..."
./scripts/stage-all.sh
if [ $? -ne 0 ]; then
  echo "❌ Staging failed"
  exit 1
fi

echo ""

# Commit all changes
echo "💾 Step 2: Committing changes..."
if [ -n "$COMMIT_MSG" ]; then
  ./scripts/commit-all.sh "$COMMIT_MSG" "$COMMIT_ARG"
else
  ./scripts/commit-all.sh
fi
if [ $? -ne 0 ]; then
  echo "❌ Committing failed"
  exit 1
fi

echo ""

# Push all changes
echo "📤 Step 3: Pushing changes..."
./scripts/push-all.sh
if [ $? -ne 0 ]; then
  echo "❌ Pushing failed"
  exit 1
fi

echo ""
echo "🎉 Sync complete!"
