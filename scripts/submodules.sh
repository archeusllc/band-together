#!/bin/bash

# Initialize and update all submodules with their configured branches

echo "📦 Updating submodules..."
git submodule update --init --recursive

# Ensure each submodule is on its configured branch
echo "🔀 Setting submodules to their configured branches..."
git submodule foreach 'BRANCH=$(git config --file $toplevel/.gitmodules submodule.$name.branch); if [ -n "$BRANCH" ]; then git checkout $BRANCH; fi'

echo "✅ Submodules ready!"
