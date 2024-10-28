import React, { ReactNode } from 'react';
import {
  DialogTitle,
  DialogTitleProps,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Icon from "../@core/components/icon";

export interface BaseDialogTitleProps extends DialogTitleProps {
  onClose: () => void;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}

function BaseDialogTitle({
                           onClose,
                           title,
                           subtitle,
                           action,
                           ...rest
                         }: BaseDialogTitleProps) {
  return (
    <DialogTitle {...rest}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack>
          <Typography
            variant={'h6'}
            fontWeight={500}
          >
            {title}
          </Typography>
          {
            subtitle &&
            <Typography
              fontSize={'0.925rem'}
              fontStyle={'italic'}
              fontWeight={400}
              color={'text.disabled'}
              mt={1}
            >
              {subtitle}
            </Typography>
          }
        </Stack>

        <Stack direction={'row'} spacing={2} alignItems="center">
          {action && action}
          <IconButton color="default" onClick={onClose}>
            <Icon icon={'mdi:close'} />
          </IconButton>
        </Stack>
      </Stack>
    </DialogTitle>
  );
}

export default BaseDialogTitle;
