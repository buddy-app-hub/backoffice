import {GenderTypes, User, UserFields, UserPersonalDataFields} from "../../types/user";
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

const chartDataDefault: ApexOptions = {
  chart: {
    sparkline: { enabled: true }
  },
  colors: [],
  stroke: { width: 0 },
  legend: { show: false },
  dataLabels: { enabled: false },
  labels: ['Con identidad verificada', 'No verificaron identidad'],
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
        size: '70%'
        }
      }
    }
  };

interface EldersTotalsProps {
  elders?: User[]
}

interface EldersTotalsTypes {
  totals: number,
  male: number,
  female: number,
  nonBinary: number,
  another: number,
  prefersNotToSay: number
}

const EldersTotals = ({elders}: EldersTotalsProps) => {
  const theme = useTheme();

  const colors = [
    hexToRGBA(theme.palette.success.main, 0.5),
    hexToRGBA(theme.palette.primary.main, 0.2),
    hexToRGBA(theme.palette.warning.main, 0.4),
    hexToRGBA(theme.palette.error.main, 0.5),
    hexToRGBA(theme.palette.grey[400], 0.5),
  ];

  const [totals, setTotals] = useState<{
    empty: boolean,
    type: EldersTotalsTypes,
    options: ApexOptions
  }>();

  const calculateTotals = (users: User[]) => {
    if (!users.length) {
      setTotals({ empty: true, type: {} as EldersTotalsTypes, options: chartDataDefault })
      return;
    }

    const totals : EldersTotalsTypes = {
      totals: users.length,
      male: 0,
      female: 0,
      nonBinary: 0,
      another: 0,
      prefersNotToSay: 0
    }

    users.forEach(x => {
      const personalData = x[UserFields.PersonalData];

      if (!personalData) {
        totals.prefersNotToSay++;
        return;
      }

      const gender = personalData[UserPersonalDataFields.Gender].toLowerCase();

      switch (gender) {
        case GenderTypes.Male:
          totals.male++;
          return;
        case GenderTypes.Female:
          totals.female++;
          return;
        case GenderTypes.NonBinary:
          totals.nonBinary++;
          return;
        case GenderTypes.Another:
          totals.another++;
          return;
        case GenderTypes.PrefersNotToSay:
        default:
          totals.prefersNotToSay++;
          return;
      }
    });

    const chartData: ApexOptions = {
      chart: {
        sparkline: { enabled: true }
      },
      colors: colors,
      stroke: { width: 0 },
      legend: { show: false },
      dataLabels: { enabled: false },
      labels: ['Masculinos', 'Femeninos', 'No binarios', 'Otros', 'Prefiere no decir'],
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
    if (elders) calculateTotals(elders);
  }, [elders]);

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
                                   series={[
                                     totals.type.male, totals.type.female, totals.type.nonBinary,
                                     totals.type.another, totals.type.prefersNotToSay]}
                                   options={totals.options}
                  />
                </Grid>
                <Grid item xs={12} sx={{ my: 'auto' }}>
                  <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3, '& svg': { color: 'primary.main' } }}>
                      <Icon icon='mdi:human-cane' />
                    </CustomAvatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='body2'>Total de Adultos Mayores</Typography>
                      <Typography variant='h6'>{totals.type.totals}</Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
                  <Grid container>
                    <EldersTotalsQuantityLabel label={'Masculinos'}
                                                quantity={totals.type.male}
                                                color={colors[0]}
                    />
                    <EldersTotalsQuantityLabel label={'Femeninos'}
                                                quantity={totals.type.female}
                                                color={colors[1]}
                    />
                    <EldersTotalsQuantityLabel label={'No binarios'}
                                               quantity={totals.type.nonBinary}
                                               color={colors[2]}
                    />
                    <EldersTotalsQuantityLabel label={'Otros'}
                                               quantity={totals.type.another}
                                               color={colors[3]}
                    />
                    <EldersTotalsQuantityLabel label={'Prefiere no decir'}
                                               quantity={totals.type.prefersNotToSay}
                                               color={colors[4]}
                    />
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

interface EldersTotalsQuantityLabelProps {
  label: string,
  quantity: number,
  color: string
}

const EldersTotalsQuantityLabel = ({label, quantity, color}: EldersTotalsQuantityLabelProps) => {
  return (
    quantity > 0 ?
      <Grid item xs={12} sx={{ mb: 4 }}>
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
      </Grid>
      :
      <React.Fragment />
  )
}

export default EldersTotals;
