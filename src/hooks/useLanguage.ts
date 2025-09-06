'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function useLanguage() {
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const saved = Cookies.get('ztrecrypto_lang');
    if (saved) setLanguage(saved);
  }, []);

  const updateLanguage = (value: string) => {
    Cookies.set('ztrecrypto_lang', value, { expires: 30 });
    setLanguage(value);
  };

  return {
    language,
    setLanguage: updateLanguage,
  };
}
