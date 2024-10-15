import type { AppProps } from 'next/app'
import React, {useState} from 'react'
import "../styles/globals.css";
import Head from "next/head";
import FullScreenLoader from "@/components/FullScreenLoader";

export const LoaderContext = React.createContext({
    loading: false,
    showLoader: () => { },
    hideLoader: () => { },
})

export default function App({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = useState<boolean>(false);

    const showLoader = () => setLoading(true);

    const hideLoader = () => setLoading(false);

  return (
      <>
        <Head>
          <title>Buddy Backoffice</title>
          <meta name="description" content="Backoffice web de Buddy" />
          <link rel="icon" href="/buddy_logo.svg" />

            <script
                type="module"
                src="node_modules/@material-tailwind/html@latest/scripts/tooltip.js"
            ></script>
        </Head>

          <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
              <Component {...pageProps} />
          </LoaderContext.Provider>

          { loading && <FullScreenLoader /> }

      </>
  );
}