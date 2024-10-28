import {useContext} from "react";
import {UserProfilePageContext} from "../../context/UserProfilePageContext";
import {Card, CardHeader, CardContent, Typography, Stack} from "@mui/material";
import {NumberFormatter} from "../../utils/numberFormatter";
import {WalletFields} from "../../types/payments";
import {Skeleton} from "@mui/lab";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TransactionsList from "../transactions/TransactionsList";

const UserWalletDetail = () => {
  const { wallet } = useContext(UserProfilePageContext)


  return (
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

        <Stack direction={'column'} mt={5} spacing={5}>
          <Divider />

          <Typography fontWeight={600}>Transacciones</Typography>

          <TransactionsList transactions={wallet?.[WalletFields.Transactions]} />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default UserWalletDetail;
