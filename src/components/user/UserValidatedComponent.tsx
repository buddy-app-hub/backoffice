import {User, UserFields} from "../../types/user";
import Icon from "../../@core/components/icon";
import Tooltip from "@mui/material/Tooltip";
import {Box} from "@mui/material";

interface UserValidatedComponentProps {
  user?: User
}

const UserValidatedComponent = ({user}: UserValidatedComponentProps) => {
  return (
    user && user[UserFields.IsIdentityValidated] ?
      <Tooltip title={"Identidad validada"}>
        <Box>
          <Icon icon={"mdi:check-decagram"} height={'16px'} width={'16px'} color={"#1DA1F2"} />
        </Box>
      </Tooltip>
      :
      null
  );
}

export default UserValidatedComponent;
