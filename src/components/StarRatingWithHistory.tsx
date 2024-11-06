import React, {useState} from "react";
import StarRating from "./StarRating";
import UserReviewsDialog from "./user/UserReviewsDialog";
import {MeetingFields} from "../types/connections";

interface StarRatingWithHistoryProps {
  rating: number,
  field: MeetingFields.ElderReviewForBuddy | MeetingFields.BuddyReviewForElder,
}

const StarRatingWithHistory = ({ rating, field }: StarRatingWithHistoryProps) => {
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const openHistory = () => setShowHistory(true);

  const closeHistory = () => setShowHistory(false);

  return (
    <React.Fragment>
      <StarRating rating={rating}
                  onClick={openHistory}
      />

      <UserReviewsDialog open={showHistory}
                         field={field}
                         onClose={closeHistory}
      />
    </React.Fragment>
  )
}

export default StarRatingWithHistory;
