#!/bin/bash

# Install dependencies in all modules

echo "📦 Initializing submodules..."
git submodule update --init --recursive

echo ""
echo "📚 Installing shared dependencies..."
cd shared && bun install

echo ""
echo "📚 Installing client dependencies..."
cd ../client && bun install

echo ""
echo "📚 Installing api dependencies..."
cd ../api && bun install

echo ""
echo "📚 Installing db dependencies..."
cd ../db && bunx --bun bun install

echo ""
echo "✅ All dependencies installed!"
