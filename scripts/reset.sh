#!/bin/bash

# Clean and reinstall all dependencies

echo "🔄 Resetting Band Together environment..."
echo ""

./scripts/clean.sh

echo ""

./scripts/install-all.sh
