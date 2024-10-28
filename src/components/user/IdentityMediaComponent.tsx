import {Stack, Typography} from "@mui/material";
import {Skeleton} from "@mui/lab";
import Box from "@mui/material/Box";
import ZoomableMedia from "../ZoomableMedia";
import {useState} from "react";

interface IdentityMediaComponentProps {
  label: string,
  loading: boolean,
  media?: string
}

const IdentityMediaComponent = ({ label, media, loading}: IdentityMediaComponentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Stack direction={'row'}
           justifyContent={'space-between'}
           alignItems={'center'}
           sx={{
             p: 2,
             borderRadius: '10px',
             backgroundColor: '#F4F5FA'
    }}
    >
      <Typography variant={'body2'} fontWeight={500}>
        {label}
      </Typography>

      {
        loading ?
          <Skeleton variant={'rounded'} height={60} width={60} />
          :
          media ?
            <img src={media} height={60} width={60}
                 alt={`${label.replace(/ /g, "")}`}
                 style={{ borderRadius: '4px' }}
                 onClick={() => setIsOpen(true)}
            />
            :
            <Box alignContent={'center'} height={60}>
              <Typography variant={'subtitle2'} fontSize={'0.75rem'} fontStyle={'italic'}>
                Pendiente de carga
              </Typography>
            </Box>
      }

      <ZoomableMedia open={isOpen}
                     media={media || ''}
                     label={`${label.replace(/ /g, "")}_zoom`}
                     setIsOpen={setIsOpen}
      />
    </Stack>
  )
}

export default IdentityMediaComponent;
