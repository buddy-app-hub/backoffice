import {Box, Card, CardContent, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {ApiPayments} from "src/services/paymentApi";
import {Payment, PaymentFields} from "src/types/payments";

import { styled } from '@mui/material/styles'
import {Skeleton} from "@mui/lab";

const Img = styled('img')({
  right: 7,
  bottom: 0,
  height: 177,
  position: 'absolute'
})

const BillingTotals = () => {

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

    ApiPayments.getPayments()
      .then(calculateTotals)
  }, []);

  return (
    <Card sx={{ overflow: 'visible', position: 'relative' }}>
      <CardContent>
        <Typography sx={{ mb: 6.5, fontWeight: 600 }}>Facturación</Typography>

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
