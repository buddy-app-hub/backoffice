import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import UserDetailCard from "src/components/user/UserDetailCard";
import {useEffect, useState} from "react";
import {User, UserFields} from "src/types/user";
import {ApiUser} from "src/services/userApi";
import {ApiConnection} from "src/services/connectionApi";
import {UserProfilePageContext} from "src/context/UserProfilePageContext";
import {Connection, ConnectionFields, Meeting} from "src/types/connections";
import UserConnectionsTotals from "src/components/user/UserConnectionsTotals";
import {WalletSummary} from "src/types/payments";
import {ApiPayments} from "src/services/paymentApi";
import UserWalletDetail from "src/components/user/UserWalletDetail";
import UserProfitPerMonths from "src/components/user/UserProfitPerMonths";

const BuddyProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [buddy, setBuddy] = useState<User>();

  const [connections, setConnections] = useState<Connection[]>();
  const [meetings, setMeetings] = useState<Meeting[]>();
  const [errorConnections, setErrorConnections] = useState<string>();

  const [wallet, setWallet] = useState<WalletSummary>();

  const loadConnections = () => {
    setConnections(undefined);
    setMeetings(undefined);
    setErrorConnections(undefined);

    if (id && !Array.isArray(id)) {
      ApiConnection.getConnectionByBuddyId(id)
        .then(response => {
          setConnections(response);
          const m = response ? response.map(x => x?.[ConnectionFields.Meetings] || []).flat() : [];
          setMeetings(m);
        })
        .catch(() => setErrorConnections("Ocurrió un error al obtener las conexiones del Buddy"))
    }
  }

  const loadWalletDetail = () => {
    if (buddy && buddy[UserFields.WalletId]) {
      ApiPayments.getWalletById(buddy[UserFields.WalletId])
        .then(setWallet)
    }
  }

  const loadUser = () => {
    setBuddy(undefined);
    setWallet(undefined);

    if (id && !Array.isArray(id)) {
      ApiUser.getBuddyById(id)
        .then(setBuddy)
        .catch(() => router.push('/404'))
    }
  }

  useEffect(() => {
    if (id && !Array.isArray(id)) {
      loadUser();

      loadConnections();
    }
  }, [id]);


  useEffect(() => {
    loadWalletDetail();
  }, [buddy]);

  return (
    <UserProfilePageContext.Provider value={{
      user: buddy,
      connections: connections,
      payments: undefined,
      meetings: meetings,
      wallet: wallet,
      loadConnections: loadConnections,
      loadUser: loadUser
    }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <UserDetailCard />
        </Grid>

        <Grid item xs={12} md={7} lg={8} container spacing={6} alignSelf={'start'}>
          <Grid item xs={12}>
            <UserConnectionsTotals error={errorConnections} />
          </Grid>

          <Grid item xs={12} md={6}>
            <UserWalletDetail />
          </Grid>

          <Grid item xs={12} md={6}>
            <UserProfitPerMonths />
          </Grid>
        </Grid>
      </Grid>
    </UserProfilePageContext.Provider>
  );
}

export default BuddyProfilePage;
