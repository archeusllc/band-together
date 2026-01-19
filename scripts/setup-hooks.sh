#!/bin/bash

# Script to set up git hooks for band-together project
# Run this after cloning the repository

HOOKS_DIR=".git/hooks"
SCRIPTS_DIR="scripts"

echo "📦 Setting up git hooks for Band Together..."

# Copy pre-commit hook
if [ -f "$SCRIPTS_DIR/pre-commit-hook.sh" ]; then
  cp "$SCRIPTS_DIR/pre-commit-hook.sh" "$HOOKS_DIR/pre-commit"
  chmod +x "$HOOKS_DIR/pre-commit"
  echo "✅ Pre-commit hook installed"
else
  echo "⚠️  pre-commit-hook.sh not found in scripts/"
fi

echo "🎉 Git hooks setup complete!"
