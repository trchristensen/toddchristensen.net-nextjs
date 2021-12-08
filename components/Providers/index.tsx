import { ApolloProvider } from "@apollo/client";
import { NextPageContext } from "next";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import * as React from "react";

interface Props {
  children?: any;
  pageProps: any;
}

const globalNavigationContext = {
  isOpen: false,
  setIsOpen: (val: boolean) => {},
};

export const GlobalNavigationContext = React.createContext(
  globalNavigationContext
);

export function Providers({ children, pageProps }: Props) {
  const initialState = {
    isOpen: false,
    setIsOpen,
  };

  const [state, setState] = React.useState(initialState);

  function setIsOpen(isOpen) {
    return setState({ ...state, isOpen });
  }

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider
          enableColorScheme
          storageKey="nightwind-mode"
          defaultTheme="dark"
          attribute={"data-theme"}
          themes={["light", "dark", "black", "cyberpunk"]}
        >
          <GlobalNavigationContext.Provider value={state}>
            {children}
          </GlobalNavigationContext.Provider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
