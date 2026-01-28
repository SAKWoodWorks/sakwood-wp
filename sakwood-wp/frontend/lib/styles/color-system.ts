/**
 * Sakwood Color System
 *
 * Standard color palette for consistent UI across the application.
 *
 * COLOR PRINCIPLES:
 * - Primary: Blue and white (brand colors, CTAs, links)
 * - Status: Green (success), Red (error), Yellow (warning)
 * - Neutrals: Gray scale (text, borders, backgrounds)
 *
 * USAGE:
 * Import and use these constants in components to ensure consistency.
 * Example: className={`${colors.primary} text-white font-semibold px-4 py-2`}
 */

export const colors = {
  // ========== PRIMARY COLORS (Blue & White) ==========
  // Use for: CTAs, links, brand elements, primary actions

  /** Main primary color - buttons, active states */
  primary: 'bg-blue-600',

  /** Hover state for primary elements */
  primaryHover: 'hover:bg-blue-700',

  /** Light background for sections and highlights */
  primaryLight: 'bg-blue-50',

  /** Primary text color for links and brand text */
  primaryText: 'text-blue-600',

  /** Hover state for primary text */
  primaryTextHover: 'hover:text-blue-700',

  /** Border color for focus states */
  primaryBorder: 'border-blue-500',

  /** Border color for interactive elements */
  primaryBorderLight: 'border-blue-300',

  // ========== NEUTRAL GRAYS ==========
  // Use for: text, backgrounds, borders, dividers

  /** Primary text - headings, important content */
  textPrimary: 'text-gray-900',

  /** Body text */
  textSecondary: 'text-gray-700',

  /** Secondary text - descriptions, labels */
  textMuted: 'text-gray-600',

  /** Muted text - placeholders, less important info */
  textLight: 'text-gray-500',

  /** Light background */
  bgLight: 'bg-gray-50',

  /** Subtle section background */
  bgSubtle: 'bg-gray-100',

  /** Dark background - footer, overlays */
  bgDark: 'bg-gray-900',

  /** Default border color */
  border: 'border-gray-200',

  /** Input borders, dividers */
  borderMedium: 'border-gray-300',

  // ========== STATUS COLORS (Semantic) ==========
  // Use for: success, error, warning states only

  /** Success - stock status, completed actions */
  success: 'bg-green-600',
  successText: 'text-green-600',
  successBg: 'bg-green-50',
  successBorder: 'border-green-200',

  /** Error - out of stock, validation errors */
  error: 'bg-red-600',
  errorText: 'text-red-600',
  errorBg: 'bg-red-50',
  errorBorder: 'border-red-200',

  /** Warning - pending states, alerts */
  warning: 'bg-yellow-500',
  warningText: 'text-yellow-600',
  warningBg: 'bg-yellow-50',
  warningBorder: 'border-yellow-200',

  // ========== SOCIAL MEDIA COLORS ==========
  // Use for: social media buttons (brand-specific)

  socialFacebook: 'bg-blue-600',
  socialLine: 'bg-green-500',
  socialTelegram: 'bg-blue-500',
} as const;

/**
 * Common color combinations for quick use
 */
export const colorCombos = {
  /** Primary button with hover */
  primaryButton: 'bg-blue-600 hover:bg-blue-700 text-white',

  /** Secondary/outline button */
  secondaryButton: 'border-2 border-gray-800 hover:border-gray-900 text-gray-800 hover:text-gray-900',

  /** Success badge */
  successBadge: 'bg-green-100 text-green-800',

  /** Error badge */
  errorBadge: 'bg-red-100 text-red-800',

  /** Link */
  link: 'text-blue-600 hover:text-blue-700',
} as const;

/**
 * Color usage guidelines
 */
export const colorGuidelines = {
  // DO: Use these
  do: [
    'Use blue-600 for primary buttons and CTAs',
    'Use green-600 only for success states (in stock, completed, verified)',
    'Use red-600 only for error states (out of stock, failed, validation errors)',
    'Use yellow-500/600 for warnings (pending, attention needed)',
    'Use gray scale for text hierarchy (gray-900 → 700 → 600 → 500)',
    'Use gray-200 for default borders',
  ],

  // DON'T: Avoid these
  dont: [
    'Do NOT use green for prices or general highlights',
    'Do NOT use red for non-error purposes (delete, remove actions are OK)',
    'Do NOT use random colors (purple, pink, orange) outside intentional design',
    'Do NOT use colors inconsistently across similar components',
    'Do NOT use too many different colors in one component',
  ],
} as const;
