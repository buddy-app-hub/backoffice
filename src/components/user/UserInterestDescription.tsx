import React, {useContext, useMemo} from "react";
import {UserProfilePageContext} from "src/context/UserProfilePageContext";
import {Stack, Typography} from "@mui/material";
import {UserFields, UserInterestFields, UserProfileFields} from "src/types/user";
import CustomChip from "src/@core/components/mui/chip";


const UserInterestDescription = () => {
  const { user } = useContext(UserProfilePageContext);
  const interests = useMemo(() => {
    if (user) {
      if (user[UserFields.UserType] === "buddy")
        return user[UserFields.BuddyProfile]?.[UserProfileFields.Interests] ?? []

      return user[UserFields.ElderProfile]?.[UserProfileFields.Interests] ?? []
    }

    return undefined;
  }, [user])

  return (
    <Stack spacing={1}>
      <Typography fontSize={'0.8rem'} fontWeight={500}>Intereses</Typography>

      {
        interests ?
          interests.length ?
            <Stack direction={'row'} display={'flow'} spacing={1}>
              {
                interests.map((i, idx) => (
                  <CustomChip
                    key={`userInterest_${idx}`}
                    skin='light'
                    size='small'
                    label={i[UserInterestFields.Name]}
                    sx={{ textTransform: 'capitalize', width: 'fit-content' }}
                  />
                ))
              }
            </Stack>
            :
            <Typography variant={'subtitle2'} fontSize={'0.725rem'} fontStyle={'italic'}>No tiene interes cargados.</Typography>
          :
          undefined
      }
    </Stack>
  )
}

export default UserInterestDescription;

