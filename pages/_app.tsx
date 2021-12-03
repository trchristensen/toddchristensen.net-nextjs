import "styles/global.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider
        enableColorScheme
        enableSystem
        attribute="class"
        themes={["dark", "light", "space"]}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default App;
