import "styles/global.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider
        enableColorScheme
        storageKey="nightwind-mode"
        defaultTheme="system"
        attribute={"data-theme"}
        // value={{ luxury: "luxury" }}
        themes={["dark", "light", "space", "luxury", "black", "cupcake", "cyberbunk", "retro", "bumblebee"]}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default App;
