import {useState} from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";

enum StatusRejectAccept {
  Accept,
  Reject
}

interface ButtonGroupAcceptProps {
  onSubmit: (_: boolean) => void
}

const ButtonGroupAccept = ({onSubmit}: ButtonGroupAcceptProps) => {
  const [value, setValue] = useState<StatusRejectAccept>();

  const onHandleSubmit = () => {
    if (value != undefined)
      onSubmit(value === StatusRejectAccept.Accept);
  }

  const onClickReject = () => setValue(StatusRejectAccept.Reject);

  const onClickAccept = () => setValue(StatusRejectAccept.Accept);

  return (
    <Stack direction={'row'} width={'100%'} justifyContent={'space-between'}>
      <ToggleButtonGroup exclusive
                         color='primary'
                         value={value}
                         size={'small'}
      >
        <ToggleButton value={StatusRejectAccept.Reject}
                      color={"error"}
                      onClick={onClickReject}
        >
          Rechazar
        </ToggleButton>
        <ToggleButton value={StatusRejectAccept.Accept}
                      color={"success"}
                      onClick={onClickAccept}
        >
          Aceptar
        </ToggleButton>
      </ToggleButtonGroup>

      <Button variant={'contained'} onClick={onHandleSubmit}>
        Confirmar
      </Button>
    </Stack>
  )
}

export default ButtonGroupAccept;
