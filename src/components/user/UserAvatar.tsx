import {useEffect, useState} from "react";
import {FirebaseMediaService} from "src/services/firebaseMediaService";
import {User, UserFields, UserPersonalDataFields} from "src/types/user";
import CustomAvatar from 'src/@core/components/mui/avatar'
import {getInitialsByUser} from "../../utils/userUtils";
import { Skeleton } from "@mui/lab";

interface UserAvatarProps {
  user?: User,
  size?: 'small' | 'medium'
}

const UserAvatar = ({user, size = 'medium'}: UserAvatarProps) => {
  const avatarSize = (size === 'medium') ? 120 : 40;
  const variant = (size === 'medium') ? 'rounded' : 'circular';

  const [loading, setLoading] = useState<boolean>(true);
  const [mediaProfile, setMediaProfile] = useState<string>();

  useEffect(() => {
    if (user) {
      setLoading(true);
      FirebaseMediaService.getUserProfileMedia(user[UserFields.FirebaseUID])
        .then(setMediaProfile)
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user || loading)
    return <Skeleton variant={variant} width={avatarSize} height={avatarSize} />;

  if (mediaProfile)
    return (
      <CustomAvatar
        src={mediaProfile}
        variant={variant}
        alt={user[UserFields.PersonalData][UserPersonalDataFields.FirstName]}
        sx={{ width: avatarSize, height: avatarSize }}
      />
    )

  return (
    <CustomAvatar
      skin='light'
      variant={variant}
      sx={{ width: avatarSize, height: avatarSize, fontWeight: 600, mb: 4, fontSize: '3rem' }}
    >
      {getInitialsByUser(user)}
    </CustomAvatar>
  )

}

export default UserAvatar;
