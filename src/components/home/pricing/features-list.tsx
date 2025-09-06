'use client';

import { Tier } from '../../../constants/pricing-tier';
import { CircleCheck, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Props {
  tier: Tier;
}

export function FeaturesList({ tier }: Props) {
  const t = useTranslations();

  return (
    <ul className="p-8 flex flex-col gap-4">
      {tier.features.map((feature) => (
        <li key={feature.key} className="flex items-start gap-x-3">
          <CircleCheck className="h-6 w-6 text-primary flex-shrink-0" />
          <span className="text-base text-gray-200">
            {t(feature.key)}
            {feature.premium && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
                <Star className="h-3 w-3" /> {t('pricing.features.premium', { fallback: 'Premium' })}
              </span>
            )}
            {feature.new && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-400">
                🆕 {t('pricing.features.new', { fallback: 'New' })}
              </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
