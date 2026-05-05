export const BrandColors = {
  background: '#F7F3F8',
  backgroundDark: '#130D18',
  border: '#E1D7E8',
  borderStrong: '#C9B7D6',
  ink: '#211827',
  muted: '#6D6474',
  mutedSoft: '#94899D',
  primary: '#523071',
  primaryDark: '#1E102C',
  primarySoft: '#F0E7F6',
  rose: '#B4234F',
  roseSoft: '#FCE8EF',
  shadow: '#211827',
  surface: '#FFFFFF',
  surfaceAlt: '#FCF8FD',
  teal: '#176B5A',
  tealSoft: '#DFF5EE',
  violet: '#6F3AA6',
  warm: '#A85D16',
  warmSoft: '#FFF2DA',
  blue: '#315E9C',
  blueSoft: '#E8F0FA',
  sage: '#657B4B',
  sageSoft: '#EEF5E5',
};

export type AppThemeMode = 'dark' | 'light';

export const BrandThemes = {
  light: {
    background: BrandColors.background,
    border: BrandColors.border,
    borderStrong: BrandColors.borderStrong,
    cardShadow: BrandColors.shadow,
    danger: BrandColors.rose,
    dangerSoft: BrandColors.roseSoft,
    heroArchive: '#173B33',
    heroExplore: '#263A4F',
    heroHome: BrandColors.primaryDark,
    heroProfile: '#251433',
    ink: BrandColors.ink,
    muted: BrandColors.muted,
    mutedSoft: BrandColors.mutedSoft,
    primary: BrandColors.primary,
    primarySoft: BrandColors.primarySoft,
    surface: BrandColors.surface,
    surfaceAlt: BrandColors.surfaceAlt,
    teal: BrandColors.teal,
    tealSoft: BrandColors.tealSoft,
    warm: BrandColors.warm,
    warmSoft: BrandColors.warmSoft,
  },
  dark: {
    background: '#100B14',
    border: '#40304B',
    borderStrong: '#6C5579',
    cardShadow: '#000000',
    danger: '#FDA4AF',
    dangerSoft: '#3B1722',
    heroArchive: '#0B2A23',
    heroExplore: '#102536',
    heroHome: '#170D21',
    heroProfile: '#170D21',
    ink: '#F8F1FF',
    muted: '#C7B8D0',
    mutedSoft: '#9F8BAB',
    primary: '#D9B8FF',
    primarySoft: '#2B1A38',
    surface: '#1B1322',
    surfaceAlt: '#25192E',
    teal: '#8AE0C3',
    tealSoft: '#12362D',
    warm: '#F5C26B',
    warmSoft: '#3A2711',
  },
} as const;

export const BrandRadii = {
  card: 8,
  control: 8,
  pill: 999,
};

export const BrandSpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
};

export const BrandShadows = {
  card: {
    elevation: 2,
    shadowColor: BrandColors.shadow,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
  },
  lifted: {
    elevation: 3,
    shadowColor: BrandColors.shadow,
    shadowOffset: { height: 12, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
  },
};

export const BrandCopy = {
  projectName: 'Via la Maschera',
  promise: 'Una domanda. Poi silenzio.',
};
