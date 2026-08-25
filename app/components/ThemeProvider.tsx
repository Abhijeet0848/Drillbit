'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <NextThemesProvider defaultTheme="light" attribute="data-theme">{children}</NextThemesProvider>;
}
