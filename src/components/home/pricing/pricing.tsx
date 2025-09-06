'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Toggle } from '../../../components/shared/toggle/toggle';
import { PriceCards } from '../../../components/home/pricing/price-cards';
import { BillingFrequency, IBillingFrequency } from '../../../constants/billing-frequency';
import { Environments, initializePaddle, Paddle } from '@paddle/paddle-js';
import { usePaddlePrices } from '../../../hooks/usePaddlePrices';
import { useTranslations } from 'next-intl';

interface PricingProps {
  country: string;
}

// Tipos literais das chaves de tradução
type BillingLabelKeys = 'monthly' | 'annual';
type BillingSuffixKeys = 'perUserMonth' | 'perUserYear';

export function Pricing({ country }: PricingProps) {
  const [frequency, setFrequency] = useState<IBillingFrequency>(BillingFrequency[0]);
  const [paddle, setPaddle] = useState<Paddle>();

  const tPricing = useTranslations('pricing');
  const tBilling = useTranslations('billing');

  // Obter preços do Paddle
  const { prices, loading } = usePaddlePrices(paddle, country);

  // Inicializa Paddle
  const initPaddle = useCallback(async () => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const env = process.env.NEXT_PUBLIC_PADDLE_ENV as Environments;
    if (!token || !env) return;

    const instance = await initializePaddle({ token, environment: env });
    if (instance) setPaddle(instance);
  }, []);

  useEffect(() => {
    initPaddle();
  }, [initPaddle]);

  // Frequências traduzidas e memoizadas
  const translatedFrequencies = useMemo(
    () =>
      BillingFrequency.map((f) => ({
        ...f,
        label: tBilling(f.labelKey as BillingLabelKeys) || f.labelKey,
        priceSuffix: tBilling(f.priceSuffixKey as BillingSuffixKeys) || f.priceSuffixKey,
      })),
    [tBilling]
  );

  // Frequência atual com labels traduzidos
  const frequencyWithLabels = useMemo(
    () =>
      translatedFrequencies.find((f) => f.value === frequency.value) || translatedFrequencies[0],
    [translatedFrequencies, frequency.value]
  );

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 text-center">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          {tPricing('title.line1')} <br />
          <span className="text-primary">{tPricing('title.highlight')}</span>
        </h2>
        <p className="mt-6 mx-auto max-w-3xl text-lg text-muted-foreground">
          {tPricing('description')}
        </p>
      </motion.div>

      {/* Toggle */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Toggle
          frequency={frequencyWithLabels}
          setFrequency={setFrequency}
          allFrequencies={translatedFrequencies}
        />
      </motion.div>

      {/* Price Cards */}
      <motion.div
        className="mt-12 w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <PriceCards frequency={frequencyWithLabels} loading={loading} priceMap={prices} />
      </motion.div>
    </section>
  );
}
