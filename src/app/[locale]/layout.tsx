import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {ReactNode} from 'react';
import {notFound} from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import '../../styles/globals.css'; 
import {routing} from '../../i18n/routing'; // Usando o arquivo de routing que criamos

const inter = Inter({subsets: ['latin'], display: 'swap'});

// Tipagem segura com base na config de routing
const SUPPORTED_LOCALES = routing.locales;
type Locale = typeof SUPPORTED_LOCALES[number];

export async function generateMetadata(
  {params}: {params: Promise<{locale: string}>}
): Promise<Metadata> {
  const {locale} = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  const baseUrl = 'https://lumo.com'; // ajuste seu domínio real

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: 'Lumo',
      template: '%s • Lumo'
    },
    description: 'Plataforma de Trading Automático com contratos perpétuos e bots.',
    alternates: {
      canonical: locale === routing.defaultLocale ? '/' : `/${locale}`,
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map(l => [l, `/${l}`])
      ) as Record<Locale, string>
    },
    openGraph: {
      type: 'website',
      url: locale === routing.defaultLocale ? `${baseUrl}/` : `${baseUrl}/${locale}`,
      siteName: 'Lumo',
      title: 'Lumo — Trading SaaS',
      description: 'Construa sua jornada no trading com Lumo',
      images: [{url: '/og.png', width: 1200, height: 630, alt: 'Lumo'}]
    },
    icons: {
      icon: [
        {url: '/favicon.ico', sizes: 'any'},
        {url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32'},
        {url: '/favicon-192x192.png', type: 'image/png', sizes: '192x192'}
      ],
      apple: '/apple-touch-icon.png',
      other: [{rel: 'manifest', url: '/manifest.webmanifest'}]
    }
  };
}

// Configuração do viewport separada (requerida pelo Next.js 14+)
export function generateViewport() {
  return {
    themeColor: '#0B0F15'
  };
}

export default async function LocaleLayout(
  {children, params}: {children: ReactNode; params: Promise<{locale: string}>}
) {
  const {locale} = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  // getMessages() pega o locale atual automaticamente através do request.ts
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark min-h-full scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}