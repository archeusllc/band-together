# Stage 1: Build dependencies and application
FROM oven/bun:1 AS builder
WORKDIR /workspace

# Copy package files from all workspaces (building from root directory)
COPY api/package.json api/bun.lock ./api/
COPY db/package.json db/bun.lock ./db/
COPY shared/package.json shared/bun.lock ./shared/

# Copy entire workspace structure
COPY api ./api
COPY db ./db
COPY shared ./shared

# Install dependencies for API
WORKDIR /workspace/api
RUN bun install --frozen-lockfile

# Generate Prisma client in db workspace
WORKDIR /workspace/db
RUN bun install --frozen-lockfile && bun run generate || echo "Prisma generate completed"

# Stage 2: Runtime
FROM oven/bun:1-slim AS runtime
WORKDIR /workspace

# Copy lock files and package.json for bun install
COPY --from=builder /workspace/api/package.json /workspace/api/bun.lock ./api/
COPY --from=builder /workspace/shared/package.json /workspace/shared/bun.lock ./shared/

# Copy source code
COPY --from=builder /workspace/api/src ./api/src
COPY --from=builder /workspace/api/tsconfig.json ./api/
COPY --from=builder /workspace/shared/types ./shared/types
COPY --from=builder /workspace/shared/index.ts ./shared/
COPY --from=builder /workspace/shared/generated ./shared/generated

# Copy db directory for Prisma migrations
COPY --from=builder /workspace/db/prisma ./db/prisma
COPY --from=builder /workspace/db/prisma.config.ts ./db/
COPY --from=builder /workspace/db/package.json /workspace/db/bun.lock ./db/

# Reinstall dependencies in runtime to create proper symlinks
WORKDIR /workspace/api
RUN bun install --frozen-lockfile

# Change to API directory for runtime
WORKDIR /workspace/api

# Expose API port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD bun -e "const res = await fetch('http://localhost:3000/health'); process.exit(res.ok ? 0 : 1);" || exit 1

# Start API server
CMD ["bun", "run", "src/index.ts"]
