import { ReactNode } from "react";

export interface IBillingFrequency {
  value: 'month' | 'year';
  labelKey: string;        // chave para i18n
  priceSuffixKey: string;  // chave para i18n
  label?: ReactNode;       // label traduzida
  priceSuffix?: ReactNode; // priceSuffix traduzido
}

// Frequências de cobrança
export const BillingFrequency: IBillingFrequency[] = [
  {
    value: 'month',
    labelKey: 'monthly',
    priceSuffixKey: 'perUserMonth',
  },
  {
    value: 'year',
    labelKey: 'annual',
    priceSuffixKey: 'perUserYear',
  },
];
