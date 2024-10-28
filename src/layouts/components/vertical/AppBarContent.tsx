// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'
import {Button} from "@mui/material";
import {useSessionUser} from "../../../hooks/useSessionUser";

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  const { hidden, settings, toggleNavVisibility } = props
  const { signOutUser } = useSessionUser();

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden && !settings.navHidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}
      </Box>

      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <Button variant={'contained'}
                color={'primary'}
                sx={{ minWidth: '160px' }}
                onClick={signOutUser}
        >
          Salir
        </Button>
      </Box>
    </Box>
  )
}

export default AppBarContent
