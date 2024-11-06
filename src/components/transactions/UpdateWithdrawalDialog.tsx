import {Transaction, TransactionFields, TransactionStatus, Wallet, WalletFields} from "src/types/payments";
import {BankAccountFields, User, UserFields} from "src/types/user";
import Dialog from "@mui/material/Dialog";
import BaseDialogTitle from "../BaseDialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {Box, Grid, Stack, Typography} from "@mui/material";
import {getFullNameUser} from "src/utils/userUtils";
import {NumberFormatter} from "src/utils/numberFormatter";
import ButtonGroupAccept from "../ButtonGroupAccept";
import toast from 'react-hot-toast'
import {ApiPayments} from "src/services/paymentApi";
import {useAppGlobalData} from "src/context/AppDataContext";
import {useContext} from "react";
import {UserProfilePageContext} from "src/context/UserProfilePageContext";
import {useLoader} from "src/context/LoaderContext";

interface UpdateWithdrawalDialogProps {
  open: boolean,
  user: User,
  withdraw: Transaction,
  wallet: Wallet,
  onClose: () => void
}

const UpdateWithdrawalDialog = ({open, user, withdraw, wallet, onClose}: UpdateWithdrawalDialogProps) => {
  const { reloadWallets } = useAppGlobalData();
  const { loadUser } = useContext(UserProfilePageContext);
  const { showLoader, hideLoader } = useLoader();

  const onHandleSubmit = (approved: boolean) => {
    showLoader();

    const statusResult = approved ? TransactionStatus.Approved : TransactionStatus.Canceled;

    const updateTransactions = wallet[WalletFields.Transactions].map(t =>
      withdraw === t ? { ...withdraw, [TransactionFields.Status]: statusResult } : t
    )

    ApiPayments.updateWallet(wallet[WalletFields.Id], updateTransactions)
      .then(() => {
        toast.success('El estado del retiro de dinero se ha actualizado correctamente')
        loadUser();
        reloadWallets();
        onClose();
      })
      .catch(() => toast.error('Al parecer ocurrió un error. Vuelva a intentar en unos instantes'))
      .finally(hideLoader)
  }

  return (
    <Dialog open={open}
            title={""}
            onClose={onClose}
            maxWidth={'sm'}
            fullWidth
    >
      <BaseDialogTitle title={"Actualizar retiro"} onClose={onClose} />

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={0}>
              <Typography variant={'body2'}>
                Nombre
              </Typography>
              <Typography variant={'body1'} fontWeight={500}>
                {getFullNameUser(user)}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={0}>
              <Typography variant={'body2'}>
                Retiro solicitado
              </Typography>
              <Typography variant={'body1'} fontWeight={500}>
                {NumberFormatter.toStringCurrency(withdraw[TransactionFields.CurrencyId], withdraw[TransactionFields.Amount])}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={0}>
              <Typography variant={'body2'}>
                Datos bancarios
              </Typography>
              <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <Typography variant={'body1'} fontWeight={500}>
                  {user[UserFields.BankAccount]?.[BankAccountFields.AccountNumber] || "5029123156165151"}
                </Typography>
                <Typography variant={'subtitle2'} fontSize={'0.7rem'}>
                  {` - ${user[UserFields.BankAccount]?.[BankAccountFields.AccountName] || "Banco Santander"}`}
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Box p={3}>
              <ButtonGroupAccept onSubmit={onHandleSubmit} />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateWithdrawalDialog;
