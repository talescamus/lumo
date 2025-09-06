export interface TierFeature {
  key: string; // chave para i18n
  premium?: boolean;
  new?: boolean;
}

export interface Tier {
  id: 'starter' | 'pro' | 'advanced';
  nameKey: string; // chave i18n
  icon: string;
  descriptionKey: string; // chave i18n
  featured: boolean;
  badgeKey?: string; // chave i18n
  defaultMonthlyPrice: string;
  defaultAnnualPrice: string;
  priceId: Record<'month' | 'year', string>;
  features: TierFeature[];
}

export const PricingTier: Tier[] = [
  {
    id: 'starter',
    nameKey: 'tiers.starter.name',
    icon: '/assets/icons/price-tiers/free-icon.svg',
    descriptionKey: 'tiers.starter.description',
    featured: false,
    badgeKey: 'tiers.starter.badge',
    defaultMonthlyPrice: '$0',
    defaultAnnualPrice: '$0',
    priceId: {
      month: 'pri_01hsxyh9txq4rzbrhbyngkhy46',
      year: 'pri_01ht7newpriceforannualab12c3',
    },
    features: [
      { key: 'tiers.starter.features.bot1' },
      { key: 'tiers.starter.features.executionDelay' },
      { key: 'tiers.starter.features.exportCSV' },
    ],
  },
  {
    id: 'pro',
    nameKey: 'tiers.pro.name',
    icon: '/assets/icons/price-tiers/basic-icon.svg',
    descriptionKey: 'tiers.pro.description',
    featured: true,
    badgeKey: 'tiers.pro.badge',
    defaultMonthlyPrice: '$29',
    defaultAnnualPrice: '$278',
    priceId: {
      month: 'pri_01hsxycme6m95sejkz7sbz5e9g',
      year: 'pri_01ht7newpriceforproanual112233',
    },
    features: [
      { key: 'tiers.pro.features.bot5' },
      { key: 'tiers.pro.features.instantExecution' },
      { key: 'tiers.pro.features.performanceCharts' },
      { key: 'tiers.pro.features.telegramNotifications' },
      { key: 'tiers.pro.features.emailSupport', premium: true },
    ],
  },
  {
    id: 'advanced',
    nameKey: 'tiers.advanced.name',
    icon: '/assets/icons/price-tiers/pro-icon.svg',
    descriptionKey: 'tiers.advanced.description',
    featured: false,
    badgeKey: 'tiers.advanced.badge',
    defaultMonthlyPrice: '$45',
    defaultAnnualPrice: '$432',
    priceId: {
      month: 'pri_01hsxyff091kyc9rjzx7zm6yqh',
      year: 'pri_01ht7newpriceforadvancedyear445566',
    },
    features: [
      { key: 'tiers.advanced.features.unlimitedBots', premium: true },
      { key: 'tiers.advanced.features.sso', premium: true },
      { key: 'tiers.advanced.features.strategyVersioning' },
      { key: 'tiers.advanced.features.assetLibrary' },
      { key: 'tiers.advanced.features.earlyAccess', new: true },
      { key: 'tiers.advanced.features.dedicatedSupport', premium: true },
    ],
  },
];
