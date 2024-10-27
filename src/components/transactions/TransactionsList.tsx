import React, {useState} from "react";
import {Transaction, TransactionFields, TransactionStatus, TransactionTypes} from "../../types/payments";
import {Box, Stack, Typography} from "@mui/material";
import {Skeleton} from "@mui/lab";
import Tooltip from "@mui/material/Tooltip";
import Icon from "src/@core/components/icon";
import CustomAvatar from "../../@core/components/mui/avatar";
import {DateFormatter} from "../../utils/dateFormatter";
import {NumberFormatter} from "../../utils/numberFormatter";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";

interface TransactionsListProps {
  transactions?: Transaction[]
}

const sortTransactionsByRegistrationDate = (a: Transaction, b: Transaction) => {
  if (!a[TransactionFields.CreatedAt] && b[TransactionFields.CreatedAt])
    return -1;

  if (a[TransactionFields.CreatedAt] && !b[TransactionFields.CreatedAt])
    return 1;

  // @ts-ignore
  return a[TransactionFields.CreatedAt] > b[TransactionFields.CreatedAt] ? -1 : 1;
}

const TransactionsList = ({transactions}: TransactionsListProps) => {
  const transactionsSorted = transactions ? transactions.sort(sortTransactionsByRegistrationDate) : undefined;
  const lasted = transactionsSorted ? transactionsSorted.slice(0, 6) : [];
  const previous = transactionsSorted ? transactionsSorted.slice(6) : [];

  const [showAll, setShowAll] = useState<boolean>(false);

  const toggleShowAll = () => setShowAll(!showAll);

  return (
    <Stack direction={'column'} spacing={4}>
      {
        transactionsSorted ?
          !transactionsSorted.length ?
            <Alert color={'info'} severity={'info'}>
              El usuario no ha realizado transacciones
            </Alert>
            :
            <React.Fragment>
              {
                lasted.map((t, idx) => (
                  <TransactionsComponent key={`transactionsList_${idx}`}
                                         transaction={t} />
                ))
              }

              <Collapse in={showAll}>
                <Stack spacing={4}>
                  {
                    previous.map((t, idx) => (
                      <TransactionsComponent key={`transactionsList_${idx}`}
                                             transaction={t} />
                    ))
                  }
                </Stack>
              </Collapse>

              <Stack direction={'row'} alignSelf={'center'}>
                <Button onClick={toggleShowAll}>
                  {showAll ? "Ver menos" : "Ver todo"}
                </Button>
              </Stack>
            </React.Fragment>
          :
          Array.from({ length }).map((_, idx) => (
            <Skeleton key={`transactionsListLoading_${idx}`} variant={'text'} width={'100%'} />
          ))
      }
    </Stack>
  )
}

interface TransactionsComponentProps {
  transaction: Transaction
}

const TransactionsComponent = ({transaction}: TransactionsComponentProps) => {
  const status = transaction[TransactionFields.Status];
  const type = transaction[TransactionFields.Type];

  const renderIcon = () => {
    const tooltip = status === TransactionStatus.Canceled ? "Transacción cancelada" :
      status === TransactionStatus.Approved ? "Transacción aprobada" : "Transacción pendiente";
    const icon = status === TransactionStatus.Canceled ? "receipt-text-remove-outline" :
      status === TransactionStatus.Approved ? "receipt-text-plus-outline" : "receipt-text-clock-outline";

    return (
      <Tooltip title={tooltip}>
        <Box>
          <CustomAvatar skin='light-static'
                        variant='rounded'
                        color='secondary'
                        sx={{ mr: 4, width: 30, height: 30 }}
          >
            <Icon icon={`mdi:${icon}`} />
          </CustomAvatar>
        </Box>
      </Tooltip>
    )
  }

  const renderTitle = () => {
    const label = type === TransactionTypes.Deposit ? "Depósito" : "Retiro";
    let acc = "";
    let color = "inherit";
    let weight = 500;
    let size = '0.9rem';

    if (status === TransactionStatus.Pending) {
      acc = " pendiente";
      color = "warning.main";
      weight = 400;
      size = '0.785rem';
    } else if (status === TransactionStatus.Canceled) {
      acc = " cancelado";
    }

    return (
      <Typography variant={'body1'} fontSize={size} fontWeight={weight} color={color}>
        {`${label}${acc}`}
      </Typography>
    )
  }

  const renderAmount = () => {
    let color = "grey.400";
    let prefix = "";
    let weight = 300;
    let fontStyle = undefined;

    if (status === TransactionStatus.Approved) {
      if (type === TransactionTypes.Deposit) {
        color = "success.main";
        prefix = "+ ";
        weight = 500;
      } else {
        color = "error";
        prefix = "- ";
        weight = 500;
      }
    } else {
      fontStyle = 'italic'
    }

    //@ts-ignore
    return (
      <Typography variant={'body2'}
                  color={color}
                  weight={weight}
                  fontStyle={fontStyle}
      >
        {`${prefix}${NumberFormatter.toStringCurrency(transaction[TransactionFields.CurrencyId], transaction[TransactionFields.Amount])}`}
      </Typography>
    )
  }

  return (
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        {renderIcon()}

        <Stack direction={'column'}>
          {renderTitle()}

          <Typography variant={'caption'} fontWeight={500}>
            {DateFormatter.toShortDate(transaction[TransactionFields.CreatedAt])}
          </Typography>

          {/*<Typography variant={'caption'} fontWeight={500}>
            Actualizada
            {' ' }
            {DateFormatter.toShortDate(transaction[TransactionFields.UpdatedAt])}
          </Typography>*/}
        </Stack>
      </Stack>

      {renderAmount()}
    </Stack>
  )
}

export default TransactionsList;
