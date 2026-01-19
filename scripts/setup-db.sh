#!/bin/bash
# Setup database: generate Prisma client and run migrations

set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
source "$SCRIPT_DIR/lib.sh"

echo "🗄️  Setting up database..."

require_bun
ensure_postgres

echo "📦 Generating Prisma client..."
cd "$SCRIPT_DIR/../db" && bunx --bun bun run generate && cd - >/dev/null

echo "📋 Running database migrations..."
cd "$SCRIPT_DIR/../db" && bunx --bun prisma migrate deploy && cd - >/dev/null

echo "✅ Database setup complete!"
echo "   You can view the database at http://localhost:8080 (Adminer)"
