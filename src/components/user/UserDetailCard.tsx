import CustomAvatar from "../../@core/components/mui/avatar";
import CustomChip from "../../@core/components/mui/chip";
import {Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Typography} from "@mui/material";
import Icon from "../../@core/components/icon";
import UserAvatar from "./UserAvatar";
import { UserFields, UserPersonalDataFields} from "../../types/user";
import {getFullNameUser} from "../../utils/userUtils";
import {Skeleton} from "@mui/lab";
import {DateFormatter} from "src/utils/dateFormatter";
import {useRouter} from "next/router";
import {useContext} from "react";
import {UserProfilePageContext} from "../../context/UserProfilePageContext";

const UserDetailCard = () => {
  const router = useRouter();
  const { user } = useContext(UserProfilePageContext)

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

        <Typography variant='h6' sx={{ mb: 4 }}>
          {getFullNameUser(user)}
        </Typography>
        <CustomChip
          skin='light'
          size='small'
          label={user?.[UserFields.UserType]}
          color={'primary'}
          sx={{ textTransform: 'capitalize' }}
        />
      </CardContent>

      <CardContent sx={{ my: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4, width: 44, height: 44 }}>
              <Icon icon='mdi:check' />
            </CustomAvatar>
            <div>
              <Typography variant='h6'>1.23k</Typography>
              <Typography variant='body2'>Task Done</Typography>
            </div>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4, width: 44, height: 44 }}>
              <Icon icon='mdi:star-outline' />
            </CustomAvatar>
            <div>
              <Typography variant='h6'>568</Typography>
              <Typography variant='body2'>Project Done</Typography>
            </div>
          </Box>
        </Box>
      </CardContent>

      <CardContent>
        <Typography variant='h6'>Detalle</Typography>
        <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
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

      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant='contained' sx={{ mr: 2 }}>
          Edit
        </Button>
        <Button color='error' variant='outlined'>
          Suspend
        </Button>
      </CardActions>
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
