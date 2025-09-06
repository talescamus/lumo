import { FormattedTradeData } from "@/types/trades";
import { useEffect, useState } from "react";

export function useLiveTrades(symbol: string) {
  const [trades, setTrades] = useState<FormattedTradeData[]>([]);

  useEffect(() => {
    if (!symbol) return;

    const pair = symbol.toLowerCase();
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const trade: FormattedTradeData = {
        time: new Date(data.T).toLocaleTimeString(),
        price: data.p,
        amount: data.q,
        type: data.m ? 'sell' : 'buy',
      };
      setTrades((prev) => [trade, ...prev.slice(0, 30)]);
    };

    ws.onerror = (err) => {
      console.error('Erro no WebSocket:', err);
    };

    return () => ws.close();
  }, [symbol]);

  return trades;
}
