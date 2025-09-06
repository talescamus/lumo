export const mockMarkets = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    current_price: 68942,
    price_change_percentage_24h: 0.52,
    market_cap: 1340000000000,
    total_volume: 34000000000,
    sparkline_in_7d: {
      price: [67000, 68000, 69000, 68942],
    },
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    current_price: 3100,
    price_change_percentage_24h: -1.2,
    market_cap: 360000000000,
    total_volume: 18000000000,
    sparkline_in_7d: {
      price: [3200, 3150, 3120, 3100],
    },
  },
  // ...adicione mais ativos conforme desejar
];
