import {Divider, Stack, Typography} from "@mui/material";
import {Meeting, MeetingFields, MeetingScheduleFields, ReviewFields, ReviewWithData} from "src/types/connections";
import {useAppGlobalData} from "src/context/AppDataContext";
import {useContext, useEffect, useState} from "react";
import {UserProfilePageContext} from "src/context/UserProfilePageContext";
import {User, UserFields} from "src/types/user";
import {getFullNameUser} from "src/utils/userUtils";
import {DateFormatter} from "src/utils/dateFormatter";
import StarRating from "../StarRating";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import BaseDialogTitle from "../BaseDialogTitle";
import {Skeleton} from "@mui/lab";
import Alert from "@mui/material/Alert";

interface UserReviewsDialogProps {
  open: boolean,
  field: MeetingFields.ElderReviewForBuddy | MeetingFields.BuddyReviewForElder,
  onClose: () => void
}

const UserReviewsDialog = ({ open, field, onClose }: UserReviewsDialogProps) => {
  const { elders, buddies } = useAppGlobalData();
  const { meetings } = useContext(UserProfilePageContext);

  const [dataReviews, setDataReviews] = useState<ReviewWithData[]>();

  const loadReviews = (lstMettings: Meeting[], users: User[], fieldId: MeetingFields.ElderId | MeetingFields.BuddyId) => {
    const reviews : ReviewWithData[] = [];


    lstMettings.forEach(m => {
      if (m[field]) {
        const user = users.find(u => u[UserFields.FirebaseUID] === m[fieldId]);

        if (user)
          reviews.push({
            ...m[field],
            [ReviewFields.UserName]: getFullNameUser(user),
            [ReviewFields.Date]: m[MeetingFields.Schedule][MeetingScheduleFields.Date],
          })
      }
    });

    setDataReviews(reviews);
  }

  useEffect(() => {
    setDataReviews(undefined);
    if (meetings) {
      if (field === MeetingFields.ElderReviewForBuddy && elders) {
        loadReviews(meetings, elders, MeetingFields.ElderId);
      }
      if (field === MeetingFields.BuddyReviewForElder && buddies) {
        loadReviews(meetings, buddies, MeetingFields.BuddyId);
      }
    }
  }, [meetings]);

  return (
    <Dialog open={open}
            title={""}
            onClose={onClose}
            maxWidth={'sm'}
            fullWidth
    >
      <BaseDialogTitle title={"Comentarios recibidos"} onClose={onClose} />

      <DialogContent>
        <Stack>
          {
            dataReviews ?
              dataReviews.length ?
                dataReviews.map((r, idx) => (
                  <Stack key={`review_${idx}`}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <Typography variant={'body1'} fontSize={'0.9rem'} fontWeight={500}>
                          {r[ReviewFields.UserName]}
                        </Typography>
                        <Typography variant={'caption'}>
                          - {DateFormatter.toShortDate(r[ReviewFields.Date])}
                        </Typography>
                      </Stack>

                      <StarRating rating={r[ReviewFields.Rating]} />
                    </Stack>

                    <Typography variant={'caption'}>
                      {r[ReviewFields.Comment]}
                    </Typography>
                    <Divider />
                  </Stack>
                ))
                :
                <Alert color={'info'} severity={'info'}>
                  No se han encontrado comentarios recibidos para el usuario actual
                </Alert>
              :
              <Stack>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </Stack>
          }
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default UserReviewsDialog;
