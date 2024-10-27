import React from "react";
import {User} from 'src/types/user'
import {Connection, Meeting} from "src/types/connections";
import {WalletSummary} from "../types/payments";

export const UserProfilePageContext = React.createContext({
  user: undefined as User | undefined,
  connections: undefined as Connection[] | undefined,
  meetings: undefined as Meeting[] | undefined,
  wallet: undefined as WalletSummary | undefined,
  payments: undefined as number[] | undefined,
  loadConnections: () => { }
});
