import {User, UserFields} from "../../types/user";
import {ApexOptions} from "apexcharts";
import {hexToRGBA} from "../../@core/utils/hex-to-rgba";
import {Box, Card, Divider, Stack, Typography} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import Icon from "../../@core/components/icon";
import CustomAvatar from "../../@core/components/mui/avatar";
import dynamic from 'next/dynamic';

const ReactApexcharts = dynamic(() => import('src/@core/components/react-apexcharts'), { ssr: false })


interface BuddiesTotalsProps {
  buddies?: User[]
}

interface BuddiesTotalsTypes {
  totals: number,
  toBeConfirmed: number,
  confirmed: number,
  inProcessOfRegistration: number
}

const BuddiesTotals = ({buddies}: BuddiesTotalsProps) => {
  const theme = useTheme();

  const colors = [
    hexToRGBA(theme.palette.success.main, 0.5),
    hexToRGBA(theme.palette.warning.main, 0.5),
    hexToRGBA(theme.palette.primary.main, 0.2)
  ];

  const [totals, setTotals] = useState<{
    empty: boolean,
    type: BuddiesTotalsTypes,
    options: ApexOptions
  }>();

  const calculateTotals = (users: User[]) => {
    if (!users.length) {
      setTotals({ empty: true, type: {} as BuddiesTotalsTypes, options: {} })
      return;
    }

    const totals : BuddiesTotalsTypes = {
      totals: users.length,
      toBeConfirmed: 0,
      confirmed: 0,
      inProcessOfRegistration: 0
    }

    users.forEach(x => {
      if (x[UserFields.IsApprovedBuddy])
        totals.confirmed++;
      else if (x[UserFields.IsApplicationToBeBuddyUnderReview])
        totals.toBeConfirmed++;
      else
        totals.inProcessOfRegistration++;
    });

    const chartData: ApexOptions = {
      chart: {
        sparkline: { enabled: true }
      },
      colors: colors,
      stroke: { width: 0 },
      legend: { show: false },
      dataLabels: { enabled: false },
      labels: ['Confirmados', 'Pendientes de aprobación', 'En proceso'],
      states: {
        hover: {
          filter: { type: 'none' }
        },
        active: {
          filter: { type: 'none' }
        }
      },
      plotOptions: {
        pie: {
          customScale: 0.9,
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: {
                offsetY: 25,
                fontSize: '0.875rem',
                color: theme.palette.text.secondary
              },
              value: {
                offsetY: -15,
                fontWeight: 500,
                formatter: value => `${value}`,
                color: theme.palette.text.primary
              },
              total: {
                show: true,
                fontSize: '0.875rem',
                label: 'Usuarios',
                color: theme.palette.text.secondary,
                formatter: value => `${value.globals.seriesTotals.reduce((total: number, num: number) => total + num)}`
              }
            }
          }
        }
      }
    }

    setTotals({
      empty: false,
      type: totals,
      options: chartData
    })
  }

  useEffect(() => {
    setTotals(undefined);
    if (buddies) calculateTotals(buddies);
  }, [buddies]);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {
              totals && !totals.empty &&
              <Grid container sx={{ my: [0, 4, 1.625] }}>
                <Grid item xs={12} sx={{ mb: [3, 0], aspectRatio: '1 / 1' }} >
                  <ReactApexcharts type='donut'
                                   series={[totals.type.confirmed, totals.type.toBeConfirmed, totals.type.inProcessOfRegistration]}
                                   options={totals.options}
                  />
                </Grid>
                <Grid item xs={12} sx={{ my: 'auto' }}>
                  <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3, '& svg': { color: 'primary.main' } }}>
                      <Icon icon='mdi:human-greeting' />
                    </CustomAvatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='body2'>Total de Buddies</Typography>
                      <Typography variant='h6'>{totals.type.totals}</Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
                  <Grid container>
                    <Grid item xs={12} sx={{ mb: 4 }}>
                      <BuddiesTotalsQuantityLabel label={'Confirmados'}
                                                  quantity={totals.type.confirmed}
                                                  color={colors[0]}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 4 }}>
                      <BuddiesTotalsQuantityLabel label={'Pendientes de aprobación'}
                                                  quantity={totals.type.toBeConfirmed}
                                                  color={colors[1]}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 4 }}>
                      <BuddiesTotalsQuantityLabel label={'En proceso de registración'}
                                                  quantity={totals.type.inProcessOfRegistration}
                                                  color={colors[2]}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            }
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

interface BuddiesTotalsQuantityLabelProps {
  label: string,
  quantity: number,
  color: string
}

const BuddiesTotalsQuantityLabel = ({label, quantity, color}: BuddiesTotalsQuantityLabelProps) => {
  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Box
        sx={{
          mb: 1.5,
          display: 'flex',
          alignItems: 'center',
          '& svg': { mr: 1.5, fontSize: '0.75rem', color: color },
        }}
      >
        <Icon icon='mdi:circle' />
        <Typography variant='body2'>{label}</Typography>
      </Box>
      <Typography sx={{ fontWeight: 600 }}>{quantity}</Typography>
    </Stack>
  )
}

export default BuddiesTotals;
