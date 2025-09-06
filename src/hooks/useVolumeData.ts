// hooks/useVolumeData.ts
'use client';

import { useEffect, useState } from 'react';

export type VolumeBar = {
  volume: number;
  isUp: boolean;
};

export function useVolumeData(symbol: string = 'BTCUSDT', interval: string = '15') {
  const [volumeBars, setVolumeBars] = useState<VolumeBar[]>([]);

  useEffect(() => {
    const fetchVolumeData = async () => {
      try {
        const res = await fetch(
          `https://api.bybit.com/v5/market/kline?category=linear&symbol=${symbol}&interval=${interval}`
        );
        const json = await res.json();
        const list = json?.result?.list;

        if (!Array.isArray(list)) {
          console.error('Formato de volume inválido:', json);
          return;
        }

        const parsed = list.slice(-120).map((item: string[]) => ({
          volume: parseFloat(item[5]),
          isUp: parseFloat(item[4]) >= parseFloat(item[1]),
        }));

        setVolumeBars(parsed);
      } catch (error) {
        console.error('Erro ao buscar volume:', error);
      }
    };

    fetchVolumeData();
  }, [symbol, interval]);

  return volumeBars;
}
