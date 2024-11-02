import React, {useEffect, useState} from "react";
import {User, UserFields} from "src/types/user";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {columnEmail, columnGenre, columnName, columnRegistrationDate} from "../user/usersTableColumns";
import {Card, CardHeader, IconButton} from "@mui/material";
import {useAppGlobalData} from "src/context/AppDataContext";
import Icon from "src/@core/components/icon";

const sortUserByRegistrationDate = (a: User, b: User) =>
  a[UserFields.RegistrationDate] > b[UserFields.RegistrationDate] ? -1 : 1;

const LastRegisteredUsers = () => {
  const { allUsers, reloadAllUser } = useAppGlobalData();

  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    setUsers(undefined)

    if (allUsers) setUsers(allUsers.sort(sortUserByRegistrationDate).slice(0, 5));
  }, [allUsers]);

  const columns: GridColDef[] = [
    columnName,
    columnGenre,
    columnEmail,
    columnRegistrationDate
  ];

  return (
    <React.Fragment>
      <Card>
        <CardHeader
          title='Últimos 5 usuarios registrados'
          action={
            <IconButton onClick={reloadAllUser}>
              <Icon icon='mdi:reload' />
            </IconButton>
          }
        />

        <DataGrid
          autoHeight
          rows={users || []}
          columns={columns}
          disableSelectionOnClick
          disableColumnMenu
          disableColumnFilter
          getRowId={(row) => row[UserFields.FirebaseUID]}
          hideFooterPagination

          loading={!users}
        />
      </Card>
    </React.Fragment>
  )
}

export default LastRegisteredUsers;
