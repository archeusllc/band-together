#!/bin/bash
# Shared utilities for project scripts

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)

# Print error and exit
err() {
  echo "❌ $1" >&2
  exit 1
}

# Ensure a command exists
require_cmd() {
  local cmd="$1"; shift
  local msg="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    err "$msg"
  fi
}

require_bun() {
  require_cmd bun "Bun is not installed. Install it from https://bun.sh/docs/installation"
}

require_docker() {
  require_cmd docker "Docker is not installed. Install Docker Desktop from https://docs.docker.com/get-docker/"
}

require_docker_running() {
  require_docker
  if ! docker info >/dev/null 2>&1; then
    err "Docker daemon is not running. Please start Docker Desktop and try again."
  fi
}

# Ensure the postgres container is up (idempotent)
ensure_postgres() {
  require_docker_running
  if ! docker ps --format '{{.Names}}' | grep -q '^bandtogether-postgres$'; then
    echo "⚠️  PostgreSQL container is not running. Starting Docker Compose..."
    docker compose -f "$ROOT_DIR/compose.yml" up -d
    echo "   Waiting for PostgreSQL to be ready..."
    for _ in {1..12}; do
      if docker ps --format '{{.Names}} {{.Status}}' | grep -q '^bandtogether-postgres .*healthy'; then
        break
      fi
      sleep 2
    done
  fi
  echo "✅ PostgreSQL container is running"
}

# Kill existing dev servers (API + Expo/Metro)
kill_existing_servers() {
  local api_pids expo_pids
  api_pids=$(pgrep -f "bun.*api/src/index.ts" 2>/dev/null || true)
  if [ -n "$api_pids" ]; then
    echo "   Found running API server(s), stopping..."
    echo "$api_pids" | xargs kill 2>/dev/null || true
  fi

  expo_pids=$(pgrep -f "expo start|react-native start|metro" 2>/dev/null || true)
  if [ -n "$expo_pids" ]; then
    echo "   Found running Expo/Metro server(s), stopping..."
    echo "$expo_pids" | xargs kill 2>/dev/null || true
  fi
}

# Stop API server safely
stop_api() {
  local pid="$1"
  if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
    echo "   Stopping API server (PID: $pid)..."
    pkill -P "$pid" 2>/dev/null || true
    kill "$pid" 2>/dev/null || true
    sleep 1
    if kill -0 "$pid" 2>/dev/null; then
      kill -9 "$pid" 2>/dev/null || true
    fi
    echo "✅ Stopped API server"
  fi
}

# Start API server in background and echo PID
start_api_background() {
  pushd "$ROOT_DIR/api" >/dev/null
  bun run dev > /tmp/band-together-api.log 2>&1 &
  local pid=$!
  popd >/dev/null
  echo "$pid"
}

# Open browser after delay (macOS)
open_browser_after() {
  local delay="$1" url="$2"
  (
    sleep "$delay"
    if command -v open >/dev/null; then
      open "$url" 2>/dev/null || true
    fi
  ) &
}
