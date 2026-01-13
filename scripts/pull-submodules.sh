#!/bin/bash

# Pull latest changes from all submodules, respecting configured branch per submodule

echo "📥 Pulling latest changes from submodules..."
git submodule foreach 'git pull origin $(git config --file .gitmodules submodule.$name.branch || echo main) || git pull origin main'
echo "✅ Submodules updated!"
