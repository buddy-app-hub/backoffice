import { Box, Typography } from "@mui/material";
import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {UserFields, UserPersonalDataFields} from "../../types/user";
import {DateFormatter} from "../../utils/dateFormatter";

export const columnName : GridColDef = {
  flex: 0.15,
  field: 'full_name',
  headerName: 'Name',
  valueGetter: (params) => {
    const personalData = params.row[UserFields.PersonalData];

    if (!personalData) return ''

    return `${personalData[UserPersonalDataFields.FirstName]} ${personalData[UserPersonalDataFields.LastName]}`
  },
  renderCell: (params: GridRenderCellParams) => {
    const { row } = params;
    const personalData = row[UserFields.PersonalData];
    const fullName = personalData ?
      `${personalData[UserPersonalDataFields.FirstName]} ${personalData[UserPersonalDataFields.LastName]}` : "";

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {fullName}
          </Typography>
          <Typography noWrap variant='caption' sx={{ color: 'text.disabled' }}>
            ID: {row[UserFields.FirebaseUID]}
          </Typography>
        </Box>
      </Box>
    )
  }
};

export const columnGenre : GridColDef = {
  flex: 0.1,
  field: 'genero',
  headerName: 'Género',
  valueGetter: (params) => {
    const personalData = params.row[UserFields.PersonalData];

    if (!personalData) return ''

    return personalData[UserPersonalDataFields.Gender];
  },
  renderCell: (params: GridRenderCellParams) => (
    <Typography variant='body2'
                sx={{ color: 'text.primary' }}
                textTransform={'capitalize'}
    >
      {params.row[UserFields.PersonalData][UserPersonalDataFields.Gender] ?? '-'}
    </Typography>
  )
};

export const columnEmail : GridColDef = {
  flex: 0.1,
  field: UserFields.Email,
  headerName: 'Mail',
  renderCell: (params: GridRenderCellParams) => (
    <Typography variant='body2' sx={{ color: 'text.primary' }}>
      {params.row[UserFields.Email]}
    </Typography>
  )
};

export const columnRegistrationDate : GridColDef = {
  flex: 0.1,
  field: UserFields.RegistrationDate,
  headerName: 'Registración',
  renderCell: (params: GridRenderCellParams) => (
    <Typography variant='body2' sx={{ color: 'text.primary' }}>
      {DateFormatter.toShortDate(params.row[UserFields.RegistrationDate])}
    </Typography>
  )
};

