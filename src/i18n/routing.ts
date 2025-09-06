import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'pt', 'es','zh', 'ko'],

  // Used when no locale matches
  defaultLocale: 'pt',

  // Optional: Configure pathnames for different locales
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      pt: '/sobre',
      es: '/acerca',
      zh: '/关于我们',
      ko: '/회사소개'
      
    },
    '/contact': {
      en: '/contact',
      pt: '/contato',
      es: '/contacto',
      zh: '/联系我们',
      ko: '/연락처'
    },
    '/dashboard': {
      en: '/dashboard',
      pt: '/painel',
      es: '/panel',
      zh: '/仪表板',
      ko: '/대시보드'
     
    },
    '/trade': {
      en: '/trade',
      pt: '/negociar',
      es: '/operar',
      zh: '/交易',
      ko: '/거래'
     
    },
    '/profile': {
      en: '/profile',
      pt: '/perfil',
      es: '/perfil',
      zh: '/个人资料',
      ko: '/프로필'
     
    }
  },

  // Optional: Configure locale prefix strategy
  localePrefix: 'as-needed' // 'always' | 'as-needed' | 'never'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);