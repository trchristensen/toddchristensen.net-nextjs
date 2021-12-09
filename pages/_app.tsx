import "styles/global.css";
import type { AppProps } from "next/app";
import { Providers } from "components/Providers/Index";

function App({ Component, pageProps }: AppProps) {
  return (
    <Providers pageProps={pageProps}>
      <Component {...pageProps} />
    </Providers>
  );
}

export default App;
