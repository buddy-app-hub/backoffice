import {ApiPaymentsService} from "./apiService";
import {Wallet, WalletSummary} from "../types/payments";

export const ApiPayments = {
  getWallets: async () : Promise<Wallet[]> =>
    ApiPaymentsService.get(`/wallets`),

  getWalletById: async (id: string) : Promise<WalletSummary> =>
    ApiPaymentsService.get(`/wallets/${id}`)
}

