
export enum PaymentFields {
  Id = 'id',
  PaymentOrderId = 'payment_order_id',
  ConnectionId = 'connection_id'
}

export interface Payment {
  [PaymentFields.Id]: string,
  [PaymentFields.PaymentOrderId]: string,
  [PaymentFields.ConnectionId]: string,
}

export enum WalletFields {
  Id = 'id',
  Transactions = 'transactions',
  Balance = 'balance',
  Total = 'total'
}

export interface Wallet {
  [WalletFields.Id]: string,
  [WalletFields.Transactions]: Transaction[],
}

export interface WalletSummary extends Wallet {
  [WalletFields.Balance]: Price,
  [WalletFields.Total]: Price
}

export enum PriceFields {
  Amount = 'amount',
  CurrencyId = 'currency_id'
}

export interface Price {
  [PriceFields.Amount]: number,
  [PriceFields.CurrencyId]: string
}

export enum TransactionFields {
  PaymentId = 'payment_id',
  Type = 'type',
  Status = 'status',
  Description = 'description',
  Amount = 'amount',
  CurrencyId = 'currency_id',
  CreatedAt = 'created_at',
  UpdatedAt = 'updated_at'
}

export interface Transaction {
  [TransactionFields.PaymentId]: string,
  [TransactionFields.Type]: string,
  [TransactionFields.Status]: TransactionStatus,
  [TransactionFields.Description]: string,
  [TransactionFields.Amount]: number,
  [TransactionFields.CurrencyId]: string,
  [TransactionFields.CreatedAt]?: Date,
  [TransactionFields.UpdatedAt]?: Date,
}

export enum TransactionStatus {
  Approved = 'approved',
  Pending = 'pending',
  Canceled = 'canceled'
}

export enum TransactionTypes {
  Deposit = 'deposit',
  Withdraw = 'withdraw'
}
