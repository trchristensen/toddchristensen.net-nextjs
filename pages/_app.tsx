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
        themes={["light", "dark", "black", "cyberpunk", "synthwave", "bumblebee", "retro", "cupcake", "corporate", "emerald", "valentine", "wireframe"]}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default App;
