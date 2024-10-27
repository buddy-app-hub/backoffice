import CustomAvatar from "../../@core/components/mui/avatar";
import CustomChip from "../../@core/components/mui/chip";
import {Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, Typography} from "@mui/material";
import Icon from "../../@core/components/icon";
import UserAvatar from "./UserAvatar";
import {UserFields, UserPersonalDataFields} from "../../types/user";
import {getFullNameUser} from "../../utils/userUtils";
import {Skeleton} from "@mui/lab";
import {DateFormatter} from "src/utils/dateFormatter";
import {useRouter} from "next/router";
import {useContext} from "react";
import {UserProfilePageContext} from "../../context/UserProfilePageContext";
import {NumberFormatter} from "../../utils/numberFormatter";
import {WalletFields} from "../../types/payments";

const UserDetailCard = () => {
  const router = useRouter();
  const { user, connections, wallet } = useContext(UserProfilePageContext)

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

        <Stack direction={'row'} spacing={2} sx={{ mb: 4 }} alignItems={'center'}>
          <Typography variant='h6'>
            {getFullNameUser(user)}
          </Typography>

          {
            user?.[UserFields.IsApprovedBuddy] &&
              <Icon icon={"mdi:check-decagram"}
                    fontSize={'1rem'}
                    style={{ color: 'blue !important' }}
              />
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

          <Button size={'small'}>
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
                              onClick={() => alert('Va')}
                  />
                  :
                  user[UserFields.IsApplicationToBeBuddyUnderReview] ?
                    <CustomChip skin='light'
                                size='medium'
                                label={"Pendiente de aprobación"}
                                color={'warning'}
                                onClick={() => alert('Va')}
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
