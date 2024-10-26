import {Card, CardHeader, IconButton, Typography} from "@mui/material";
import {DataGrid, GridColDef, GridRenderCellParams, GridSortDirection} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {User, UserFields, UserPersonalDataFields} from "src/types/user";
import {ApiUser} from "../../services/userApi";
import React from 'react';
import Box from "@mui/material/Box";
import moment from "moment";
import {router} from "next/client";
import Icon from "../../@core/components/icon";

const Buddies = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [buddies, setBuddies] = useState<User[]>([]);

  useEffect(() => {
    ApiUser.fetchUsers({ searchElders: false, searchBuddies: true }).then(setBuddies)
  }, []);

  const columns: GridColDef[] = [
    {
      flex: 0.15,
      field: 'full_name',
      headerName: 'Name',
      valueGetter: (params) => {
        const personalData = params.row[UserFields.PersonalData];

        if (!personalData) return ''

        return `${personalData[UserPersonalDataFields.FirstName]} ${personalData[UserPersonalDataFields.LastName]}`
      },
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
        const personalData = row[UserFields.PersonalData];
        const fullName = personalData ?
          `${personalData[UserPersonalDataFields.FirstName]} ${personalData[UserPersonalDataFields.LastName]}` : "";

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {/*<UserAvatar user={row} size={'small'} />*/}

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {fullName}
              </Typography>
              <Typography noWrap variant='caption' sx={{ color: 'text.disabled' }}>
                ID: {row[UserFields.FirebaseUID]}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      field: 'genero',
      headerName: 'Género',
      valueGetter: (params) => {
        const personalData = params.row[UserFields.PersonalData];

        if (!personalData) return ''

        return personalData[UserPersonalDataFields.Gender];
      },
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2'
                    sx={{ color: 'text.primary' }}
                    textTransform={'capitalize'}
        >
          {params.row[UserFields.PersonalData][UserPersonalDataFields.Gender] ?? '-'}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: UserFields.Email,
      headerName: 'Mail',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row[UserFields.Email]}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: UserFields.RegistrationDate,
      headerName: 'Registración',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {moment(params.row[UserFields.RegistrationDate]).format("DD/MM/YYYY")}
        </Typography>
      )
    },
    {
      flex: 0.1,
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
