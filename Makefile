# Band Together — Makefile

.PHONY: help setup install verify-submodules submodules pull-submodules push-all stage-all commit-all check-dirty sync-all status clean dev

help:
	@echo "Band Together — Available commands:"
	@echo ""
	@echo "  SETUP:"
	@echo "  make setup            Complete setup from fresh clone (submodules, env, install, db)"
	@echo ""
	@echo "  DEVELOPMENT:"
	@echo "  make dev              Start development environment (DB, API, and Expo client)"
	@echo ""
	@echo "  WORKFLOW:"
	@echo "  make sync-all MSG='message'    Stage, commit, and push all (auto-generated msg if omitted)"
	@echo ""
	@echo "  INDIVIDUAL COMMANDS:"
	@echo "  make install          Install all dependencies (shared, client, api, db)"
	@echo "  make submodules       Initialize and update all submodules"
	@echo "  make pull-submodules  Pull latest changes from all submodules"
	@echo "  make stage-all        Stage all changes in submodules and parent repo"
	@echo "  make commit-all MSG='message'  Commit with message (auto-generated if omitted)"
	@echo "  make push-all         Push all submodules and parent repo"
	@echo "  make check-dirty      Check if submodules have uncommitted changes"
	@echo "  make status           Show git status of all submodules"
	@echo ""
	@echo "  MAINTENANCE:"
	@echo "  make clean            Remove node_modules from all modules"
	@echo "  make verify-submodules  Verify all submodules are initialized"
	@echo ""

# Verify all submodules are properly initialized
verify-submodules:
	@./scripts/verify-submodules.sh

# Complete setup from fresh clone
setup:
	@./scripts/setup.sh

# Initialize and update submodules
submodules: verify-submodules
	@echo "📦 Updating submodules..."
	git submodule update --init --recursive
	@echo "✅ Submodules ready!"

# Pull latest changes from all submodules
pull-submodules:
	@echo "📥 Pulling latest changes from submodules..."
	git submodule foreach git pull origin main
	@echo "✅ Submodules updated!"

# Push all submodules and parent repo
push-all:
	@./scripts/push-all.sh

# Stage all changes in submodules and parent repo
stage-all:
	@./scripts/stage-all.sh

# Commit all staged changes with message (or auto-generated)
commit-all:
	@if [ -z "$(MSG)" ]; then \
		./scripts/commit-all.sh; \
	else \
		./scripts/commit-all.sh -m "$(MSG)"; \
	fi

# Stage, commit, and push all changes
sync-all:
	@if [ -z "$(MSG)" ]; then \
		./scripts/sync-all.sh; \
	else \
		./scripts/sync-all.sh -m "$(MSG)"; \
	fi

# Check if submodules have uncommitted changes
check-dirty:
	@./scripts/check-dirty.sh

# Install dependencies in all modules
install: submodules
	@echo "📚 Installing shared dependencies..."
	cd shared && bun install
	@echo "📚 Installing client dependencies..."
	cd client && bun install
	@echo "📚 Installing api dependencies..."
	cd api && bun install
	@echo "📚 Installing db dependencies..."
	cd db && bunx --bun bun install
	@echo "✅ All dependencies installed!"

# Show git status for all submodules
status:
	@echo "📋 Band Together submodule status:"
	@echo ""
	git submodule foreach --quiet 'echo "=== $$name ===" && git status --short'

# Clean up node_modules from all modules
clean:
	@echo "🧹 Cleaning node_modules..."
	rm -rf shared/node_modules client/node_modules api/node_modules db/node_modules
	@echo "✅ Cleaned!"

# Start development environment
dev:
	@./scripts/dev.sh
