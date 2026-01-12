#!/bin/bash

# Stage all changes in submodules and parent repo

echo "📝 Staging changes in submodules..."
git submodule foreach '
  if [ -n "$(git status --porcelain)" ]; then
    echo "Staging $name..."
    git add .
  else
    echo "✓ $name - no changes to stage"
  fi
'

echo ""
echo "📝 Staging changes in parent repository..."
if [ -n "$(git status --porcelain)" ]; then
  git add .
  echo "✅ All changes staged!"
else
  echo "✓ Parent repo - no changes to stage"
  echo "✅ Done!"
fi
