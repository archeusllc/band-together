/**
 * Centralized color palette for the app
 * Used across Tailwind CSS (via dark: variants) and React Navigation themes
 */

export const colors = {
  // Light mode - hex values and Tailwind classnames
  light: {
    background: '#F1F5F9',      // slate-100
    card: '#FFFFFF',             // white
    text: '#000000',             // black
    border: '#E2E8F0',           // slate-200
    muted: '#6B7280',            // gray-500
    mutedText: '#4B5563',        // gray-600
    icon: '#666666',             // gray-400
  },

  // Dark mode - hex values and Tailwind classnames
  dark: {
    background: '#0F172A',       // slate-900
    card: '#1E293B',             // slate-800
    text: '#FFFFFF',             // white
    border: '#334155',           // slate-700
    muted: '#9CA3AF',            // gray-400
    mutedText: '#D1D5DB',        // gray-300
    icon: '#D1D5DB',             // gray-300
  },

  // Brand colors (same in both modes)
  brand: {
    primary: '#3B82F6',          // blue-500
    primaryDark: '#2563EB',      // blue-600 (for dark mode active state)
    success: '#10B981',          // emerald-500
    error: '#FF3B30',            // red-500
    warning: '#F59E0B',          // amber-500
  },
};

/**
 * Tailwind classname mappings for easy reference in components
 */
export const tailwind = {
  // Backgrounds
  background: {
    light: 'bg-slate-100',
    dark: 'dark:bg-slate-900',
    both: 'bg-slate-100 dark:bg-slate-900',
  },
  card: {
    light: 'bg-white',
    dark: 'dark:bg-slate-800',
    both: 'bg-white dark:bg-slate-800',
  },

  // Text
  text: {
    light: 'text-black',
    dark: 'dark:text-white',
    both: 'text-black dark:text-white',
  },
  textMuted: {
    light: 'text-gray-600',
    dark: 'dark:text-gray-400',
    both: 'text-gray-600 dark:text-gray-400',
  },
  textMutedLight: {
    light: 'text-gray-500',
    dark: 'dark:text-gray-500',
    both: 'text-gray-500 dark:text-gray-500',
  },

  // Borders
  border: {
    light: 'border-slate-200',
    dark: 'dark:border-slate-700',
    both: 'border-slate-200 dark:border-slate-700',
  },

  // Active/Highlight states
  activeBackground: {
    light: 'bg-slate-100',
    dark: 'dark:bg-slate-700',
    both: 'bg-slate-100 dark:bg-slate-700',
  },

  // Brand colors
  primary: 'text-blue-500',
  error: 'text-red-600',
  errorDark: 'dark:text-red-500',
};

export const navigationColors = {
  light: {
    primary: colors.brand.primary,
    background: colors.light.background,
    card: colors.light.card,
    text: colors.light.text,
    border: colors.light.border,
    notification: colors.brand.error,
  },
  dark: {
    primary: colors.brand.primary,
    background: colors.dark.background,
    card: colors.dark.card,
    text: colors.dark.text,
    border: colors.dark.border,
    notification: colors.brand.error,
  },
};
