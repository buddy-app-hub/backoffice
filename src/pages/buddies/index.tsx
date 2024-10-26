import {Card, CardHeader, IconButton} from "@mui/material";
import {DataGrid, GridColDef, GridRenderCellParams, GridSortDirection} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {User, UserFields} from "src/types/user";
import {ApiUser} from "../../services/userApi";
import React from 'react';
import {router} from "next/client";
import Icon from "../../@core/components/icon";
import {columnEmail, columnGenre, columnName, columnRegistrationDate} from "src/components/user/usersTableColumns";

const Buddies = () => {
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
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default Buddies;
