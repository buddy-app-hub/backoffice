import {Link, Stack, Typography} from "@mui/material";
import Icon from "../@core/components/icon";
import React from "react";

interface StarRatingProps {
  rating: number,
  onClick?: () => void
}

const StarRating = ({ rating, onClick }: StarRatingProps) => {
  const ratingRounded = rating.toLocaleString('en-EN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  const component =
    <Typography variant='caption' fontSize={'0.8rem'}>
      {ratingRounded}
    </Typography>;

  return (
    <Stack direction={'row'} spacing={1} alignItems={'initial'}>
      <Icon icon='mdi:star' fontSize={'18px'} color={'rgba(255, 180, 0, 1)'} />

      {
        onClick ?
          <Link
            component="button"
            underline="hover"
            color="inherit"
            onClick={onClick}
          >
            {component}
          </Link>
          :
          component
      }
    </Stack>
  )
}

export default StarRating;
