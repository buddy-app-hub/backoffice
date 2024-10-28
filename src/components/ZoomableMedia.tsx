import {Backdrop, Box} from "@mui/material";

interface ZoomableMediaProps {
  open: boolean;
  media: string;
  label: string;
  setIsOpen: (open: boolean) => void;
}

const ZoomableMedia = ({open, media, label, setIsOpen}: ZoomableMediaProps) => {
  return (
    <Backdrop
      open={open}
      onClick={() => setIsOpen(false)}
      sx={{ zIndex: 1300, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <Box
        component="img"
        src={media}
        alt={`${label.replace(/ /g, '')}_zoom`}
        sx={{ width: 'auto', height: 'auto', maxHeight: '50vh', }}
      />
    </Backdrop>
  );
}

export default ZoomableMedia;
