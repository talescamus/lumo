'use client';

import * as React from 'react';
import { IBillingFrequency } from '../../../constants/billing-frequency';
import { useTranslations } from 'next-intl';
import { cn } from '../../../lib/utils';
import { motion } from 'framer-motion';

interface ToggleProps {
  frequency: IBillingFrequency;
  setFrequency: (frequency: IBillingFrequency) => void;
  allFrequencies: IBillingFrequency[];
}

export function Toggle({ frequency, setFrequency, allFrequencies }: ToggleProps) {
  const tBilling = useTranslations('billing');

  return (
    <div className="flex justify-center mb-8 px-4">
      <div className="relative flex bg-gray-800 rounded-full p-1 select-none w-full max-w-[260px] sm:max-w-[220px]">
        {/* Indicador deslizante animado */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 left-1 bottom-1 w-1/2 bg-primary rounded-full shadow-lg"
          style={{
            transform:
              frequency.value === allFrequencies[0].value
                ? 'translateX(0%)'
                : 'translateX(100%)',
          }}
        />

        {/* Botões */}
        {allFrequencies.map((f) => {
          const isActive = frequency.value === f.value;
          return (
            <motion.button
              key={f.value}
              onClick={() => setFrequency(f)}
              className={cn(
                'relative z-10 w-1/2 py-2 sm:py-3 text-sm sm:text-lg font-semibold rounded-full cursor-pointer',
                'flex items-center justify-center transition-colors duration-200',
                isActive ? 'text-white' : 'text-gray-300'
              )}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              {tBilling(f.labelKey as 'monthly' | 'annual') || f.value}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
