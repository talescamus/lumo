'use client';

import { Tier } from '../../../constants/pricing-tier';
import Image from 'next/image';
import { cn } from '../../../lib/utils';
import { useTranslations } from 'next-intl';

interface Props {
  tier: Tier;
}

export function PriceTitle({ tier }: Props) {
  const t = useTranslations('tiers');
  const { featured, icon, id } = tier;

  // pegar nome e badge diretamente pelo id do tier
  const name = t(`${id}.name`, { fallback: tier.nameKey || id });
  const badge = featured ? t(`${id}.badge`, { fallback: '' }) : null;

  return (
    <div
      className={cn(
        'flex justify-between items-center px-8 pt-8 flex-wrap gap-2',
        { 'featured-price-title': featured }
      )}
    >
      {/* Nome e ícone */}
      <div className="flex items-center gap-[10px]">
        <Image
          src={icon}
          height={40}
          width={40}
          alt={name}
          className="object-contain"
        />
        <h2 className="text-[20px] leading-[30px] font-semibold text-gray-100">
          {name}
        </h2>
      </div>

      {/* Badge do featured */}
      {badge && (
        <div
          className="flex items-center px-3 py-1 rounded-full border border-secondary-foreground/10
            text-[14px] leading-[21px] bg-primary/10 text-primary font-medium transition"
        >
          {badge}
        </div>
      )}
    </div>
  );
}
