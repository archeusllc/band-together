#!/bin/bash

# Commit all staged changes in submodules and parent repo with a message

# Check if message flag is provided
if [ "$1" != "-m" ] || [ -z "$2" ]; then
  echo "❌ Error: Commit message required"
  echo "Usage: ./scripts/commit-all.sh -m \"commit message\""
  exit 1
fi

COMMIT_MSG="$2"

echo "💾 Committing changes in submodules..."
git submodule foreach "
  if [ -n \"\$(git diff --cached --name-only)\" ]; then
    echo \"Committing \$name...\"
    git commit -m \"$COMMIT_MSG\" || echo \"⚠️  Failed to commit \$name\"
  else
    echo \"✓ \$name - no staged changes to commit\"
  fi
"

echo ""
echo "💾 Committing changes in parent repository..."
if [ -n "$(git diff --cached --name-only)" ]; then
  git commit -m "$COMMIT_MSG"
  echo "✅ All commits complete!"
else
  echo "✓ Parent repo - no staged changes to commit"
  echo "✅ Done!"
fi
