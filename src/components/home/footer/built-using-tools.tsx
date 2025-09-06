'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function BuiltUsingTools() {
  const t = useTranslations('BuiltUsingTools'); // <- dentro do componente

  return (
    <div className="mx-auto max-w-7xl text-center px-8 mt-24 mb-24">
      <span className="text-base">
        {t('builtForLumo', { defaultMessage: 'Built for Lumo' })}
      </span>
      <div className="flex flex-row flex-wrap gap-6 justify-center md:justify-between items-center mt-8 md:gap-1">
        <Image
          src="/assets/icons/logo/binance-logo.svg"
          alt="Binance"
          width={120}
          height={32}
        />
        <Image
          src="/assets/icons/logo/tradingview-logo.svg"
          alt="TradingView"
          width={140}
          height={32}
        />
        <Image
          src="/assets/icons/logo/metamask-logo.svg"
          alt="MetaMask"
          width={130}
          height={32}
        />
        <Image
          src="/assets/icons/logo/polygon-logo.svg"
          alt="Polygon"
          width={120}
          height={32}
        />
      </div>
    </div>
  );
}
