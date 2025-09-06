'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu';
import { Globe, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', label: 'English', emoji: '🇺🇸' },
  { code: 'pt', label: 'Português', emoji: '🇧🇷' },
  { code: 'es', label: 'Español', emoji: '🇪🇸' },
  { code: 'zh', label: '中文', emoji: '🇨🇳' },
  { code: 'ko', label: '한국어', emoji: '🇰🇷' }
];

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState('en');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem('lang');
    const initialLocale = storedLang || pathname.split('/')[1] || 'en';
    setLocale(initialLocale);
  }, [pathname]);

  const changeLanguage = (code: string) => {
    const parts = pathname.replace(/^\/+/, '').split('/');
    parts[0] = code;
    localStorage.setItem('lang', code);
    router.push(`/${parts.join('/')}`);
    setLocale(code);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-background border border-gray-700 hover:bg-primary/10 rounded-md shadow-md transition-all"
          aria-label="Select language"
        >
          <Globe size={16} />
          <span className="font-semibold tracking-wide">
            {languages.find((l) => l.code === locale)?.label || locale}
          </span>
        </button>
      </DropdownMenuTrigger>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.2 }}
            className="z-[9999] w-60 rounded-lg border border-gray-700 bg-[#101010] shadow-xl p-2 absolute right-0 mt-2 max-h-[60vh] overflow-y-auto"
          >
            <ul className="space-y-1">
              {languages.map((lang) => {
                const isActive = lang.code === locale;
                return (
                  <li key={lang.code}>
                    <button
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-all
                        ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-white/10 text-gray-300 hover:text-white'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{lang.emoji}</span>
                        <span>{lang.label}</span>
                      </div>
                      {isActive && <Check size={16} className="text-primary" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}
