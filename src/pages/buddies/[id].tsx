import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import UserDetailCard from "../../components/user/UserDetailCard";
import {useEffect, useState} from "react";
import {User, UserFields} from "../../types/user";
import {ApiUser} from "../../services/userApi";
import {ApiConnection} from "../../services/connectionApi";
import {UserProfilePageContext} from "../../context/UserProfilePageContext";
import {Connection, ConnectionFields, Meeting} from "src/types/connections";
import UserConnectionsTotals from "../../components/user/UserConnectionsTotals";
import {WalletSummary} from "../../types/payments";
import {ApiPayments} from "../../services/paymentApi";
import UserWalletDetail from "../../components/user/UserWalletDetail";

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

  useEffect(() => {
    if (id && !Array.isArray(id)) {
      ApiUser.getBuddyById(id)
        .then(setBuddy)

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
      loadConnections: loadConnections
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
        </Grid>
      </Grid>
    </UserProfilePageContext.Provider>
  );
}

export default BuddyProfilePage;
