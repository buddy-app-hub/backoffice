import React, {useState} from "react";
import {Box, Card, CardContent, Divider, IconButton, Link, Stack, Typography} from "@mui/material";
import {useAppGlobalData} from "src/context/AppDataContext";
import Alert from "@mui/material/Alert";
import {useRouter} from "next/router";
import Collapse from "@mui/material/Collapse";
import {PendingWithdrawalsFields} from "../../types/payments";
import Icon from "../../@core/components/icon";


const PendingWithdrawalsAlert = () => {
  const router = useRouter();
  const {  pendingWithdrawals } = useAppGlobalData();
  const [showUser, setShowUser] = useState<boolean>(false);

  if (!pendingWithdrawals || !pendingWithdrawals.length)
    return null;

  const toggleShowUser = () => setShowUser(!showUser);

  const handleRedirect = () => router.push('/buddies');

  return (
    <Card sx={{ overflow: 'visible', position: 'relative' }}>

      <CardContent>
        <Stack direction={'row'} spacing={5} display={'ruby'}>
          <Typography sx={{ mb: 6.5, fontWeight: 600 }}>Retiros pendientes</Typography>
        </Stack>

        <Stack spacing={2}>
          <Alert color={'warning'} severity={'warning'}>
            Hay retiros pendientes de aprobación —{' '}
            <Link
              component="button"
              onClick={handleRedirect}
              underline="hover"
              color="inherit"
              fontWeight={700}
            >
              revísalos ahora
            </Link>
            !
          </Alert>

          <Stack>
            <Typography variant={'caption'}
                        onClick={toggleShowUser}
                        sx={{ '&:hover': { cursor: 'pointer' } }}
            >
              { !showUser ? "Ver usuarios" : "Ocultar usuarios" }
            </Typography>

            <Collapse in={showUser}>
              <Stack spacing={2}>
                {
                  pendingWithdrawals.map(p => (
                    <Stack key={`pendingWithdrawals_${p[PendingWithdrawalsFields.WalletId]}`}>
                      <Stack direction={'row'}
                             justifyContent={'space-between'}
                             my={2}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                              {p[PendingWithdrawalsFields.BuddyName]}
                            </Typography>
                            <Typography noWrap variant='caption' sx={{ color: 'text.disabled' }}>
                              ID: {p[PendingWithdrawalsFields.BuddyId]}
                            </Typography>
                          </Box>
                        </Box>

                        <IconButton aria-label='capture screenshot'
                                    size={'small'}
                                    onClick={() => router.push(`/buddies/${p[PendingWithdrawalsFields.BuddyId]}`)}
                        >
                          <Icon icon='mdi:magnify' />
                        </IconButton>
                      </Stack>

                      <Divider />
                    </Stack>
                  ))
                }

              </Stack>
            </Collapse>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PendingWithdrawalsAlert;
