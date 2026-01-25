# Publishing Packages to GitHub Packages

This document explains how to set up and publish `@band-together/types` and `@band-together/runtimes` to GitHub Packages.

## Prerequisites

- GitHub account with access to archeusllc/band-together-types and archeusllc/band-together-runtimes repos
- Personal Access Token (PAT) with `write:packages` and `read:packages` scopes

## Setup Steps

### 1. Create Personal Access Token

1. Go to https://github.com/settings/tokens/new
2. Give it a descriptive name: "Band Together npm packages"
3. Select these scopes:
   - `write:packages` (upload packages)
   - `read:packages` (download packages)
   - `repo` (optional, for private repo access)
4. Click "Generate token"
5. **Copy the token** - you won't be able to see it again!

### 2. Configure npm Authentication

Save the token to your local npm config:

```bash
npm config set //npm.pkg.github.com/:_authToken YOUR_TOKEN_HERE
```

Verify it's set:
```bash
npm config get @band-together:registry
# Should output: https://npm.pkg.github.com
```

### 3. Update Package References

Once authenticated, change from local file references to published package versions:

**client/package.json**:
```json
"@band-together/types": "^1.0.0"
```

**api/package.json**:
```json
"@band-together/types": "^1.0.0",
"@band-together/runtimes": "^1.0.0"
```

### 4. Publish Packages

The packages are published via GitHub Actions workflows in each submodule:

**band-together-types**:
- `.github/workflows/publish.yml` triggers on push to main
- Publishes `@band-together/types` to GitHub Packages
- Requires `GITHUB_TOKEN` secret (GitHub Actions provides this automatically)

**band-together-runtimes**:
- `.github/workflows/publish.yml` triggers on push to main
- Publishes `@band-together/runtimes` to GitHub Packages
- Requires `GITHUB_TOKEN` secret (GitHub Actions provides this automatically)

### 5. Workflow After Setup

Once published:

```bash
# Install dependencies
cd client && bun install
cd ../api && bun install

# Packages are fetched from GitHub Packages using your PAT
```

## Deployment Configuration

### EAS (Expo Android/iOS)

Set the GitHub token as an environment variable in EAS:

```bash
eas secret create --scope project --name GITHUB_TOKEN
# Paste your Personal Access Token
```

Then in `eas.json`, reference it in the build command:

```json
{
  "build": {
    "preview": {
      "env": {
        "GITHUB_TOKEN": "@env GITHUB_TOKEN"
      }
    }
  }
}
```

### Fly.io (API Deployment)

Set the GitHub token as a Fly.io secret:

```bash
fly secrets set GITHUB_TOKEN=YOUR_TOKEN
```

The Docker build will use this token to authenticate npm.

## Troubleshooting

**"Cannot find module '@band-together/types'"**
- Check that npm is configured: `npm config get //npm.pkg.github.com/:_authToken`
- Verify token has `read:packages` scope

**"403 Forbidden - Permission denied"**
- Token needs `write:packages` scope for publishing
- Only admins can publish to the org

**"Need auth - You need to authorize this machine"**
- Run: `npm config set //npm.pkg.github.com/:_authToken YOUR_TOKEN`

## Publishing Manual Updates (Optional)

If GitHub Actions doesn't work, you can publish manually:

```bash
cd types
GITHUB_TOKEN=$(npm config get //npm.pkg.github.com/:_authToken) npm publish

cd ../runtimes
GITHUB_TOKEN=$(npm config get //npm.pkg.github.com/:_authToken) npm publish
```

Note: The `publishConfig.access: "restricted"` in package.json allows private scoped packages on GitHub Packages (unlike public npm).
