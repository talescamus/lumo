// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import intlConfig from '../next-intl.config';

export default createMiddleware({
  locales: intlConfig.locales,
  defaultLocale: intlConfig.defaultLocale,
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/', '/(pt|en|es|fr|de|it|zh|ja|ko|ru)/:path*']
};
