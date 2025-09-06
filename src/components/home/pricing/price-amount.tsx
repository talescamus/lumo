'use client';

import { Tier } from '../../../constants/pricing-tier';
import { cn } from '../../../lib/utils';
import { Skeleton } from '../../ui/skeleton';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface Props {
  loading: boolean;
  tier: Tier;
  priceMap: Record<string, string>;
  value: 'month' | 'year';
  priceSuffix: string;
  currency?: string;
}

function formatPrice(
  value: string | number | null | undefined,
  currency = 'USD'
): string | null {
  if (value == null) return null;
  const number = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(number)) return null;

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
}

function parsePrice(value: string | null | undefined): number | null {
  if (!value) return null;
  const clean = value.replace(/[^0-9.,]/g, '').replace(',', '.');
  const num = parseFloat(clean);
  return isNaN(num) ? null : num;
}

export function PriceAmount({
  loading,
  priceMap,
  priceSuffix,
  tier,
  value,
  currency = 'USD',
}: Props) {
  const t = useTranslations('pricing');
  const priceKey = tier.priceId[value];
  const rawPrice = priceKey ? priceMap[priceKey] : null;

  const formattedPrice =
    formatPrice(rawPrice, currency) ||
    (value === 'year'
      ? formatPrice(tier.defaultAnnualPrice, currency)
      : formatPrice(tier.defaultMonthlyPrice, currency));

  const displayPrice = formattedPrice || t('contactUs');

  // Detecta se é número (para definir tamanho)
  const isNumeric = formattedPrice != null;

  // cálculo de desconto
  const monthlyPrice = parsePrice(
    priceMap[tier.priceId.month] || tier.defaultMonthlyPrice
  );
  const annualPrice = parsePrice(
    priceMap[tier.priceId.year] || tier.defaultAnnualPrice
  );

  let discountLabel: string | null = null;
  let originalAnnualTotal: string | null = null;

  if (
    value === 'year' &&
    monthlyPrice &&
    annualPrice &&
    monthlyPrice * 12 > annualPrice
  ) {
    const originalPrice = monthlyPrice * 12;
    const discountPercent = Math.round(
      100 - (annualPrice / originalPrice) * 100
    );

    discountLabel = t('savePercent', { percent: discountPercent });
    originalAnnualTotal = formatPrice(originalPrice, currency);
  } else if (value === 'year' && tier.id !== 'starter') {
    discountLabel = t('saveAnnual');
  }

  return (
    <div className="mt-6 flex flex-col px-8 items-center md:items-start">
      {loading ? (
        <Skeleton className="h-[96px] w-full rounded-md bg-border" />
      ) : (
        <>
          {originalAnnualTotal && (
            <div className="mb-1 text-sm text-gray-500 line-through">
              {t('fromPrice', { price: originalAnnualTotal })}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={value + displayPrice}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className={cn(
                'font-bold text-foreground tracking-tight',
                isNumeric
                  ? 'text-[48px] md:text-[80px] leading-[56px] md:leading-[96px]'
                  : 'text-lg md:text-xl'
              )}
              aria-live="polite"
            >
              {displayPrice}
            </motion.div>
          </AnimatePresence>

          <div className="text-sm font-medium text-muted-foreground">
            {priceSuffix}
          </div>

          {discountLabel && (
            <div className="mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-400">
              {discountLabel}
            </div>
          )}
        </>
      )}
    </div>
  );
}
