# Stage 1: Build dependencies and application
FROM oven/bun:1 AS builder
WORKDIR /workspace

# Copy package files
COPY api/package.json api/bun.lock ./api/
COPY db/package.json db/bun.lock ./db/

# Copy source code
COPY api ./api
COPY db ./db

# Install dependencies for API
WORKDIR /workspace/api
RUN bun install --frozen-lockfile

# Stage 2: Runtime
FROM oven/bun:1-slim AS runtime
WORKDIR /workspace

# Setup npm authentication for GitHub Packages
ARG GITHUB_TOKEN=""
RUN npm config set @band-together:registry https://npm.pkg.github.com
RUN if [ -n "$GITHUB_TOKEN" ]; then npm config set //npm.pkg.github.com/:_authToken $GITHUB_TOKEN; fi

# Copy lock files and package.json for bun install
COPY --from=builder /workspace/api/package.json /workspace/api/bun.lock ./api/
COPY --from=builder /workspace/db/package.json /workspace/db/bun.lock ./db/

# Copy source code
COPY --from=builder /workspace/api/src ./api/src
COPY --from=builder /workspace/api/tsconfig.json ./api/

# Copy db directory for Prisma migrations
COPY --from=builder /workspace/db/prisma ./db/prisma
COPY --from=builder /workspace/db/prisma.config.ts ./db/

# Install dependencies in runtime (pulls @band-together packages from GitHub Packages)
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
