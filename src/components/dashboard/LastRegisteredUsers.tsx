import React, {useEffect, useState} from "react";
import {User, UserFields} from "src/types/user";
import {ApiUser} from "src/services/userApi";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {columnEmail, columnGenre, columnName, columnRegistrationDate} from "../user/usersTableColumns";
import {Card, CardHeader} from "@mui/material";

const LastRegisteredUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    ApiUser.fetchUsers()
      .then(response => setUsers(response.slice(0, 5)))
  }, []);

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
        />

        <DataGrid
          autoHeight
          rows={users}
          columns={columns}
          disableSelectionOnClick
          disableColumnMenu
          disableColumnFilter
          getRowId={(row) => row[UserFields.FirebaseUID]}
          hideFooterPagination
        />
      </Card>
    </React.Fragment>
  )
}

export default LastRegisteredUsers;
