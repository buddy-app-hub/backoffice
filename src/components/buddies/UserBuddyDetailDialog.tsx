import {useEffect, useState} from "react";
import {User, UserFields, UserPersonalDataFields} from "src/types/user";
import {ApiUser} from "../../services/userApi";
import {FirebaseMediaService} from "../../services/firebaseMediaService";
import Dialog from "@mui/material/Dialog";
import BaseDialogTitle from "../BaseDialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {Box, Grid, Stack, Typography} from "@mui/material";
import ButtonGroupAccept from "../ButtonGroupAccept";

interface UserBuddyDetailDialogProps {
  open: boolean,
  user?: User,
  onClose: () => void,
  onSubmit: () => void
}

export function UserBuddyDetailDialog({ open, user, onClose, onSubmit }: UserBuddyDetailDialogProps) {
  const [srcPresentation, setSrcPresentation] = useState<string>();

  const nameBuddy = user ? `${user?.[UserFields.PersonalData]?.[UserPersonalDataFields.FirstName]} ${user?.[UserFields.PersonalData]?.[UserPersonalDataFields.LastName]}` : ''

  const onHandleSubmit = (approve: boolean) => {
    if (user) {
      const promise = approve ? ApiUser.approveBuddy : ApiUser.rejectBuddy;

      promise(user[UserFields.FirebaseUID])
        .then(onSubmit)
    }
  }

  useEffect(() => {
    setSrcPresentation(undefined);
    if (user)
      FirebaseMediaService.getUserVideoPresentation(user[UserFields.FirebaseUID])
        .then(setSrcPresentation);
  }, [user]);

  return (
    <Dialog open={open}
            title={""}
            onClose={onClose}
            maxWidth={'sm'}
            fullWidth
    >
      <BaseDialogTitle title={"Detalle del Buddy"} onClose={onClose} />

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={0}>
              <Typography variant={'body2'}>
                Nombre
              </Typography>
              <Typography variant={'body1'} fontWeight={500}>
                {nameBuddy}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={0}>
              <Typography variant={'body2'}>
                Mail
              </Typography>
              <Typography variant={'body1'} fontWeight={500}>
                {user?.[UserFields.Email]}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography variant={'body2'}>
              Video presentación
            </Typography>

            <Box justifySelf={'center'}>
              {
                srcPresentation &&
                <video controls>
                  <source src={srcPresentation} type="video/mp4" />
                </video>
              }
            </Box>
          </Grid>

          {
            user && user[UserFields.IsApplicationToBeBuddyUnderReview] &&
              <Grid item xs={12}>
                <Typography variant={'body2'}>
                  Estado
                </Typography>

                <Box p={3}>
                  <ButtonGroupAccept onSubmit={onHandleSubmit} />
                </Box>
              </Grid>
          }
        </Grid>
      </DialogContent>
    </Dialog>
  )
}


/*
      */
