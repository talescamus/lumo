export const locales = [
  'en', 'pt', 'es','zh','ko'
] as const;

export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'pt';
export const localePrefix = 'as-needed'; // oculta /pt na URL
