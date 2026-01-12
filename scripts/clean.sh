#!/bin/bash

# Clean up node_modules and lock files from all modules

echo "🧹 Cleaning node_modules and lock files..."
rm -rf \
  shared/node_modules client/node_modules api/node_modules db/node_modules \
  shared/bun.lockb client/bun.lockb api/bun.lockb db/bun.lockb \
  shared/package-lock.json client/package-lock.json api/package-lock.json db/package-lock.json \
  shared/yarn.lock client/yarn.lock api/yarn.lock db/yarn.lock

echo "✅ Cleaned!"
