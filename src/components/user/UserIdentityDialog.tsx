import {User, UserFields, UserPersonalDataFields} from "../../types/user";
import {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import BaseDialogTitle from "../BaseDialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {Box, Grid, Stack, Typography} from "@mui/material";
import ButtonGroupAccept from "../ButtonGroupAccept";
import {FirebaseMediaService} from "../../services/firebaseMediaService";
import IdentityMediaComponent from "./IdentityMediaComponent";

interface UserIdentityDialogProps {
  open: boolean,
  user?: User,
  onClose: () => void,
}

interface IdentityMediaType {
  front?: string,
  back?: string,
  selfie?: string
}

const UserIdentityDialog = ({open, user, onClose}: UserIdentityDialogProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataMedia, setDataMedia] = useState<IdentityMediaType>({});

  const nameBuddy = user ? `${user?.[UserFields.PersonalData]?.[UserPersonalDataFields.FirstName]} ${user?.[UserFields.PersonalData]?.[UserPersonalDataFields.LastName]}` : ''

  const searchIdentityMedia = (id: string) => {
    setLoading(true);
    setDataMedia({});

    FirebaseMediaService.getUserIdentityMedia(id)
      .then(response => {
        const media : IdentityMediaType = {};

        response.forEach(urlPhoto => {
          if (urlPhoto.includes("front_id")) {
            media.front = urlPhoto
          }
          else if (urlPhoto.includes("back_id")) {
            media.back = urlPhoto
          }
          else if (urlPhoto.includes("selfie")) {
            media.selfie = urlPhoto
          }
        });

        setDataMedia(media)
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setDataMedia({});
    if (open && user)
      searchIdentityMedia(user[UserFields.FirebaseUID]);
  }, [open, user]);

  return (
    <Dialog open={open}
            title={""}
            onClose={onClose}
            maxWidth={'sm'}
            fullWidth
    >
      <BaseDialogTitle title={"Identidad del usuario"} onClose={onClose} />

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
              Documentación
            </Typography>

            <Stack spacing={4}>
              <IdentityMediaComponent label={"Frente DNI"}
                                      loading={loading}
                                      media={dataMedia?.front}
              />

              <IdentityMediaComponent label={"Dorso DNI"}
                                      loading={loading}
                                      media={dataMedia?.back}
              />

              <IdentityMediaComponent label={"Prueba de Vida"}
                                      loading={loading}
                                      media={dataMedia?.selfie}
              />
            </Stack>
          </Grid>

        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default UserIdentityDialog;
