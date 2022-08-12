import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "next/head";
const SidebarMemo = React.memo(Sidebar);
const NavbarMemo = React.memo(Navbar);
const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;
  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>TikTok - Make Your Day</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <NavbarMemo />
        <div className="xl:max-w-[1150px] mx-auto mt-[60px] ">
          <div className="flex  ">
            <div className="relative w-[72px] lg:w-[356px] flex flex-0 lg:pt-5 pt-0 ">
              <SidebarMemo />
            </div>
            <div className="pt-5 flex flex-col gap-10 overflow-auto min-h-full videos flex-1">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
