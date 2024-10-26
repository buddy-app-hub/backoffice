import { Grid } from "@mui/material"
import UsersTotalQuantity from "src/components/dashboard/UsersTotalQuantity";
import ConnectionsTotals from "../../components/dashboard/ConnectionsTotals";

const Dashboards = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={4}>
        <UsersTotalQuantity />
      </Grid>

      <Grid item xs={12} md={8}>
        <ConnectionsTotals />
      </Grid>
    </Grid>
  )
}

export default Dashboards

