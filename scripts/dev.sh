#!/bin/bash
# Start development environment: DB, API server, and Expo client

set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
source "$SCRIPT_DIR/lib.sh"

echo "🚀 Starting Band Together development environment..."
echo ""

require_bun
ensure_postgres

echo "0️⃣  Checking for existing servers..."
kill_existing_servers
echo "✅ Existing dev servers cleared"
echo ""

echo "2️⃣  Starting API server in background..."
API_PID=$(start_api_background)
echo "✅ API server started (PID: $API_PID)"
echo "   Logs: tail -f /tmp/band-together-api.log"
echo ""

echo "3️⃣  Starting Expo client (foreground)..."
echo ""
echo "📋 Quick reference:"
echo "   API Server:  PID $API_PID (logs: tail -f /tmp/band-together-api.log)"
echo "   Database:    http://localhost:8080 (Adminer)"
echo ""
echo "⚠️  Press Ctrl+C to stop (this will also stop the API server)"
echo ""

cleanup() {
  set +e
  echo ""
  echo "🛑 Shutting down..."
  stop_api "$API_PID"
  echo "   (PostgreSQL container is still running. Use 'docker compose down' to stop it)"
  echo "✅ Cleanup complete"
}

trap cleanup SIGINT SIGTERM EXIT

open_browser_after 5 "http://localhost:8081"

cd "$SCRIPT_DIR/../client"
echo "📱 Starting Expo development server..."
echo "   Scan the QR code below with the Expo Go app to connect your device"
echo "   Browser will open automatically at http://localhost:8081"
echo ""
bun run start
