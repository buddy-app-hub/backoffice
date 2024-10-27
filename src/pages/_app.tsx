import {useEffect, useState} from 'react'

import Head from 'next/head'
import {Router, useRouter} from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { store } from 'src/store'
import { Provider } from 'react-redux'
import NProgress from 'nprogress'
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import themeConfig from 'src/configs/themeConfig'
import { Toaster } from 'react-hot-toast'
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import Spinner from 'src/@core/components/spinner'
import { AuthProvider } from 'src/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

import 'react-perfect-scrollbar/dist/css/styles.css'
import 'src/iconify-bundle/icons-bundle-react'
import '../../styles/globals.css'
import { tokenStorage } from 'src/utils/tokenStorage'
import { onAuthStateChanged } from '@firebase/auth'
import { auth } from 'src/utils/firebase'

type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)

  const setConfig = Component.setConfig ?? undefined

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  const goToLogin = () => {
    tokenStorage.remove();
    router.push('/login');
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        if (router.asPath && !router.asPath.startsWith('/login'))
          goToLogin();
        setLoading(false);
      } else {
        setLoading(true);
        user.getIdToken()
          .then(token => {
            if (token)
              tokenStorage.save(token);
            else
              goToLogin();
          })
          .catch(goToLogin)
          .finally(() => setLoading(false))
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  if (loading)
    return <Spinner />

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} Backoffice`}</title>
          <meta
            name='description'
            content={`Backoffice web de ${themeConfig.templateName}`}
          />
          <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>

        <AuthProvider>
          <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    {/*<Guard authGuard={authGuard} guestGuard={guestGuard}>*/}
                      {getLayout(<Component {...pageProps} />)}
                    {/*</Guard>*/}
                    <ReactHotToast>
                      <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                    </ReactHotToast>
                  </ThemeComponent>
                )
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </AuthProvider>
      </CacheProvider>
    </Provider>
  )
}

export default App
