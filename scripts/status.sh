#!/bin/bash

# Show git status for all submodules

echo "📋 Band Together submodule status:"
echo ""
git submodule foreach --quiet 'echo "=== $name ===" && git status --short'
