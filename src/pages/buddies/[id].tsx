import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import UserViewLeft from "../../views/apps/user/view/UserViewLeft";
import UserDetailCard from "../../components/user/UserDetailCard";
import {useEffect, useState} from "react";
import {User} from "../../types/user";
import {ApiUser} from "../../services/userApi";
import {ApiConnection} from "../../services/connectionApi";
import {UserProfilePageContext} from "../../context/UserProfilePageContext";
import { Connection } from "src/types/connections";

const BuddyProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [buddy, setBuddy] = useState<User>();
  const [connections, setConnections] = useState<Connection[]>();

  useEffect(() => {
    if (id && !Array.isArray(id)) {
      ApiUser.getBuddyById(id)
        .then(setBuddy)

      ApiConnection.getConnectionByBuddyId(id)
        .then(setConnections)
    }
  }, [id]);

  return (
    <UserProfilePageContext.Provider value={{
      user: buddy,
      connections: connections,
      payments: undefined
    }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <UserDetailCard />
        </Grid>
      </Grid>
    </UserProfilePageContext.Provider>
  );
}

export default BuddyProfilePage;
