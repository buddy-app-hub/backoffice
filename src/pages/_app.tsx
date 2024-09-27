import type { AppProps } from 'next/app'
import React from 'react'
import "../styles/globals.css";
import Head from "next/head";
 
export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <Head>
          <title>Buddy Backoffice</title>
          <meta name="description" content="Backoffice web de Buddy" />
          <link rel="icon" href="/buddy_logo.svg" />
        </Head>

        <Component {...pageProps} />
      </>
  );
}