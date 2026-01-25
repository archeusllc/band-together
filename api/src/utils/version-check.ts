/**
 * Runtime version checking for @band-together/types and @band-together/runtimes
 * Warns developers if API is using incompatible type versions
 */

import { SHARED_TYPES_VERSION } from '@band-together/types';

const EXPECTED_VERSION_RANGE = '^1.0.0';

export const checkSharedTypesVersion = () => {
  const [expectedMajor, expectedMinor] = EXPECTED_VERSION_RANGE
    .replace('^', '')
    .split('.')
    .map(Number);
  const [actualMajor, actualMinor] = SHARED_TYPES_VERSION
    .split('.')
    .map(Number);

  if (actualMajor !== expectedMajor) {
    console.error(
      `🚨 MAJOR version mismatch: expected ${EXPECTED_VERSION_RANGE}, got ${SHARED_TYPES_VERSION}. Types may be incompatible!`
    );
  } else if (actualMinor < expectedMinor) {
    console.warn(
      `⚠️  Minor version behind: expected ${EXPECTED_VERSION_RANGE}, got ${SHARED_TYPES_VERSION}. Run: bun update @band-together/types @band-together/runtimes`
    );
  } else {
    console.info(`✅ Shared types version: ${SHARED_TYPES_VERSION}`);
  }
};
