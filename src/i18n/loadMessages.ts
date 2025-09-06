// src/i18n/loadMessages.ts
import { getMessages } from 'next-intl/server';

type SupportedLocale = "en" | "pt" | "es" |"zh" | "ko" | undefined;

export async function loadMessages(locale: SupportedLocale) {
  try {
    return await getMessages({ locale });
  } catch {
    return await getMessages({ locale: 'pt' }); // fallback
  }
}
