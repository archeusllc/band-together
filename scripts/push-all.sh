#!/bin/bash

# Push all submodules and parent repo, respecting configured branch per submodule

echo "📤 Pushing submodules..."
git submodule foreach '
  if [ -n "$(git status --porcelain)" ] || [ -n "$(git log @{u}.. 2>/dev/null)" ]; then
    BRANCH=$(git config --file $toplevel/.gitmodules submodule.$name.branch || echo main)
    echo "Pushing $name to $BRANCH..."
    git push origin $BRANCH || echo "⚠️  Failed to push $name"
  else
    echo "✓ $name - nothing to push"
  fi
'

echo ""
echo "📤 Pushing parent repository..."
if git push origin main; then
  echo "✅ All repositories pushed!"
else
  echo "⚠️  Failed to push parent repository"
  exit 1
fi
