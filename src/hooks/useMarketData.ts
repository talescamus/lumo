// hooks/useMarketData.ts
'use client';

import { useEffect, useState } from 'react';

export interface MarketData {
  price: number;
  change: number;
  percent: number;
  markPrice: number;
  indexPrice: number;
  highPrice: number;
  lowPrice: number;
  volume: number;
  quoteVolume: number;
  openInterest: number;
}

export function useMarketData(symbol = 'ETHUSDT') {
  const [data, setData] = useState<MarketData | null>(null);

  useEffect(() => {
    async function fetchMarketData() {
      try {
        const [tickerRes, markRes, oiRes] = await Promise.all([
          fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`),
          fetch(`https://fapi.binance.com/fapi/v1/premiumIndex?symbol=${symbol}`),
          fetch(`https://fapi.binance.com/fapi/v1/openInterest?symbol=${symbol}`),
        ]);

        const ticker = await tickerRes.json();
        const mark = await markRes.json();
        const oi = await oiRes.json();

        setData({
          price: parseFloat(ticker.lastPrice),
          change: parseFloat(ticker.priceChange),
          percent: parseFloat(ticker.priceChangePercent),
          highPrice: parseFloat(ticker.highPrice),
          lowPrice: parseFloat(ticker.lowPrice),
          volume: parseFloat(ticker.volume),
          quoteVolume: parseFloat(ticker.quoteVolume),
          markPrice: parseFloat(mark.markPrice),
          indexPrice: parseFloat(mark.indexPrice),
          openInterest: parseFloat(oi.openInterest),
        });
      } catch (e) {
        console.error('Erro ao buscar dados do mercado:', e);
      }
    }

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 5000);
    return () => clearInterval(interval);
  }, [symbol]);

  return data;
}
