#!/bin/bash

# Sync all changes: stage, commit, and push in one go
# Handles submodule reference updates in parent repo

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

# Commit submodules first
echo "💾 Step 2: Committing submodule changes..."
git submodule foreach "
  if [ -n \"\$(git diff --cached --name-only)\" ]; then
    echo \"Committing \$name...\"
    if [ -n \"$COMMIT_MSG\" ]; then
      git commit -m \"$COMMIT_ARG\" || echo \"⚠️  Failed to commit \$name\"
    else
      git commit --allow-empty-message -m \"\" || echo \"⚠️  Failed to commit \$name\"
    fi
  else
    echo \"✓ \$name - no staged changes to commit\"
  fi
"
if [ $? -ne 0 ]; then
  echo "⚠️  Warning: Some submodule commits failed"
fi

echo ""

# Re-stage parent repo to capture updated submodule references
echo "📝 Step 3: Re-staging parent repo (to capture submodule ref updates)..."
if [ -n "$(git diff --name-only)" ]; then
  git add .
fi

# Commit parent repo
echo "💾 Step 4: Committing parent repo..."
if [ -n "$(git diff --cached --name-only)" ]; then
  if [ -n "$COMMIT_MSG" ]; then
    git commit -m "$COMMIT_ARG"
  else
    git commit -m "Update submodule references"
  fi
  if [ $? -ne 0 ]; then
    echo "❌ Parent repo commit failed"
    exit 1
  fi
else
  echo "✓ Parent repo - no changes to commit"
fi

echo ""

# Push all changes
echo "📤 Step 5: Pushing changes..."
./scripts/push-all.sh
if [ $? -ne 0 ]; then
  echo "❌ Pushing failed"
  exit 1
fi

echo ""
echo "🎉 Sync complete!"
