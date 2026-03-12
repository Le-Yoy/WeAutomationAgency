/**
 * WeAutomationAgency Design System
 * Brand colors, typography, spacing - 2026
 *
 * Import from this file throughout the app for consistency
 */

// ============================================
// COLORS
// ============================================

export const colors = {
  // Brand Colors
  brand: {
    primary: '#000000',      // Black background
    secondary: '#FFFFFF',    // White text
    accent: '#F94239',       // Red accent (CTAs, highlights)
  },

  // Grey Scale
  grey: {
    darker: '#3A3A3A',       // Even darker grey
    dark: '#5A5A5A',         // Darker grey
    medium: '#808080',       // Darker medium grey
    regular: '#A9A9A9',      // Medium grey
    light: '#F5F5F5',        // Light grey
  },

  // Accent Variations
  orange: {
    base: '#F94239',         // Accent red/orange
    dark: '#DA2C26',         // Darker orange
    darker: '#C13028',       // Even darker orange
  },

  // Additional
  violet: '#4F045B',         // Violet color

  // Semantic colors (aliases for common use)
  text: {
    primary: '#FFFFFF',      // Main text
    secondary: '#A9A9A9',    // Secondary text
    accent: '#F94239',       // Highlighted text
  },

  background: {
    primary: '#000000',      // Main background
    secondary: '#3A3A3A',    // Card/section backgrounds
    overlay: 'rgba(0, 0, 0, 0.8)',
  },
};

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  // Font families
  fonts: {
    primary: 'Montserrat, sans-serif',
    satoshi: 'Satoshi, sans-serif',  // For large scrolling text
  },

  // Font sizes (from settings.css)
  sizes: {
    h0: '68px',     // Display headings
    h1: '48px',     // Main headings
    h2: '36px',     // Section headings
    h3: '30px',     // Sub headings
    h4: '24px',     // Card headings
    h5: '18px',     // Small headings
    primary: '32px',   // Primary text
    secondary: '24px', // Secondary text
    body: '16px',      // Body text
    accent: '18px',    // Accent text
  },

  // Font weights
  weights: {
    light: '100',
    regular: '300',
    normal: '400',
    medium: '500',
    semibold: '530',
    bold: '700',
    extrabold: '800',
  },

  // Line heights
  lineHeights: {
    h0: '67.6px',
    h1: '57.6px',
    h2: '46.8px',
    h3: '39px',
    h4: '31.2px',
    h5: '25.2px',
    primary: '38.4px',
    secondary: '31.2px',
    body: '24px',
    accent: '25.2px',
  },

  // Letter spacing
  letterSpacing: {
    tight: '0',
    normal: '0.25px',
    wide: '0.4px',
    wider: '0.5px',
    widest: '0.7px',
    accent: '1px',
  },
};

// ============================================
// SPACING
// ============================================

export const spacing = {
  global: {
    margin: '20px',
    padding: '20px',
  },

  // Standard spacing scale
  xs: '0.5rem',    // 8px
  sm: '1rem',      // 16px
  md: '1.5rem',    // 24px
  lg: '2rem',      // 32px
  xl: '3rem',      // 48px
  '2xl': '4rem',   // 64px
  '3xl': '6rem',   // 96px
  '4xl': '8rem',   // 128px

  // Container system
  container: {
    maxWidth: '82rem',     // 1312px
    maxWidthWide: '90rem', // 1440px
    padding: 'clamp(1.25rem, 4vw, 3.75rem)',
  },

  // Section spacing
  section: {
    paddingY: 'clamp(3rem, 8vw, 6rem)',
  },
};

// ============================================
// ANIMATIONS
// ============================================

export const animations = {
  // Duration
  duration: {
    fast: '0.2s',
    normal: '0.3s',
    medium: '0.5s',
    slow: '0.8s',
  },

  // Easing
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Framer Motion variants
  variants: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    slideInLeft: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
    },
    slideInRight: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 50 },
    },
  },

  // Transition configs
  transitions: {
    default: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
    spring: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

// ============================================
// BREAKPOINTS
// ============================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Media queries
export const media = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
};

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  glow: '0 0 20px rgba(249, 66, 57, 0.5)',
};

// ============================================
// BORDER RADIUS
// ============================================

export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  pill: '1.625rem', // 26px (button pill)
  full: '9999px',
};

// ============================================
// EXPORT ALL
// ============================================

const designSystem = {
  colors,
  typography,
  spacing,
  animations,
  breakpoints,
  media,
  shadows,
  borderRadius,
};

export default designSystem;
