import {ApiPaymentsService} from "./apiService";
import {Payment, Wallet, WalletSummary} from "../types/payments";

export const ApiPayments = {

  getPayments: async () : Promise<Payment[]> =>
    ApiPaymentsService.get(`/payments`),

  getWallets: async () : Promise<Wallet[]> =>
    ApiPaymentsService.get(`/wallets`),

  getWalletById: async (id: string) : Promise<WalletSummary> =>
    ApiPaymentsService.get(`/wallets/${id}`)
}

