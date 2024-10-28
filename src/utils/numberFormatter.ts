import {Price, PriceFields} from "../types/payments";

export const NumberFormatter = {
  toStringCurrency: (currencyId: string, amount: number | null | undefined): string => {
    if (!amount) return '-';

    const currencyDesc = currencyId === "ARS" ? '$' : 'USD';

    return `${currencyDesc} ${amount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  },

  priceToStringCurrency: (price: Price | null | undefined): string =>
    !price ? '-' : NumberFormatter.toStringCurrency(price[PriceFields.CurrencyId] || "ARS", price[PriceFields.Amount]),
}

