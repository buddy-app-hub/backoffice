import {Grid, Stack} from "@mui/material";
import UsersTotalQuantity from "../components/dashboard/UsersTotalQuantity";
import BillingTotals from "../components/dashboard/BillingTotals";
import ConnectionsTotals from "../components/dashboard/ConnectionsTotals";
import LastRegisteredUsers from "../components/dashboard/LastRegisteredUsers";
import {tokenStorage} from "../utils/tokenStorage";
import CircularProgress from "@mui/material/CircularProgress";
import PendingWithdrawalsAlert from "../components/dashboard/PendingWithdrawalsAlert";

const Home = () => {

  if (!tokenStorage.get())
    return <CircularProgress />

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={5}>
          <UsersTotalQuantity />

          <BillingTotals />

          <PendingWithdrawalsAlert />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={5}>
          <ConnectionsTotals />

          <LastRegisteredUsers />
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Home
