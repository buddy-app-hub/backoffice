import {ReactNode, useEffect, useState} from 'react'
import { Box, Button, Card, Divider, Stack, Theme } from '@mui/material'
import { useForm } from 'react-hook-form'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import CardContent from "@mui/material/CardContent";
import BuddyLogo from "../../components/BuddyLogo";
import {LoginParams, LoginParamsFields} from "../../types/user";
import {ControlledTextField} from "../../components/ControlledTextField";
import {browserLocalPersistence, setPersistence, signInWithEmailAndPassword} from '@firebase/auth';
import {auth} from "../../utils/firebase";
import { FirebaseError } from 'firebase/app';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {RequiredMailSchema, RequiredSchema} from "../../utils/validationSchemas";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {useRouter} from "next/router";
import NProgress from "nprogress";

const invalidCredentialMessages = ['auth/invalid-email', 'auth/invalid-credential', 'auth/missing-password', 'auth/user-not-found'];

const loginFormSchema = yup.object().shape({
  [LoginParamsFields.Mail]: RequiredMailSchema,
  [LoginParamsFields.Password]: RequiredSchema
})

const LoginPage = () => {
  const router = useRouter();

  const methods = useForm<LoginParams>({
    resolver: yupResolver(loginFormSchema)
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const padding = (theme: Theme) => `${theme.spacing(12, 9, 7)} !important`;

  const cleanErrors = () => !!error && setError(undefined);

  const onSubmit = (data: LoginParams) => {
    setLoading(true);
    cleanErrors();

    setPersistence(auth, browserLocalPersistence)
      .then(async () => {
        const userCredential = await signInWithEmailAndPassword(auth, data[LoginParamsFields.Mail], data[LoginParamsFields.Password]);
        router.push('/dashboards/analytics');

        return userCredential;
      })
      .catch((error) => {
        console.error("Error al establecer la persistencia:", error);
        if (error instanceof FirebaseError) {
          const errorCode = error.code;
          if (invalidCredentialMessages.includes(errorCode)) {
            setError('Las credenciales son inválidas. Por favor, verificá los datos ingresados.');

            return;
          }
        }

        setError('Ocurrió un error, por favor intenta más tarde.');
      })
      .finally(() => setLoading(false));
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1,
        boxShadow: '0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1)',
        p: 0,
        borderRadius: '12px',
        minWidth: '450px',
        maxWidth: '450px'
      }}>
        <CardContent sx={{ p: '0px !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: padding }}>
            <BuddyLogo height={90} />
          </Box>

          <Divider color={'#e5e7eb'} />

          <Box sx={{ backgroundColor: '#f9fafb !important', }}>
            <form noValidate autoComplete='off' onSubmit={methods.handleSubmit(onSubmit)}>
              <Stack spacing={6} sx={{ p: padding }}>
                <ControlledTextField control={methods.control}
                                     name={LoginParamsFields.Mail}
                                     label={'Mail'}
                                     onChange={cleanErrors}
                />

                <ControlledTextField control={methods.control}
                                     name={LoginParamsFields.Password}
                                     type={'password'}
                                     label={'Contraseña'}
                                     onChange={cleanErrors}
                />

                <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                  { loading ? "Ingresando..." : "Ingresar" }
                </Button>

                {
                  error &&
                    <Alert severity={'error'} color={'error'}>
                      <AlertTitle>¡Ocurrió un error!</AlertTitle>
                      {error}
                    </Alert>
                }
              </Stack>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
