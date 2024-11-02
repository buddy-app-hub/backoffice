import CustomAvatar from "../../@core/components/mui/avatar";
import CustomChip from "../../@core/components/mui/chip";
import {Box, Button, Card, CardContent, CardHeader, Divider, Stack, Typography} from "@mui/material";
import Icon from "../../@core/components/icon";
import UserAvatar from "./UserAvatar";
import {UserFields, UserPersonalDataFields, UserProfileFields} from "../../types/user";
import {getFullNameUser} from "../../utils/userUtils";
import {Skeleton} from "@mui/lab";
import {DateFormatter} from "src/utils/dateFormatter";
import {useRouter} from "next/router";
import {useContext, useState} from "react";
import {UserProfilePageContext} from "../../context/UserProfilePageContext";
import {NumberFormatter} from "../../utils/numberFormatter";
import {WalletFields} from "../../types/payments";
import {UserBuddyDetailDialog} from "../buddies/UserBuddyDetailDialog";
import UserIdentityDialog from "./UserIdentityDialog";

const UserDetailCard = () => {
  const router = useRouter();
  const { user, connections, wallet, loadUser } = useContext(UserProfilePageContext);
  const isBuddy = user && user[UserFields.UserType] === "buddy";

  const [openDetailBuddy, setOpenDetailBuddy] = useState<boolean>(false);
  const [openIdentityBuddy, setOpenIdentityBuddy] = useState<boolean>(false);

  const handleOpenDetailBuddy = () => setOpenDetailBuddy(true);

  const handleCloseDetailBuddy = () => setOpenDetailBuddy(false);

  const handleOpenIdentityBuddy = () => setOpenIdentityBuddy(true);

  const handleCloseIdentityBuddy = () => setOpenIdentityBuddy(false);

  const onUpdateStatusBuddy = () => {
    setOpenDetailBuddy(false);
    loadUser();
  }

  const onNavigateBack = () => router.back();

  const actionHeader =
    <Button startIcon={<Icon icon={"mdi:keyboard-backspace"} />} onClick={onNavigateBack}>
      Volver
    </Button>;

  return (
    <Card>
      <CardHeader action={actionHeader} />

      <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

        <UserAvatar user={user} />

        <Stack direction={'row'} spacing={5} sx={{ mt: 1, mb: 3 }} alignItems={'center'}>
          <Typography variant='h6'>
            {getFullNameUser(user)}
          </Typography>

          {
            user ?
              <Stack direction={'row'} spacing={1} alignItems={'initial'} sx={{ mt: '3px !important' }}>
                <Icon icon='mdi:star' fontSize={'18px'} color={'rgba(255, 180, 0, 1)'} />

                <Typography variant='caption' fontSize={'0.8rem'}>
                  {
                    isBuddy ?
                      user[UserFields.BuddyProfile][UserProfileFields.GlobalRating].toLocaleString('en-EN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
                      :
                      user[UserFields.ElderProfile][UserProfileFields.GlobalRating].toLocaleString('en-EN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
                  }
                </Typography>
              </Stack>
              :
              null
          }
        </Stack>

        <CustomChip
          skin='light'
          size='small'
          label={user?.[UserFields.UserType]}
          color={'secondary'}
          sx={{ textTransform: 'capitalize' }}
        />
      </CardContent>

      <CardContent sx={{ my: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {
            isBuddy &&
              <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4, width: 44, height: 44 }}>
                  <Icon icon='mdi:wallet-bifold' />
                </CustomAvatar>
                <div>
                  {
                    wallet ?
                      <Typography variant='h6'>
                        {NumberFormatter.priceToStringCurrency(wallet[WalletFields.Total])}
                      </Typography>
                      :
                      <Skeleton variant={'text'} width={'50%'} />
                  }
                  <Typography variant='body2'>Ganancia total</Typography>
                </div>
              </Box>
          }
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4, width: 44, height: 44 }}>
              <Icon icon='mdi:connection' />
            </CustomAvatar>
            <div>
              {
                connections ?
                  <Typography variant='h6'>{connections.length}</Typography>
                  :
                  <Skeleton variant={'text'} width={'50%'} />
              }
              <Typography variant='body2'>Conexiones</Typography>
            </div>
          </Box>
        </Box>
      </CardContent>

      <CardContent>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant='h6'>Detalle</Typography>

          <Button size={'small'} onClick={handleOpenIdentityBuddy}>
            Ver identidad
          </Button>
        </Stack>
        <Divider sx={{ mt: theme => `${theme.spacing(2)} !important`, mb: theme => `${theme.spacing(4)} !important` }} />
        <Box sx={{ pb: 1 }}>
          <DataValueProfile label={'ID'}
                            value={user?.[UserFields.FirebaseUID]}
          />

          <DataValueProfile label={'Mail'}
                            value={user?.[UserFields.Email]}
          />

          <DataValueProfile label={'Fecha de Registración'}
                            value={user ? DateFormatter.toShortDate(user[UserFields.RegistrationDate]) : undefined}
          />

          <DataValueProfile label={'Nombre'}
                            value={user?.[UserFields.PersonalData]?.[UserPersonalDataFields.FirstName]}
          />

          <DataValueProfile label={'Apellido'}
                            value={user?.[UserFields.PersonalData]?.[UserPersonalDataFields.LastName]}
          />

          <DataValueProfile label={'Género'}
                            value={user?.[UserFields.PersonalData]?.[UserPersonalDataFields.Gender]}
          />
        </Box>
      </CardContent>

      {
        isBuddy &&
          <CardContent sx={{ marginTop: 2 }}>
            <Stack spacing={2}>
              <Typography variant='body2' color={'text'} fontWeight={500}>Condición de Buddy</Typography>

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
            </Stack>
          </CardContent>
      }

      <UserBuddyDetailDialog open={openDetailBuddy}
                             user={user}
                             onClose={handleCloseDetailBuddy}
                             onSubmit={onUpdateStatusBuddy}
      />

      <UserIdentityDialog open={openIdentityBuddy}
                          user={user}
                          onClose={handleCloseIdentityBuddy}
      />
    </Card>
  )
}

interface DataValueProfileProps {
  label: string,
  value?: string
}

const DataValueProfile = ({label, value}: DataValueProfileProps) => {
  return (
    <Box sx={{ display: 'flex', mb: 2 }}>
      <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{label}:</Typography>
      {
        value ?
          <Typography variant='body2'>{value}</Typography>
          :
          <Skeleton variant={'text'} width={'60%'} />
      }
    </Box>
  )
}

export default UserDetailCard;
