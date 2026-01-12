#!/bin/bash

# Commit all staged changes in submodules and parent repo with auto-generated or manual message

# Check if message flag is provided
if [ "$1" = "-m" ] && [ -n "$2" ]; then
  COMMIT_MSG="$2"
else
  # Auto-generate commit message based on staged changes
  echo "🔍 Analyzing staged changes..."
  
  # Get list of submodules with staged changes
  CHANGED_SUBMODULES=$(git submodule foreach --quiet "
    if [ -n \"\$(git diff --cached --name-only)\" ]; then
      echo \$name
    fi
  " 2>/dev/null)
  
  # Count changed files in parent repo
  PARENT_CHANGES=$(git diff --cached --name-only | wc -l | tr -d ' ')
  
  # Build commit message
  if [ -n "$CHANGED_SUBMODULES" ]; then
    SUBMODULE_LIST=$(echo "$CHANGED_SUBMODULES" | tr '\n' ',' | sed 's/,$//')
    COMMIT_MSG="Update submodules: $SUBMODULE_LIST"
    
    if [ "$PARENT_CHANGES" -gt 0 ]; then
      COMMIT_MSG="$COMMIT_MSG (parent: $PARENT_CHANGES files)"
    fi
  elif [ "$PARENT_CHANGES" -gt 0 ]; then
    COMMIT_MSG="Update Band Together ($PARENT_CHANGES files)"
  else
    echo "⚠️  No staged changes found"
    exit 0
  fi
fi

echo "💾 Committing with message: \"$COMMIT_MSG\""
echo ""

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
