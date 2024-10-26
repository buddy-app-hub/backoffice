import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {ApexOptions} from 'apexcharts'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

import {Alert, Box, Card, CardContent, CardHeader, Divider, Grid, IconButton, Stack, Typography} from "@mui/material";
import Icon from "src/@core/components/icon";
import CustomAvatar from 'src/@core/components/mui/avatar'
import {hexToRGBA} from 'src/@core/utils/hex-to-rgba'
import {useTheme} from '@mui/material/styles'
import {ApiUser} from "../../services/userApi";
import {User, UserFields} from "../../types/user";

interface UsersTotalQuantityType {
  elders: number,
  buddies: number,
  totals: number
}

const UsersTotalQuantity = () => {
  const theme = useTheme()

  const [userTotals, setUserTotals] = useState<{
    empty: boolean,
    type: UsersTotalQuantityType,
    options: ApexOptions
  }>();
  const [error, setError] = useState<string>();

  const calculateTotals = (users: User[]) => {
    if (!users.length) {
      setUserTotals({ empty: true, type: {} as UsersTotalQuantityType, options: {} })
      return;
    }

    const totals : UsersTotalQuantityType = {
      elders: users.filter(u => u[UserFields.UserType] === 'elder').length,
      buddies: users.filter(u => u[UserFields.UserType] === 'buddy').length,
      totals: users.length
    }

    const chartData: ApexOptions = {
      chart: {
        sparkline: { enabled: true }
      },
      colors: [
        theme.palette.primary.main,
        hexToRGBA(theme.palette.primary.main, 0.4)
      ],
      stroke: { width: 0 },
      legend: { show: false },
      dataLabels: { enabled: false },
      labels: ['Buddies', 'Elders'],
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
                label: 'Total de usuarios',
                color: theme.palette.text.secondary,
                formatter: value => `${value.globals.seriesTotals.reduce((total: number, num: number) => total + num)}`
              }
            }
          }
        }
      }
    }

    setUserTotals({
      empty: false,
      type: totals,
      options: chartData
    })
  }

  const setErrorFetch = () => setError("Ocurrió un error al obtener los usuarios");

  const loadTotals = () => {
    setUserTotals(undefined);
    setError(undefined);

    ApiUser.fetchUsers()
      .then(calculateTotals)
      .catch(setErrorFetch)
  }

  useEffect(() => {
    loadTotals()
  }, []);

  return (
    <Card>
      <CardHeader title='Usuarios'
                  titleTypographyProps={{sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }}}
                  action={
                    <IconButton onClick={loadTotals}>
                      <Icon icon='mdi:reload' />
                    </IconButton>
                  }
      />
      <CardContent>
        {
          error &&
          <Grid container sx={{ my: [0, 4, 1.625] }}>
            <Grid item xs={12} sx={{ mb: [3, 0] }}>
              <Alert color={'error'} severity={'error'}>
                {error}
              </Alert>
            </Grid>
          </Grid>
        }

        {
          userTotals && !userTotals.empty && !error &&
          <Grid container sx={{ my: [0, 4, 1.625] }}>
            <Grid item xs={12} sm={6} sx={{ mb: [3, 0] }}>
              <ReactApexcharts type='donut'
                               height={220}
                               series={[userTotals.type.buddies, userTotals.type.elders]}
                               options={userTotals.options}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ my: 'auto' }}>
              <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3, '& svg': { color: 'primary.main' } }}>
                  <Icon icon='mdi:account-group' />
                </CustomAvatar>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2'>Total de Usuarios</Typography>
                  <Typography variant='h6'>{userTotals.type.totals}</Typography>
                </Box>
              </Box>
              <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
              <Grid container>
                <Grid item xs={12} sx={{ mb: 4 }}>
                  <UsersTotalQuantityLabel label={'Buddies'}
                                           quantity={userTotals.type.buddies}
                                           to={'/buddies'}
                                           color={'primary.main'}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mb: 4 }}>
                  <UsersTotalQuantityLabel label={'Elders'}
                                           quantity={userTotals.type.elders}
                                           to={'/elders'}
                                           color={hexToRGBA(theme.palette.primary.main, 0.4)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        }
      </CardContent>
    </Card>
  )
}

interface UsersTotalQuantityLabelProps {
  label: string,
  quantity: number,
  to: string,
  color: string
}

const UsersTotalQuantityLabel = ({label, quantity, to, color}: UsersTotalQuantityLabelProps) => {
  const router = useRouter();

  const onHandleClick = () => router.push(to);

  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Box
        sx={{
          mb: 1.5,
          display: 'flex',
          alignItems: 'center',
          '& svg': { mr: 1.5, fontSize: '0.75rem', color: color },
          '&:hover': {
            cursor: 'pointer'
        }}}
        onClick={onHandleClick}
      >
        <Icon icon='mdi:circle' />
        <Typography variant='body2'>{label}</Typography>
      </Box>
      <Typography sx={{ fontWeight: 600 }}>{quantity}</Typography>
    </Stack>
  )
}

export default UsersTotalQuantity;
