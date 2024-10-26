import React from "react";
import {User} from 'src/types/user'
import {Connection} from "src/types/connections";

export const UserProfilePageContext = React.createContext({
  user: undefined as User | undefined,
  connections: undefined as Connection[] | undefined,
  payments: undefined as number[] | undefined
});
