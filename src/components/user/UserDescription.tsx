import React, {useContext, useMemo} from "react";
import {UserProfilePageContext} from "src/context/UserProfilePageContext";
import {Stack, Typography} from "@mui/material";
import {UserFields, UserProfileFields} from "src/types/user";

const UserDescription = () => {
  const { user } = useContext(UserProfilePageContext);
  const userDescription = useMemo(() => {
    if (user) {
      if (user[UserFields.UserType] === "buddy")
        return user[UserFields.BuddyProfile]?.[UserProfileFields.Description]

      return user[UserFields.ElderProfile]?.[UserProfileFields.Description]
    }

    return undefined;
  }, [user])

  return (
    <Stack spacing={1}>
      <Typography fontSize={'0.8rem'} fontWeight={500}>Descripción</Typography>

      {
        user ?
          userDescription ?
            <Typography variant={'subtitle2'} fontSize={'0.745rem'}>
              {userDescription}
            </Typography>
            :
            <Typography variant={'subtitle2'} fontSize={'0.725rem'} fontStyle={'italic'}>No tiene descripción cargada.</Typography>
          :
          undefined
      }
    </Stack>
  )
}

export default UserDescription;

