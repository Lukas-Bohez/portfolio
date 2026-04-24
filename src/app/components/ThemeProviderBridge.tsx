'use client';

import { ThemeProvider, useTheme } from 'next-themes';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

function ThemeAttributeBridge() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) {
      return;
    }

    document.documentElement.setAttribute('data-theme', resolvedTheme);
    document.body.setAttribute('data-theme', resolvedTheme);

    try {
      localStorage.setItem('spire-theme', resolvedTheme);
      localStorage.setItem('quiz-theme-preference', resolvedTheme);
    } catch {
      // Ignore write failures for private browsing or blocked storage.
    }
  }, [resolvedTheme]);

  return null;
}

export function ThemeProviderBridge({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      storageKey="spire-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <ThemeAttributeBridge />
      {children}
    </ThemeProvider>
  );
}
