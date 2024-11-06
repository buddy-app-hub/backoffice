import React from "react";
import {Stack, Typography} from "@mui/material";
import UserInterestDescription from "src/components/user/UserInterestDescription";
import UserDescription from "src/components/user/UserDescription";

const UserConditionElder = () => {

  return (
    <React.Fragment>
      <Stack spacing={2}>
        <Typography variant='body2' fontSize={'0.95rem'} color={'text'} fontWeight={500}>Perfil de Usuario</Typography>

        <UserDescription />

        <UserInterestDescription />
      </Stack>

    </React.Fragment>
  )
}

export default UserConditionElder;
