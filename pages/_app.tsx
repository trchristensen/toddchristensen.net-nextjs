import "styles/global.css";
import { createContext, useState } from "react";
import type { AppProps } from "next/app";
import { SiteLayout } from "components/Layouts";
import { Providers } from "components/Providers";

export default function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <Providers pageProps={pageProps}>
        <SiteLayout>{page}</SiteLayout>
      </Providers>
    ));

  return getLayout(<Component {...pageProps} />);
}
