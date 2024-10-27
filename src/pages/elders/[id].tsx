import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import UserDetailCard from "src/components/user/UserDetailCard";
import {useEffect, useState} from "react";
import {User} from "src/types/user";
import {ApiUser} from "src/services/userApi";
import {ApiConnection} from "src/services/connectionApi";
import {UserProfilePageContext} from "src/context/UserProfilePageContext";
import {Connection, ConnectionFields, Meeting} from "src/types/connections";
import UserConnectionsTotals from "src/components/user/UserConnectionsTotals";

const ElderProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [elder, setElder] = useState<User>();

  const [connections, setConnections] = useState<Connection[]>();
  const [meetings, setMeetings] = useState<Meeting[]>();
  const [errorConnections, setErrorConnections] = useState<string>();

  const loadConnections = () => {
    setConnections(undefined);
    setMeetings(undefined);
    setErrorConnections(undefined);

    if (id && !Array.isArray(id)) {
      ApiConnection.getConnectionByElderId(id)
        .then(response => {
          setConnections(response);
          const m = response ? response.map(x => x?.[ConnectionFields.Meetings] || []).flat() : [];
          setMeetings(m);
        })
        .catch(() => setErrorConnections("Ocurrió un error al obtener las conexiones del Elder"))
    }
  }

  const loadUser = () => {
    setElder(undefined);

    if (id && !Array.isArray(id)) {
      ApiUser.getElderById(id)
        .then(setElder)
        .catch(() => router.push('/404'))
    }
  }

  useEffect(() => {
    if (id && !Array.isArray(id)) {
      loadUser();

      loadConnections();
    }
  }, [id]);

  return (
    <UserProfilePageContext.Provider value={{
      user: elder,
      connections: connections,
      payments: undefined,
      meetings: meetings,
      wallet: undefined,
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
        </Grid>
      </Grid>
    </UserProfilePageContext.Provider>
  );
}

export default ElderProfilePage;
