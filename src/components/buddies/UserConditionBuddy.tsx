import React, {useState} from "react";
import {User, UserFields} from "src/types/user";
import {Stack, Typography} from "@mui/material";
import CustomChip from "src/@core/components/mui/chip";
import {Skeleton} from "@mui/lab";
import {UserBuddyDetailDialog} from "./UserBuddyDetailDialog";
import UserInterestDescription from "../user/UserInterestDescription";
import UserDescription from "../user/UserDescription";

interface UserConditionBuddyProps {
  user: User,
  loadUser: () => void
}

const UserConditionBuddy = ({user, loadUser}: UserConditionBuddyProps) => {

  const [openDetailBuddy, setOpenDetailBuddy] = useState<boolean>(false);

  const handleOpenDetailBuddy = () => setOpenDetailBuddy(true);

  const handleCloseDetailBuddy = () => setOpenDetailBuddy(false);

  const onUpdateStatusBuddy = () => {
    setOpenDetailBuddy(false);
    loadUser();
  }

  return (
    <React.Fragment>
      <Stack spacing={2}>
        <Typography variant='body1' fontSize={'0.95rem'} color={'text'} fontWeight={500}>Perfil de Usuario</Typography>

        <Stack width={'100%'} alignItems={'center'}>
          {
            user ?
              user[UserFields.IsApprovedBuddy] ?
                <CustomChip skin='light'
                            size='medium'
                            label={"Aprobado"}
                            color={'success'}
                            onClick={handleOpenDetailBuddy}
                />
                :
                user[UserFields.IsApplicationToBeBuddyUnderReview] ?
                  <CustomChip skin='light'
                              size='medium'
                              label={"Pendiente de aprobación"}
                              color={'warning'}
                              onClick={handleOpenDetailBuddy}
                  />
                  :
                  <CustomChip skin='light'
                              size='medium'
                              label={"En proceso de registración"}
                              color={'primary'}
                  />
              :
              <Skeleton />
          }
        </Stack>

        <UserDescription />

        <UserInterestDescription />
      </Stack>

      <UserBuddyDetailDialog open={openDetailBuddy}
                             user={user}
                             onClose={handleCloseDetailBuddy}
                             onSubmit={onUpdateStatusBuddy}
      />
    </React.Fragment>
  )
}

export default UserConditionBuddy;
