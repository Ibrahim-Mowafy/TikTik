import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Head from 'next/head';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;
  return (
    <>
      <Head>
        <title>TikTik</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="My page title" key="title" />
        <meta
          name="description"
          content="TikTok - trends start here. On a device or on the web, viewers can watch and discover millions of personalized short videos."
          key="description"
        />
      </Head>
      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
      >
        <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh] ">
          <Navbar />
          <div className="flex gap-6 md:gap-20">
            <div className="h-[92vh] overflow-hidden">
              <Sidebar />
            </div>
            <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
};

export default MyApp;
