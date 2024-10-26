import {Grid, Stack} from "@mui/material"
import UsersTotalQuantity from "src/components/dashboard/UsersTotalQuantity";
import ConnectionsTotals from "../../components/dashboard/ConnectionsTotals";
import BillingTotals from "../../components/dashboard/BillingTotals";

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
        <ConnectionsTotals />
      </Grid>
    </Grid>
  )
}

export default Dashboards

