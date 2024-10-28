import {Card, CardHeader, Grid, IconButton} from "@mui/material";
import {DataGrid, GridColDef, GridRenderCellParams, GridSortDirection} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {User, UserFields} from "src/types/user";
import {ApiUser} from "../../services/userApi";
import React from 'react';
import Icon from "../../@core/components/icon";
import {
  columnBuddyConfirmed,
  columnEmail,
  columnGenre,
  columnName,
  columnRegistrationDate
} from "src/components/user/usersTableColumns";
import BuddiesTotals from "../../components/buddies/BuddiesTotals";
import {useRouter} from "next/router";

const Buddies = () => {
  const router = useRouter();

  const [pageSize, setPageSize] = useState<number>(10);
  const [buddies, setBuddies] = useState<User[]>([]);

  useEffect(() => {
    ApiUser.fetchUsers({ searchElders: false, searchBuddies: true }).then(setBuddies)
  }, []);

  const columns: GridColDef[] = [
    columnName,
    columnGenre,
    columnEmail,
    columnRegistrationDate,
    columnBuddyConfirmed,
    {
      flex: 0.01,
      field: 'actions',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <IconButton aria-label='capture screenshot'
                    onClick={() => router.push(`/buddies/${params.row[UserFields.FirebaseUID]}`)}
        >
          <Icon icon='mdi:magnify' />
        </IconButton>
      )
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <BuddiesTotals buddies={buddies} />
      </Grid>

      <Grid item xs={12} md={9}>
        <Card>
          <CardHeader
            title='Buddies'
          />

          <DataGrid
            autoHeight
            rows={buddies}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            getRowId={(row) => row[UserFields.FirebaseUID]}
            rowsPerPageOptions={[7, 10, 25, 50]}

            initialState={{
              sorting: {
                sortModel: [{ field: UserFields.RegistrationDate, sort: 'desc' as GridSortDirection }],
              },
            }}

            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Buddies;
