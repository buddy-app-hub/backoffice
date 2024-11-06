import React, {useContext, useState} from "react";
import {UserProfilePageContext} from "src/context/UserProfilePageContext";
import {Card, CardContent, CardHeader, Link, Stack, Typography} from "@mui/material";
import {NumberFormatter} from "src/utils/numberFormatter";
import {TransactionFields, TransactionStatus, TransactionTypes, WalletFields} from "src/types/payments";
import {Skeleton} from "@mui/lab";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TransactionsList from "../transactions/TransactionsList";
import Alert from "@mui/material/Alert";
import UpdateWithdrawalDialog from "../transactions/UpdateWithdrawalDialog";

const UserWalletDetail = () => {
  const { user, wallet } = useContext(UserProfilePageContext);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const userPendingWithdrawals = (wallet && user) ?
    wallet[WalletFields.Transactions].find(t =>
      t[TransactionFields.Type] === TransactionTypes.Withdraw &&
      t[TransactionFields.Status] === TransactionStatus.Pending)
    :
    undefined;

  const openUpdate = () => setShowUpdate(true);

  const closeUpdate = () => setShowUpdate(false);

  return (
    <React.Fragment>
      <Card>
        <CardHeader title={'Billetera'} />

        <CardContent sx={{ pt: theme => `${theme.spacing(0.75)} !important` }}>
          <Stack direction={{ xs: 'column', md: 'row' }}
                 justifyContent={'space-between'}
                 spacing={1}
          >
            <Box>
              {
                wallet ?
                  <Typography variant='h6'>
                    {NumberFormatter.priceToStringCurrency(wallet[WalletFields.Total])}
                  </Typography>
                  :
                  <Skeleton variant={'text'} width={'50%'} />
              }
              <Typography variant='body2'>Ganancia total</Typography>
            </Box>

            <Box>
              {
                wallet ?
                  <Typography variant='h6'>
                    {NumberFormatter.priceToStringCurrency(wallet[WalletFields.Balance])}
                  </Typography>
                  :
                  <Skeleton variant={'text'} width={'50%'} />
              }
              <Typography variant='body2'>Saldo Actual</Typography>
            </Box>
          </Stack>

          {
            userPendingWithdrawals &&
            <Stack mt={5}>
              <Alert color={'warning'} severity={'warning'}>
                El usuario ha solicitado el retiro de su saldo actual —{' '}
                <Link
                  component="button"
                  underline="hover"
                  color="inherit"
                  fontWeight={700}
                  onClick={openUpdate}
                >
                  revísalo ahora
                </Link>
                !
              </Alert>
            </Stack>
          }

          <Stack direction={'column'} mt={5} spacing={5}>
            <Divider />

            <Typography fontWeight={600}>Transacciones</Typography>

            <TransactionsList transactions={wallet?.[WalletFields.Transactions]} />
          </Stack>
        </CardContent>
      </Card>

      {
        user && wallet && userPendingWithdrawals &&
          <UpdateWithdrawalDialog open={showUpdate}
                                  user={user}
                                  wallet={wallet}
                                  withdraw={userPendingWithdrawals}
                                  onClose={closeUpdate}
          />
      }
    </React.Fragment>
  )
}

export default UserWalletDetail;
