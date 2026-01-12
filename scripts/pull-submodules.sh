#!/bin/bash

# Pull latest changes from all submodules

echo "📥 Pulling latest changes from submodules..."
git submodule foreach git pull origin main
echo "✅ Submodules updated!"
