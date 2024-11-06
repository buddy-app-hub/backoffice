import CustomAvatar from "src/@core/components/mui/avatar";
import CustomChip from "src/@core/components/mui/chip";
import {Box, Button, Card, CardContent, CardHeader, Divider, Stack, Typography} from "@mui/material";
import Icon from "src/@core/components/icon";
import UserAvatar from "./UserAvatar";
import {UserFields, UserPersonalDataFields, UserProfileFields} from "src/types/user";
import {getFullNameUser} from "src/utils/userUtils";
import {Skeleton} from "@mui/lab";
import {DateFormatter} from "src/utils/dateFormatter";
import {useRouter} from "next/router";
import {useContext, useState} from "react";
import {UserProfilePageContext} from "src/context/UserProfilePageContext";
import {NumberFormatter} from "src/utils/numberFormatter";
import {WalletFields} from "src/types/payments";
import UserIdentityDialog from "./UserIdentityDialog";
import StarRatingWithHistory from "../StarRatingWithHistory";
import {MeetingFields} from "src/types/connections";
import UserConditionBuddy from "../buddies/UserConditionBuddy";
import UserConditionElder from "../elders/UserConditionElder";

const UserDetailCard = () => {
  const router = useRouter();
  const { user, connections, wallet, loadUser } = useContext(UserProfilePageContext);
  const isBuddy = user && user[UserFields.UserType] === "buddy";

  const [openIdentityBuddy, setOpenIdentityBuddy] = useState<boolean>(false);

  const handleOpenIdentityBuddy = () => setOpenIdentityBuddy(true);

  const handleCloseIdentityBuddy = () => setOpenIdentityBuddy(false);

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
              <StarRatingWithHistory rating={isBuddy ? user[UserFields.BuddyProfile][UserProfileFields.GlobalRating] : user[UserFields.ElderProfile][UserProfileFields.GlobalRating]}
                                     field={isBuddy ? MeetingFields.ElderReviewForBuddy : MeetingFields.BuddyReviewForElder}
              />
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

      <CardContent sx={{ marginTop: 2 }}>
      {
        user ?
          isBuddy ?
            <UserConditionBuddy user={user} loadUser={loadUser} />
            :
            <UserConditionElder />
          :
            <Stack width={'100%'}>
              <Skeleton />
            </Stack>
      }
      </CardContent>

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
