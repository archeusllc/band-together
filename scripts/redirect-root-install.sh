#!/bin/bash

# Prevent direct npm/yarn/bun install in root directory
# This script is run as a preinstall hook and automatically redirects to make setup

echo "🔄 Redirecting to setup script..."
echo ""

make setup
