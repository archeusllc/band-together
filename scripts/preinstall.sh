#!/bin/bash

# Change to the project root directory
cd "$(dirname "$0")/.." || exit 1

# Array of directories to install dependencies
DIRECTORIES=("api" "api-cms" "client" "db" "cms")

# Iterate through each directory
for dir in "${DIRECTORIES[@]}"; do
  echo "📦 Installing dependencies in $dir..."
  cd "$dir" || exit 1
  rm -rf node_modules bun.lock package-lock.json
  bunx --bun bun install
  cd .. || exit 1
done

echo "✅ All dependencies installed successfully!"
