#!/bin/bash

# Verify that all submodules are properly initialized
# Exits with error if any submodule is missing or uninitialized

set -e

SUBMODULES=("client" "api" "db" "shared" "wiki")
MISSING_SUBMODULES=()

echo "🔍 Verifying submodules..."

for submodule in "${SUBMODULES[@]}"; do
  # Check if submodule exists and has git content
  # .git can be either a directory or a file (worktree setup)
  if [ ! -e "$submodule/.git" ]; then
    MISSING_SUBMODULES+=("$submodule")
  fi
done

if [ ${#MISSING_SUBMODULES[@]} -gt 0 ]; then
  echo ""
  echo "❌ ERROR: The following submodules are not initialized:"
  for submodule in "${MISSING_SUBMODULES[@]}"; do
    echo "   • $submodule"
  done
  echo ""
  echo "This usually happens when you clone without the --recurse-submodules flag."
  echo ""
  echo "To fix this, run:"
  echo "  git submodule update --init --recursive"
  echo ""
  echo "Then try again:"
  echo "  make install"
  echo ""
  exit 1
fi

echo "✅ All submodules are properly initialized!"
