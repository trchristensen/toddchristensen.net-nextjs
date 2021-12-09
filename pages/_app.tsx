import "styles/global.css";
import type { AppProps } from "next/app";
import { Providers } from "components/Providers/Index";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Providers pageProps={pageProps}>
        <Component {...pageProps} />
      </Providers>
    </SessionProvider>
  );
}

export default App;
