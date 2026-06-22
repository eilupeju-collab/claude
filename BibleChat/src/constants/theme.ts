// Bible Chat — Design System & Theme Constants

export const Colors = {
  // Primary palette
  primary: '#4A6FA5',        // Calming blue
  primaryLight: '#6B8FC5',
  primaryDark: '#2E4F7A',
  
  // Secondary palette
  secondary: '#C5A55A',      // Soft gold
  secondaryLight: '#D4BC7C',
  secondaryDark: '#A68B3C',
  
  // Accent colors
  accent: '#7B68AE',         // Gentle purple
  accentLight: '#9B8BC8',
  accentDark: '#5C4D8A',
  
  // Neutrals
  background: '#FAFAF8',
  surface: '#FFFFFF',
  surfaceElevated: '#F5F5F3',
  
  // Text
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A5A',
  textTertiary: '#7A7A8A',
  textInverse: '#FFFFFF',
  
  // Scripture specific
  scriptureText: '#2C2C3E',
  verseNumber: '#C5A55A',
  highlight: {
    yellow: '#FFF3CD',
    green: '#D4EDDA',
    blue: '#CCE5FF',
    pink: '#F8D7DA',
    purple: '#E2D9F3',
  },
  
  // Semantic
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8',
  
  // Dark mode
  dark: {
    background: '#1A1A2E',
    surface: '#252540',
    surfaceElevated: '#2E2E4A',
    textPrimary: '#EAEAF0',
    textSecondary: '#B0B0C0',
    textTertiary: '#7A7A90',
  },
  
  // Sepia mode
  sepia: {
    background: '#F4ECD8',
    surface: '#FAF5E8',
    textPrimary: '#3E2C1C',
    textSecondary: '#5C4A3A',
  },
};

export const Typography = {
  // Scripture reading
  scripture: {
    fontFamily: 'Georgia',
    fontSize: 18,
    lineHeight: 30,
    letterSpacing: 0.2,
  },
  
  // Headings
  h1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 22,
    fontWeight: '600' as const,
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 26,
    letterSpacing: 0,
  },
  
  // Body
  bodyLarge: {
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 26,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
  
  // Labels
  label: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
  
  // Caption
  caption: {
    fontSize: 11,
    fontWeight: '400' as const,
    lineHeight: 14,
  },
};

export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
  massive: 64,
};

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
};

export const MeditationColors = {
  peace: '#7ECEC1',
  gratitude: '#F5C77E',
  forgiveness: '#B8A9D4',
  strength: '#E87E6C',
  sleep: '#4A5899',
  morning: '#FFB74D',
  healing: '#81C784',
  identity: '#64B5F6',
};

export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  MeditationColors,
};
