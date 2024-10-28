import {Box, Card, CardContent, CardHeader, Grid, Stack, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import dynamic from 'next/dynamic';
import {useContext, useEffect, useState} from "react";
import {UserProfilePageContext} from "../../context/UserProfilePageContext";
import {Transaction, TransactionFields, TransactionStatus, TransactionTypes, WalletFields} from "../../types/payments";
import {ApexOptions} from "apexcharts";
import Alert from "@mui/material/Alert";
import {Skeleton} from "@mui/lab";
import {hexToRGBA} from "../../@core/utils/hex-to-rgba";
import CustomAvatar from "../../@core/components/mui/avatar";
import Icon from "../../@core/components/icon";
import {NumberFormatter} from "../../utils/numberFormatter";

const ReactApexcharts = dynamic(() => import('src/@core/components/react-apexcharts'), { ssr: false })

const getLastFourMonths = () => {
  const months: string[] = [];
  const today = new Date();

  for (let i = 0; i < 5; i++) {
    const monthDate = new Date(today.getFullYear(), today.getMonth() - i);
    const monthKey = `${monthDate.getMonth() + 1}-${monthDate.getFullYear()}`; // Ej: "2024-10"
    months.push(monthKey);
  }

  return months.reverse();
};

interface ProfitPerMonthsType {
  totalDeposit: number,
  totalWithdraw: number,
}

interface SeriesType {
  name: string,
  data: number[],
  color: string,
  bgColor: string
}

const UserProfitPerMonths = () => {
  const { getSeries, getOptions } = ChartTransactionTemplate()
  const { wallet } = useContext(UserProfilePageContext);
  const [data, setData] = useState<
    { empty: boolean, series: SeriesType[], options: ApexOptions }>()

  const calculateTotals = (transactions: Transaction[]) => {
    const lastFourMonths = getLastFourMonths();
    const approveTransactions = transactions.filter(x => x[TransactionFields.Status] === TransactionStatus.Approved);

    if (!approveTransactions.length) {
      setData({ empty: true, series: [], options: {} });

      return;
    }

    const totalsByMonth = lastFourMonths.reduce((acc, month) => {
      acc[month] = {
        totalDeposit: 0,
        totalWithdraw: 0,
      };

      return acc;
    }, {} as Record<string, ProfitPerMonthsType>);

    approveTransactions.forEach((transaction) => {
      const createdAt = transaction[TransactionFields.CreatedAt];
      if (createdAt) {
        const dateCreate = new Date(createdAt);

        const monthKey = `${dateCreate.getMonth() + 1}-${dateCreate.getFullYear()}`;
        const amount = transaction[TransactionFields.Amount]

        if (totalsByMonth[monthKey] !== undefined && !!amount) {
          if (transaction[TransactionFields.Type] === TransactionTypes.Deposit)
            totalsByMonth[monthKey].totalDeposit += amount;
          else
            totalsByMonth[monthKey].totalWithdraw += amount;
        }
      }
    });

    setData({
      empty: false,
      series: getSeries(totalsByMonth),
      options: getOptions(totalsByMonth)
    })
  }

  useEffect(() => {
    if (wallet)
      calculateTotals(wallet?.[WalletFields.Transactions] || [])
  }, [wallet]);

  return (
    <Card>
      <Grid container>
        <Grid item xs={12}>
          <CardContent sx={{ height: '100%', '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
            <Typography variant='h6'>Transacciones últimos 5 meses</Typography>
            {
              !data ?
                <Skeleton />
                :
                data.empty ?
                  <Box mt={5}>
                    <Alert color={'info'} severity={'info'}>
                      El usuario no tiene transacciones aprobadas
                    </Alert>
                  </Box>
                  :
                  <ReactApexcharts type='bar' height={282} series={data.series} options={data.options} />
            }
          </CardContent>
        </Grid>
        {
          data && !data.empty && data.series &&
          <Grid item xs={12}>
            <CardHeader
              title=''
              subheader='Totales'
              subheaderTypographyProps={{ sx: { lineHeight: '1.25rem', fontSize: '0.875rem !important' } }}
              titleTypographyProps={{
                sx: {
                  fontSize: '1.5rem !important',
                  lineHeight: '2rem !important',
                  letterSpacing: '0.43px !important'
                }
              }}
            />
            <CardContent
              sx={{ pt: theme => `${theme.spacing(4)} !important`, pb: theme => `${theme.spacing(5.5)} !important` }}
            >
              <Stack direction={'row'} spacing={1} justifyContent={'space-between'}>
                {
                  data.series.map((s, i) => (
                    <Box key={`dataUserProfitPerMonths_${i}`} sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar skin='light'
                                    variant='rounded'
                                    sx={{mr: 4,
                                      width: 30,
                                      height: 30,
                                      color: s.color,
                                      backgroundColor: s.bgColor,
                                    }}
                      >
                        <Icon icon={`mdi:${i === 0 ? "hand-coin" : "arrow-up-bold-circle-outline"}`} />
                      </CustomAvatar>
                      <div>
                        <Typography variant='body1'>
                          {NumberFormatter.toStringCurrency("ARS", s.data.reduce((ac, r) => r + ac, 0))}
                        </Typography>
                        <Typography variant='body2'>{s.name}</Typography>
                      </div>
                    </Box>
                  ))
                }
              </Stack>
            </CardContent>
          </Grid>
        }
      </Grid>
    </Card>
  )
}

export default UserProfitPerMonths;


const ChartTransactionTemplate = () => {
  const theme = useTheme();

  const getSeries = (data: Record<string, ProfitPerMonthsType>) : SeriesType[] => {
    const deposits: number[] = [];
    const withdrawals: number[] = [];

    Object.values(data).forEach((p: ProfitPerMonthsType) => {
      deposits.push(p.totalDeposit);
      withdrawals.push(p.totalWithdraw);
    });

    return [
      {
        name: "Depósitos",
        data: deposits,
        color: hexToRGBA(theme.palette.success.main, 0.7),
        bgColor: hexToRGBA(theme.palette.success.main, 0.1),
      },
      {
        name: "Retiros",
        data: withdrawals,
        color: hexToRGBA(theme.palette.primary.main, 0.7),
        bgColor: hexToRGBA(theme.palette.primary.main, 0.1),
      }
    ]
  }

  const getOptions = (data: Record<string, ProfitPerMonthsType>): ApexOptions => {

    Object.keys(data);

    return {
      chart: {
        stacked: true,
        parentHeightOffset: 0,
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: '35%',
          endingShape: 'rounded',
          startingShape: 'rounded'
        }
      },
      colors: [
        hexToRGBA(theme.palette.success.main, 0.7),
        hexToRGBA(theme.palette.primary.main, 0.7)],
      grid: {
        strokeDashArray: 7,
        borderColor: theme.palette.divider,
        padding: {
          left: 0,
          bottom: -10
        }
      },
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: {
        width: 6,
        curve: 'smooth',
        lineCap: 'round',
        colors: [theme.palette.background.paper]
      },
      states: {
        hover: {
          filter: { type: 'none' }
        },
        active: {
          filter: { type: 'none' }
        }
      },
      xaxis: {
        axisTicks: { show: false },
        axisBorder: { show: false },
        categories: Object.keys(data),
        labels: {
          style: { colors: theme.palette.text.disabled }
        }
      },
      yaxis: {
        labels: {
          offsetY: 2,
          offsetX: -10,
          formatter: (value: number) => (value > 999 ? `${(value / 1000).toFixed(2)}k` : `${value}`),
          style: { colors: theme.palette.text.disabled }
        }
      },
      responsive: [
        {
          breakpoint: theme.breakpoints.values.xl,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '45%'
              }
            }
          }
        },
        {
          breakpoint: theme.breakpoints.values.lg,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '50%'
              }
            }
          }
        },
        {
          breakpoint: theme.breakpoints.values.sm,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '45%'
              }
            }
          }
        },
        {
          breakpoint: 430,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '55%'
              }
            }
          }
        }
      ]
    }
  }

  return { getSeries, getOptions }
}
