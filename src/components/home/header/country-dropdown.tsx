'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select';
// Update the path below to the correct relative path if your navigation file is at src/i18n/navigation.ts
import { useRouter, usePathname } from '../../../i18n/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

const regions = [
  { value: 'en', emoji: '🇺🇸' },
  { value: 'pt', emoji: '🇧🇷' },
  { value: 'es', emoji: '🇪🇸' },
  { value: 'zh', emoji: '🇨🇳' },
  { value: 'ko', emoji: '🇰🇷' }
];

interface Props {
  country: string;
  onCountryChange?: (value: string) => void;
}

export function CountryDropdown({ country, onCountryChange }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('languages');

  const selected = regions.find((r) => r.value === country) ?? {
    value: 'en',
    emoji: '🌐'
  };

  const handleChange = (value: string) => {
    localStorage.setItem('preferred_locale', value);
    onCountryChange?.(value);
    router.replace(pathname, { locale: value });
  };

  useEffect(() => {
    const savedLocale = localStorage.getItem('preferred_locale');
    if (savedLocale && savedLocale !== country) {
      router.replace(pathname, { locale: savedLocale });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Select value={country} onValueChange={handleChange}>
      <SelectTrigger
        aria-label="Select language"
        className="w-[220px] bg-background border border-gray-700 text-white hover:border-primary/60 transition rounded-md"
      >
        <SelectValue>
          <div className="flex items-center gap-2">
            <span>{selected.emoji}</span>
            <span>{t(selected.value)}</span>
          </div>
        </SelectValue>
      </SelectTrigger>

      <SelectContent className="bg-background border border-gray-700 text-sm text-white rounded-md shadow-lg z-50 max-h-[300px] overflow-y-auto">
        {regions.map((region) => (
          <SelectItem
            key={region.value}
            value={region.value}
            className="flex items-center gap-2 px-3 py-2 hover:bg-primary/10 rounded-sm cursor-pointer transition"
          >
            <span>{region.emoji}</span>
            <span>{t(region.value)}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
