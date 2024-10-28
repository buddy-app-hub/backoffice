import {Card, CardHeader, Grid, IconButton} from "@mui/material";
import {DataGrid, GridColDef, GridRenderCellParams, GridSortDirection} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {User, UserFields} from "src/types/user";
import {ApiUser} from "src/services/userApi";
import React from 'react';
import Icon from "src/@core/components/icon";
import {
  columnEmail,
  columnGenre,
  columnName,
  columnRegistrationDate
} from "src/components/user/usersTableColumns";
import EldersTotals from "src/components/elders/EldersTotals";
import {useRouter} from "next/router";

const Elders = () => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState<number>(10);
  const [elders, setElders] = useState<User[]>([]);

  useEffect(() => {
    ApiUser.fetchUsers({ searchElders: true, searchBuddies: false }).then(setElders)
  }, []);

  const columns: GridColDef[] = [
    columnName,
    columnGenre,
    columnEmail,
    columnRegistrationDate,
    {
      flex: 0.01,
      field: 'actions',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <IconButton aria-label='capture screenshot'
                    onClick={() => router.push(`/elders/${params.row[UserFields.FirebaseUID]}`)}
        >
          <Icon icon='mdi:magnify' />
        </IconButton>
      )
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <EldersTotals elders={elders} />
      </Grid>

      <Grid item xs={12} md={9}>
        <Card>
          <CardHeader
            title='Elders'
          />

          <DataGrid
            autoHeight
            rows={elders}
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

export default Elders;
