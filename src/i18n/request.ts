import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing'; // Importa do routing.ts que já existe
import type { RequestConfig } from 'next-intl/server';

const supportedLocales = ['en', 'pt', 'es', 'zh', 'ko'] as const;
type SupportedLocale = typeof supportedLocales[number];

export default getRequestConfig(async ({ requestLocale }): Promise<RequestConfig> => {
  const locale = typeof requestLocale === 'string' ? requestLocale : await requestLocale;
  const selectedLocale = (supportedLocales.includes(locale as SupportedLocale) ? locale : routing.defaultLocale) as SupportedLocale;

  try {
    return {
      locale: selectedLocale,
      messages: (await import(`../messages/${selectedLocale}.json`)).default
    };
  } catch (error) {
    console.warn(`[i18n] Fallback para '${routing.defaultLocale}' — erro ao carregar '${selectedLocale}'`, error);
    return {
      locale: routing.defaultLocale as SupportedLocale,
      messages: (await import(`../messages/${routing.defaultLocale}.json`)).default
    };
  }
});