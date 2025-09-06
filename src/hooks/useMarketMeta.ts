// hooks/useMarketMeta.ts
import { useEffect, useState } from 'react';

interface MarketMeta {
  rsi: string;
  volBTC: string;
  volUSDT: string;
  priceUp: string;
  priceDown: string;
}

export function useMarketMeta(symbol: string): MarketMeta {
  const [data, setData] = useState<MarketMeta>({
    rsi: 'RSI 14: --',
    volBTC: '--',
    volUSDT: '--',
    priceUp: '--',
    priceDown: '--',
  });

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        // Exemplo real de volume e último preço via Bybit
        const res = await fetch(`https://api.bybit.com/v5/market/tickers?category=linear&symbol=${symbol}`);
        const json = await res.json();
        const ticker = json.result?.list?.[0];

        if (!ticker) return;

        const volBTC = parseFloat(ticker.volume24h).toFixed(3);
        const volUSDT = parseFloat(ticker.turnover24h).toFixed(2);
        const priceUp = parseFloat(ticker.lastPrice).toFixed(3);
        const priceDown = (parseFloat(ticker.lastPrice) * 1.02).toFixed(3); // só exemplo

        // Simulação de RSI com valor fixo
        const rsi = `RSI 14: ${Math.floor(Math.random() * 20) + 50}.${Math.floor(Math.random() * 100)}`;

        setData({ rsi, volBTC, volUSDT, priceUp, priceDown });
      } catch (err) {
        console.error('Erro ao buscar dados de mercado:', err);
      }
    };

    fetchMeta();
    const interval = setInterval(fetchMeta, 15000); // atualiza a cada 15s

    return () => clearInterval(interval);
  }, [symbol]);

  return data;
}
