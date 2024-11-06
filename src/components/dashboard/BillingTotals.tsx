import {Box, Card, CardContent, IconButton, Stack, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Payment, PaymentFields} from "src/types/payments";

import { styled } from '@mui/material/styles'
import {Skeleton} from "@mui/lab";
import {useAppGlobalData} from "src/context/AppDataContext";
import Icon from "src/@core/components/icon";

const Img = styled('img')({
  right: 7,
  bottom: 0,
  height: 177,
  position: 'absolute'
})

const BillingTotals = () => {
  const { payments, reloadPayments } = useAppGlobalData()

  const [totalProfit, setTotalProfit] = useState<Record<string, number>>()

  const calculateTotals = (payments: Payment[]) => {
    const response = payments.reduce((acc: Record<string, number>, payment) => {
      const currency = payment[PaymentFields.CurrencyId];
      const amount = payment[PaymentFields.Amount];
      const profit = amount ? amount * 0.1 : 0;

      if (!acc[currency]) {
        acc[currency] = 0;
      }

      acc[currency] += profit;

      return acc;
    }, {});

    setTotalProfit(response)
  }

  useEffect(() => {
    setTotalProfit(undefined);

    if (payments) calculateTotals(payments);
  }, [payments]);

  return (
    <Card sx={{ overflow: 'visible', position: 'relative' }}>
      <CardContent>
        <Stack direction={'row'} spacing={5} display={'ruby'}>
          <Typography sx={{ mb: 6.5, fontWeight: 600 }}>Ganancia Total</Typography>

          <IconButton size={'small'} onClick={reloadPayments}>
            <Icon fontSize={'18px'} icon='mdi:reload' />
          </IconButton>
        </Stack>

        {
          totalProfit ?
            <Stack direction={'row'}>
            {
              Object.entries(totalProfit).map(([currency, total]) => (
                <Box key={`billingTotals_${currency}`}
                     sx={{ mb: 1.5, rowGap: 1, width: '55%', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}
                >
                  <Typography variant='h5' sx={{ mr: 1.5 }}>
                    {`${total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  </Typography>
                  <Typography
                    component='sup'
                    variant='caption'
                    sx={{ color: 'success.main' }}
                  >
                    {currency}
                  </Typography>
                </Box>
              ))
            }
            </Stack>
            :
            <Skeleton variant={'text'} width={'50%'} />
        }

        <Img src={'/images/cards/tests.png'} alt={"title"} />
      </CardContent>
    </Card>
  )
}

export default BillingTotals;
