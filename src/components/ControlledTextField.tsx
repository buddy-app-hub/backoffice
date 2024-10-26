import {Stack, StandardTextFieldProps, TextField, Typography} from "@mui/material";
import {Control, Controller} from "react-hook-form";
import {useState} from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Icon from 'src/@core/components/icon'

export interface ControlledTextFieldProps extends StandardTextFieldProps {
  control: Control<any>,
  disabled?: boolean,
  helperText?: string,
}

export const ControlledTextField = ({
                                      helperText,
                                      label, type,
                                      ...props
                                    }: ControlledTextFieldProps) => {
  const isPasswordType = type === 'password';
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Controller
      control={props.control}
      name={props.name || ''}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <Stack sx={{width: '100%'}}>
          <TextField
            {...props}
            label={label}
            variant="outlined"
            size="small"
            type={isPasswordType ? !showPassword ? 'password' : 'text' : type}
            value={value}
            onChange={(event: any) => {
              props.onChange && props.onChange(event);

              onChange(event);
            }}
            error={!!error}
            disabled={props.disabled}
            defaultValue={value}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                isPasswordType ?
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                    </IconButton>
                  </InputAdornment>
                  :
                  undefined
              ),
              ...props.InputProps,
            }}
          >
          </TextField>

          {error && <HelperInputText text={error.message} error/>}

          {helperText && !error && <HelperInputText text={helperText}/>}
        </Stack>
      )}
    />
  )
};

interface HelperInputTextProps {
  text: any;
  error?: boolean;
}

function HelperInputText(props: HelperInputTextProps) {
  return (
    <Typography
      variant="subtitle2"
      fontSize={'0.75rem'}
      color={props.error ? 'error.main' : 'text.disabled'}
    >
      {props.text}
    </Typography>
  );
}
