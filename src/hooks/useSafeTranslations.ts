// src/hooks/useSafeTranslations.ts
'use client';

import { useTranslations } from 'next-intl';

export function useSafeTranslations(namespace: string) {
  try {
    return useTranslations(namespace);
  } catch (error) {
    console.warn(`[useSafeTranslations] Traduções indisponíveis para "${namespace}"`, error);
    return () => ''; // fallback vazio
  }
}
