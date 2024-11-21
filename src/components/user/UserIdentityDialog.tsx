import {User, UserFields, UserPersonalDataFields} from "../../types/user";
import {useEffect, useMemo, useState} from "react";
import Dialog from "@mui/material/Dialog";
import BaseDialogTitle from "../BaseDialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {Box, Grid, Stack, Typography} from "@mui/material";
import {FirebaseMediaService} from "../../services/firebaseMediaService";
import IdentityMediaComponent from "./IdentityMediaComponent";
import {Skeleton} from "@mui/lab";
import ButtonGroupAccept from "../ButtonGroupAccept";
import Alert from "@mui/material/Alert";
import {useLoader} from "../../context/LoaderContext";
import {ApiUser} from "../../services/userApi";
import {useAppGlobalData} from "../../context/AppDataContext";

interface UserIdentityDialogProps {
  open: boolean,
  user?: User,
  onClose: () => void,
  onSubmit: () => void
}

interface IdentityMediaType {
  front?: string,
  back?: string,
  selfie?: string
}

const UserIdentityDialog = ({open, user, onClose, onSubmit}: UserIdentityDialogProps) => {
  const { showLoader, hideLoader } = useLoader();
  const { reloadBuddies, reloadElders } = useAppGlobalData();
  const [loading, setLoading] = useState<boolean>(true);
  const [dataMedia, setDataMedia] = useState<IdentityMediaType>({});
  const completedDocumentation = useMemo(() =>
      dataMedia && !!dataMedia.front && !!dataMedia.back && !!dataMedia.selfie
    , [dataMedia]);

  const nameBuddy = user ? `${user?.[UserFields.PersonalData]?.[UserPersonalDataFields.FirstName]} ${user?.[UserFields.PersonalData]?.[UserPersonalDataFields.LastName]}` : ''

  const onHandleSubmit = (approve: boolean) => {
    if (user) {
      showLoader();
      const isBuddy = user[UserFields.UserType] === 'buddy';
      const promise = approve ? ApiUser.validateIdentity : ApiUser.rejectIdentity;

      promise(user[UserFields.FirebaseUID], isBuddy)
        .then(onSubmit)
        .finally(() => {
          if (isBuddy)
            reloadBuddies();
          else
            reloadElders();

          hideLoader();
        })
    }
  }

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

          <Grid item xs={12}>
            {
              loading ?
                <Skeleton />
                :
                completedDocumentation ?
                  user?.[UserFields.IsIdentityValidated] ?
                    <Alert color={"success"} severity={"success"}>
                      Identidad validada
                    </Alert>
                    :
                    <Box p={3}>
                      <ButtonGroupAccept onSubmit={onHandleSubmit} />
                    </Box>
                  :
                  <Alert color={"info"} severity={"info"}>
                    El usuario todavía no cargó toda la documentación requerida
                  </Alert>
            }

          </Grid>

          {/*
              <Grid item xs={12}>
                <Typography variant={'body2'}>
                  Estado
                </Typography>

              </Grid>*/}
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default UserIdentityDialog;
