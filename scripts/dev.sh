#!/bin/bash
# Start development environment: DB, API server, and Expo client

# Don't exit on error for cleanup to work properly
set +e

echo "🚀 Starting Band Together development environment..."
echo ""

# Step 0: Kill any existing API or Expo servers
echo "0️⃣  Checking for existing servers..."

# Kill existing API server processes
API_PIDS=$(pgrep -f "bun.*api/src/index.ts" 2>/dev/null || true)
if [ -n "$API_PIDS" ]; then
  echo "   Found running API server(s), stopping..."
  echo "$API_PIDS" | xargs kill 2>/dev/null || true
  sleep 1
  echo "✅ Stopped existing API server(s)"
else
  echo "   No existing API server found"
fi

# Kill existing Expo/Metro processes
EXPO_PIDS=$(pgrep -f "expo start\|react-native start\|metro" 2>/dev/null || true)
if [ -n "$EXPO_PIDS" ]; then
  echo "   Found running Expo/Metro server(s), stopping..."
  echo "$EXPO_PIDS" | xargs kill 2>/dev/null || true
  sleep 1
  echo "✅ Stopped existing Expo/Metro server(s)"
else
  echo "   No existing Expo/Metro server found"
fi

echo ""

# Step 1: Ensure PostgreSQL container is running
echo "1️⃣  Checking PostgreSQL container..."
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker and try again."
  exit 1
fi

if ! docker ps | grep -q bandtogether-postgres; then
  echo "⚠️  PostgreSQL container is not running. Starting Docker Compose..."
  docker compose up -d
  echo "   Waiting for PostgreSQL to be ready..."
  sleep 5
else
  echo "✅ PostgreSQL container is already running"
fi

echo ""

# Step 2: Start API server in background
echo "2️⃣  Starting API server in background..."
cd api
bun run dev > /tmp/band-together-api.log 2>&1 &
API_PID=$!
cd ..
echo "✅ API server started (PID: $API_PID)"
echo "   Logs: tail -f /tmp/band-together-api.log"

echo ""

# Step 3: Start Expo client in foreground
echo "3️⃣  Starting Expo client (this will run in foreground)..."
echo ""
echo "📋 Quick reference:"
echo "   API Server:  PID $API_PID (logs: tail -f /tmp/band-together-api.log)"
echo "   Database:    http://localhost:8080 (Adminer)"
echo ""
echo "⚠️  Press Ctrl+C to stop (this will also stop the API server)"
echo ""

# Trap to cleanup on exit
cleanup() {
  echo ""
  echo "🛑 Shutting down..."
  
  # Kill the API server and all its child processes
  if [ -n "$API_PID" ] && kill -0 $API_PID 2>/dev/null; then
    echo "   Stopping API server (PID: $API_PID)..."
    # Kill the process group to ensure all child processes are terminated
    pkill -P $API_PID 2>/dev/null || true
    kill $API_PID 2>/dev/null || true
    sleep 1
    # Force kill if still running
    if kill -0 $API_PID 2>/dev/null; then
      kill -9 $API_PID 2>/dev/null || true
    fi
    echo "✅ Stopped API server"
  fi
  
  echo "   (PostgreSQL container is still running. Use 'docker compose down' to stop it)"
  echo "✅ Cleanup complete"
  exit 0
}

trap cleanup SIGINT SIGTERM EXIT

# Open browser in background after a delay (give Expo time to start)
(
  sleep 5
  if command -v open > /dev/null; then
    open http://localhost:8081 2>/dev/null || true
  fi
) &

# Start Expo in foreground
cd client
echo "📱 Starting Expo development server..."
echo "   Scan the QR code below with the Expo Go app to connect your device"
echo "   Browser will open automatically at http://localhost:8081"
echo ""
bun run start
