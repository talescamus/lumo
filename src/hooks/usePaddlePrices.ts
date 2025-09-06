import { Paddle, PricePreviewParams, PricePreviewResponse } from '@paddle/paddle-js';
import { useEffect, useState } from 'react';
import { PricingTier } from '../constants/pricing-tier';

export type PaddlePrices = Record<string, string>;

/**
 * Gera a lista de items (priceId + quantidade) baseado nos planos.
 */
function getLineItems(): PricePreviewParams['items'] {
  const priceIds = PricingTier.flatMap((tier) => [tier.priceId.month, tier.priceId.year]);
  return priceIds.map((priceId) => ({ priceId, quantity: 1 }));
}

/**
 * Transforma a resposta do Paddle em um objeto priceId -> formattedTotal.
 */
function getPriceAmounts(response: PricePreviewResponse): PaddlePrices {
  return response.data.details.lineItems.reduce((acc, item) => {
    acc[item.price.id] = item.formattedTotals.total;
    return acc;
  }, {} as PaddlePrices);
}

/**
 * Hook para buscar os preços atualizados do Paddle baseado no país e instância do Paddle.
 */
export function usePaddlePrices(
  paddle: Paddle | undefined,
  country: string
): { prices: PaddlePrices; loading: boolean } {
  const [prices, setPrices] = useState<PaddlePrices>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!paddle) {
      setPrices({});
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchPrices() {
      setLoading(true);

      const paddlePricePreviewRequest: Partial<PricePreviewParams> = {
        items: getLineItems(),
        ...(country !== 'OTHERS' ? { address: { countryCode: country } } : {}),
      };

      try {
        if (!paddle) {
          throw new Error('Paddle instance is undefined');
        }
        const preview = await paddle.PricePreview(
          paddlePricePreviewRequest as PricePreviewParams
        );
        if (!cancelled) {
          setPrices(getPriceAmounts(preview));
          setLoading(false);
        }
      } catch (error) {
        console.error('Erro ao buscar preços no Paddle:', error);
        if (!cancelled) {
          setPrices({});
          setLoading(false);
        }
      }
    }

    fetchPrices();

    return () => {
      cancelled = true;
    };
  }, [country, paddle]);

  return { prices, loading };
}
