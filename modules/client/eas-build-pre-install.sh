#!/usr/bin/env bash
# EAS Build Hook: Generate .npmrc for GitHub Packages authentication
# This script runs during EAS cloud builds to configure private package access
# Token is provided via EAS secrets and is never stored in code

set -e

# Check for GitHub token in EAS secrets
if [ -z "$GITHUB_TOKEN" ]; then
  echo "❌ ERROR: GITHUB_TOKEN not set in EAS secrets"
  echo "Please configure the secret with: eas secret:create --scope project --name GITHUB_TOKEN --value 'ghp_...'"
  exit 1
fi

# Generate .npmrc for GitHub Packages authentication
# This allows 'bun install' to access private @archeusllc packages
cat > .npmrc << EOF
@archeusllc:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
registry=https://registry.npmjs.org/
EOF

echo "✅ Generated .npmrc for GitHub Packages authentication"
echo "Private packages @archeusllc/models and @archeusllc/types will be installed during dependency resolution"
