import { Grid } from "@mui/material"
import UsersTotalQuantity from "src/components/dashboard/UsersTotalQuantity";

const Dashboards = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={4}>
        <UsersTotalQuantity />
      </Grid>
    </Grid>
  )
}

export default Dashboards

