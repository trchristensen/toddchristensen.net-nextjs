import React from "react";
import { useSoundContext } from "components/Providers/Index";

export default function ClickSound({ children }) {
  const { soundEnabled, playClick } = useSoundContext();

  return (
    <div onClick={() => (soundEnabled ? playClick() : null)}>{children}</div>
  );
}
