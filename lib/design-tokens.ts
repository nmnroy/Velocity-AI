export const tokens = {
  colors: {
    background: '#F1F6F4',
    surface: '#D9E8E2',
    accent: '#FFC801',
    accentSecondary: '#FF9932',
    primaryDark: '#114C5A',
    ink: '#172B36',
  },
  fonts: {
    mono: 'var(--font-mono)',
    sans: 'var(--font-sans)',
  },
  motion: {
    microMin: 150,
    microMax: 200,
    reflowMin: 300,
    reflowMax: 400,
    orchestrationBudget: 500,
  }
} as const;
