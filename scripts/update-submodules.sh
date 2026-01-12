#!/bin/bash

# Update and initialize all submodules
echo "📦 Updating submodules..."
git submodule update --init --recursive

# Pull latest changes from all submodules
echo "📥 Pulling latest changes from submodules..."
git submodule foreach git pull origin main

echo "✅ Submodules updated!"
