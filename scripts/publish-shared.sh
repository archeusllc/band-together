#!/bin/bash
# Publish @band-together/shared-types or @band-together/shared-runtime packages
# Bumps patch version, updates version constant, publishes, and commits

set -e

# Determine which package we're in
if [[ $PWD == *"/types" ]]; then
  PACKAGE_NAME="@band-together/shared-types"
  PACKAGE_DIR="types"
  VERSION_FILE="version.ts"
elif [[ $PWD == *"/runtimes" ]]; then
  PACKAGE_NAME="@band-together/shared-runtime"
  PACKAGE_DIR="runtimes"
  VERSION_FILE=""
else
  echo "Error: Must run from types/ or runtimes/ directory"
  exit 1
fi

echo "📦 Publishing $PACKAGE_NAME from $PACKAGE_DIR/"

# Read current version
CURRENT_VERSION=$(grep '"version"' package.json | head -1 | sed 's/.*"\([^"]*\)".*/\1/')
echo "Current version: $CURRENT_VERSION"

# Bump patch version (1.2.3 -> 1.2.4)
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"
NEW_PATCH=$((PATCH + 1))
NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"
echo "New version: $NEW_VERSION"

# Update package.json
sed -i '' "s/\"version\": \"[^\"]*\"/\"version\": \"$NEW_VERSION\"/" package.json

# Update version.ts if it exists
if [[ -f "$VERSION_FILE" ]]; then
  sed -i '' "s/export const SHARED_TYPES_VERSION = '[^']*'/export const SHARED_TYPES_VERSION = '$NEW_VERSION'/" "$VERSION_FILE"
  echo "✅ Updated $VERSION_FILE to version $NEW_VERSION"
fi

# Configure npm registry
npm config set @band-together:registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken $GITHUB_TOKEN

# Publish to GitHub Packages
echo "🚀 Publishing to GitHub Packages..."
npm publish

# Commit version bump
git add package.json $VERSION_FILE
git commit -m "chore: bump version to $NEW_VERSION"

echo "✅ Published $PACKAGE_NAME@$NEW_VERSION successfully!"
