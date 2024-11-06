import React, {ReactNode, useContext, useEffect, useState} from "react";
import {User, UserFields} from "src/types/user";
import {Connection} from "src/types/connections";
import {
  Payment,
  PendingWithdrawals,
  PendingWithdrawalsFields,
  TransactionFields,
  TransactionStatus,
  TransactionTypes,
  Wallet,
  WalletFields
} from "src/types/payments";
import {ApiUser} from "src/services/userApi";
import {ApiConnection} from "src/services/connectionApi";
import {ApiPayments} from "src/services/paymentApi";
import {getFullNameUser} from "../utils/userUtils";

type AppDataContextType = {
  buddies: User[] | undefined,
  reloadBuddies: () => void,
  errorsBuddies: boolean | undefined,

  elders: User[] | undefined,
  reloadElders: () => void,
  errorsElders: boolean | undefined,

  allUsers: User[] | undefined,
  reloadAllUser: () => void,

  connections: Connection[] | undefined,
  reloadConnections: () => void,
  errorsConnections: boolean | undefined,

  payments: Payment[] | undefined,
  reloadPayments: () => void,
  errorsPayments: boolean | undefined,

  wallets: Wallet[] | undefined,
  pendingWithdrawals: PendingWithdrawals[] | undefined,
  reloadWallets: () => void,
  errorsWallets: boolean | undefined
}

type ProviderProps = {
  children?: ReactNode;
};

const AppDataContext = React.createContext<AppDataContextType>({
  buddies: undefined,
  reloadBuddies: () => { },
  errorsBuddies: false,
  elders: undefined,
  reloadElders: () => { },
  errorsElders: false,
  allUsers: undefined,
  reloadAllUser: () => { },
  connections: undefined,
  reloadConnections: () => { },
  errorsConnections: false,
  payments: undefined,
  reloadPayments: () => { },
  errorsPayments: false,
  wallets: undefined,
  pendingWithdrawals: undefined,
  reloadWallets: () => { },
  errorsWallets: false
})

export const AppDataContextProvider = ({ children }: ProviderProps) => {

  const [buddies, setBuddies] = useState<User[]>();
  const [errorsBuddies, setErrorBuddies] = useState<boolean>(false)
  const [elders, setElders] = useState<User[]>();
  const [errorsElders, setErrorElders] = useState<boolean>(false)
  const [connections, setConnections] = useState<Connection[]>();
  const [errorsConnections, setErrorConnections] = useState<boolean>(false)
  const [payments, setPayments] = useState<Payment[]>();
  const [errorsPayments, setErrorPayments] = useState<boolean>(false)
  const [wallets, setWallets] = useState<Wallet[]>();
  const [pendingWithdrawals, setPendingWithdrawals] = useState<PendingWithdrawals[]>();
  const [errorsWallets, setErrorWallets] = useState<boolean>(false)

  const reloadBuddies = () => {
    setBuddies(undefined);
    setErrorBuddies(false);
    ApiUser.fetchUsers({ searchElders: false, searchBuddies: true })
      .then(setBuddies)
      .catch(() => setErrorBuddies(true));
  }

  const reloadElders = () => {
    setElders(undefined);
    setErrorElders(false);
    ApiUser.fetchUsers({ searchElders: true, searchBuddies: false })
      .then(setElders)
      .catch(() => setErrorElders(true));
  }

  const reloadAllUser = () => {
    reloadBuddies();
    reloadElders();
  }

  const reloadConnections = () => {
    setConnections(undefined);
    setErrorConnections(false);
    ApiConnection.getConnections()
      .then(setConnections)
      .catch(() => setErrorConnections(true));
  }

  const reloadPayments = () => {
    setPayments(undefined);
    setErrorPayments(false);
    ApiPayments.getPayments()
      .then(setPayments)
      .catch(() => setErrorPayments(true));
  }

  const reloadWallets = () => {
    setWallets(undefined);
    setErrorWallets(false);
    ApiPayments.getWallets()
      .then(setWallets)
      .catch(() => setErrorWallets(true));
  }

  useEffect(() => {
    setPendingWithdrawals(undefined);
    if (wallets && buddies) {
      const pendings : PendingWithdrawals[] = [];

      wallets.forEach(w => {
        const walletId = w[WalletFields.Id];
        const hasPendingWithdraw = w[WalletFields.Transactions].some(t =>
          t[TransactionFields.Type] === TransactionTypes.Withdraw && t[TransactionFields.Status] === TransactionStatus.Pending
        )

        if (hasPendingWithdraw) {
          const buddyWallet = buddies.find(b => b[UserFields.WalletId] === walletId);

          if (buddyWallet)
            pendings.push({
              [PendingWithdrawalsFields.WalletId]: walletId,
              [PendingWithdrawalsFields.BuddyId]: buddyWallet[UserFields.FirebaseUID],
              [PendingWithdrawalsFields.BuddyName]: getFullNameUser(buddyWallet)
            })
        }
      })

      setPendingWithdrawals(pendings);
    }
  }, [wallets, buddies]);

  useEffect(() => {
    reloadAllUser();
    reloadConnections();
    reloadPayments();
    reloadWallets();
  }, []);

  return (
    <AppDataContext.Provider
      value={{
        buddies: buddies,
        reloadBuddies: reloadBuddies,
        errorsBuddies: errorsBuddies,
        elders: elders,
        reloadElders: reloadElders,
        errorsElders: errorsElders,
        allUsers: (buddies && elders) ? [...buddies, ...elders] : undefined,
        reloadAllUser: reloadAllUser,
        connections: connections,
        reloadConnections: reloadConnections,
        errorsConnections: errorsConnections,
        payments: payments,
        reloadPayments: reloadPayments,
        errorsPayments: errorsPayments,
        wallets: wallets,
        pendingWithdrawals: pendingWithdrawals,
        reloadWallets: reloadWallets,
        errorsWallets: errorsWallets
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppGlobalData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useSolicitation debe usarse dentro de SolicitationsContextProvider");
  }
  return context;
}
