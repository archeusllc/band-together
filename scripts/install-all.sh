#!/bin/bash

# Install dependencies in all modules

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
source "$SCRIPT_DIR/lib.sh"

require_bun

echo "📦 Initializing submodules..."
git submodule update --init --recursive

echo ""
echo "📚 Installing shared dependencies..."
pushd "$SCRIPT_DIR/../shared" >/dev/null
bun install
popd >/dev/null

echo ""
echo "📚 Installing client dependencies..."
pushd "$SCRIPT_DIR/../client" >/dev/null
bun install
popd >/dev/null

echo ""
echo "📚 Installing api dependencies..."
pushd "$SCRIPT_DIR/../api" >/dev/null
bun install
popd >/dev/null

echo ""
echo "📚 Installing db dependencies..."
pushd "$SCRIPT_DIR/../db" >/dev/null
bunx --bun bun install
popd >/dev/null

echo ""
echo "✅ All dependencies installed!"
