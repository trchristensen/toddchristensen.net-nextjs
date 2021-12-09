import { NextPageContext } from "next";
import {
  useEffect,
  useState,
  createContext,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import useSound from "use-sound";

interface Props {
  children?: any;
  pageProps: NextPageContext;
}

export function Providers({ children, pageProps }: Props) {
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
          <SoundProvider>{children}</SoundProvider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export const SoundContext = createContext(true);

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [playClick] = useSound('/sounds/start.mp3', {
    soundEnabled,
  })

  useEffect(() => {
    setSoundEnabled(
      window.localStorage.getItem("sound") === "off" ? false : true
    );
  }, []);

  const toggleSound = useCallback(() => {
    const newSoundsEnabled = !soundEnabled;
    setSoundEnabled(newSoundsEnabled);
    window.localStorage.setItem("sound", newSoundsEnabled ? "on" : "off");
  }, [soundEnabled]);

  // const contextValue = useMemo(
  //   () => ({
  //     soundEnabled,
  //     toggleSound,
  //     playClick
  //   }),
  //   [soundEnabled, toggleSound]
  // );

  const contextValue = {
    soundEnabled,
    toggleSound,
    playClick
  }

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
};

export function useSoundContext() {
  return useContext(SoundContext)
}