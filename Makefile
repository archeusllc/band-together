# Band Together — Makefile

.PHONY: help install submodules pull-submodules push-all stage-all commit-all status clean

help:
	@echo "Band Together — Available commands:"
	@echo ""
	@echo "  make install          Install all dependencies (client, api, db)"
	@echo "  make submodules       Initialize and update all submodules"
	@echo "  make pull-submodules  Pull latest changes from all submodules"
	@echo "  make push-all         Push all submodules and parent repo"
	@echo "  make stage-all        Stage all changes in submodules and parent repo"
	@echo "  make commit-all MSG='message'  Commit all staged changes with message"
	@echo "  make status           Show git status of all submodules"
	@echo "  make clean            Remove node_modules from all modules"
	@echo ""

# Initialize and update submodules
submodules:
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

# Commit all staged changes with message
commit-all:
	@if [ -z "$(MSG)" ]; then \
		echo "❌ Error: Commit message required"; \
		echo "Usage: make commit-all MSG='your message'"; \
		exit 1; \
	fi
	@./scripts/commit-all.sh -m "$(MSG)"

# Install dependencies in all modules
install: submodules
	@echo "📚 Installing client dependencies..."
	cd client && bun install
	@echo "📚 Installing api dependencies..."
	cd api && bun install
	@echo "📚 Installing db dependencies..."
	cd db && bun install
	@echo "✅ All dependencies installed!"

# Show git status for all submodules
status:
	@echo "📋 Band Together submodule status:"
	@echo ""
	git submodule foreach --quiet 'echo "=== $$name ===" && git status --short'

# Clean up node_modules from all modules
clean:
	@echo "🧹 Cleaning node_modules..."
	rm -rf client/node_modules api/node_modules db/node_modules
	@echo "✅ Cleaned!"
