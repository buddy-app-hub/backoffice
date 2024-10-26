import {Grid, Stack} from "@mui/material"
import UsersTotalQuantity from "src/components/dashboard/UsersTotalQuantity";
import ConnectionsTotals from "../../components/dashboard/ConnectionsTotals";
import BillingTotals from "../../components/dashboard/BillingTotals";
import LastRegisteredUsers from "../../components/dashboard/LastRegisteredUsers";

const Dashboards = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={5}>
          <UsersTotalQuantity />

          <BillingTotals />
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

export default Dashboards

