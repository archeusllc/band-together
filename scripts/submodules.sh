#!/bin/bash

# Initialize and update all submodules

echo "📦 Updating submodules..."
git submodule update --init --recursive
echo "✅ Submodules ready!"
