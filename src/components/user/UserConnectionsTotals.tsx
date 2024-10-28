import React, {useContext, useEffect, useState} from "react";
import {Connection, Meeting, MeetingFields, MeetingScheduleFields} from "src/types/connections";
import {Box, Card, CardHeader, Grid, IconButton, Stack, Typography} from "@mui/material";
import Icon from "src/@core/components/icon";
import {DateFormatter} from "src/utils/dateFormatter";
import CardContent from "@mui/material/CardContent";
import CustomAvatar from 'src/@core/components/mui/avatar'
import {ThemeColor} from "src/@core/layouts/types";
import Alert from "@mui/material/Alert";
import {Skeleton} from "@mui/lab";
import {UserProfilePageContext} from "../../context/UserProfilePageContext";

interface MeetingsTotals {
  canceled: number,
  toBeConfirmed: number,
  programmed: number,
  realized: number
}

interface UserConnectionsTotalsProps {
  error?: string
}

const UserConnectionsTotals = ({ error }: UserConnectionsTotalsProps) => {
  const { connections, meetings, loadConnections } = useContext(UserProfilePageContext)

  const [totals, setTotals] = useState<{
    empty: boolean, connections: number, meetingTotals: MeetingsTotals
  }>();

  const calculateTotals = (_connections: Connection[], _meetings: Meeting[]) => {
    if (!_connections?.length) {
      setTotals({ empty: true, connections: 0, meetingTotals: {} as MeetingsTotals})
      return;
    }

    const auxTotals = {
      empty: false,
      connections: _connections.length,
      meetingTotals: {
        canceled: 0,
        toBeConfirmed: 0,
        programmed: 0,
        realized: 0
      }
    }

    const today = new Date();

    _meetings.forEach(m => {
      if (m[MeetingFields.IsCancelled])
        auxTotals.meetingTotals.canceled++;
      else {
        const confirmedByBuddy = m[MeetingFields.IsConfirmedByBuddy];
        const confirmedByElder = m[MeetingFields.IsConfirmedByElder];

        if ((confirmedByBuddy && !confirmedByElder) || (!confirmedByBuddy && confirmedByElder))
          auxTotals.meetingTotals.toBeConfirmed++;
        else if (confirmedByBuddy && confirmedByElder) {
          const date = m[MeetingFields.Schedule][MeetingScheduleFields.Date];

          if (DateFormatter.isDateInPast(new Date(date), today))
            auxTotals.meetingTotals.realized++;
          else
            auxTotals.meetingTotals.programmed++;
        }
      }
    })

    setTotals(auxTotals);
  }

  useEffect(() => {
    setTotals(undefined)
    if (connections && meetings)
      calculateTotals(connections, meetings)
  }, [connections, meetings]);

  return (
    <Card>
      <CardHeader title='Encuentros'
                  subheader={
                    totals && !totals.empty && !error ?
                      <Typography variant='body2'>
                        Total de  {' '}
                        <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {totals.connections} conexiones
                        </Box>{' '}
                      </Typography>
                      : undefined
                  }
                  titleTypographyProps={{
                    sx: {mb: 2.25, lineHeight: '2rem !important', letterSpacing: '0.15px !important'}
                  }}
                  action={
                    <IconButton onClick={loadConnections}>
                      <Icon icon='mdi:reload' />
                    </IconButton>
                  }
      />

      <CardContent sx={{ pt: theme => `${theme.spacing(0.75)} !important` }}>

        {
          !totals && !error &&
            <Stack minWidth={'100%'}>
              <Skeleton variant={'text'} width={'100%'} />
            </Stack>
        }

        {
          error &&
          <Alert color={'error'} severity={'error'}>
            Ocurrió un error al obtener las conexiones del Buddy
          </Alert>
        }

        {
          totals && totals.empty && !error &&
            <Alert color={'info'} severity={'info'}>
              El Buddy por el momento no ha realizado conexiones con Elders.
            </Alert>
        }

        {
          totals && !totals.empty && !error &&
            <Grid container spacing={[5, 0]}>
              <MeetingTotalState label={"Realizados"}
                                 quantity={totals.meetingTotals.realized}
                                 color={'success'}
                                 icon={"mdi:calendar-check-outline"}
              />

              <MeetingTotalState label={"Programados"}
                                 quantity={totals.meetingTotals.programmed}
                                 color={'primary'}
                                 icon={"mdi:calendar-end-outline"}
              />

              <MeetingTotalState label={"Por confirmar"}
                                 quantity={totals.meetingTotals.toBeConfirmed}
                                 color={'warning'}
                                 icon={"mdi:calendar-clock-outline"}
              />

              <MeetingTotalState label={"Cancelados"}
                                 quantity={totals.meetingTotals.canceled}
                                 color={'error'}
                                 icon={"mdi:cancel"}
              />
            </Grid>
        }
      </CardContent>
    </Card>
  )
}

interface MeetingTotalStateProps {
  label: string,
  quantity: number,
  icon: string,
  color: ThemeColor
}

const MeetingTotalState = ({label, quantity, icon, color}: MeetingTotalStateProps) => {
  return (
    <Grid item xs={12} sm={3}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar variant='rounded' color={color} sx={{ mr: 3, boxShadow: 3, width: 44, height: 44 }}>
          <Icon icon={icon} fontSize='1.75rem' />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{label}</Typography>
          <Typography variant='h6'>{quantity}</Typography>
        </Box>
      </Box>
    </Grid>
  )
}

export default UserConnectionsTotals;
