"use client";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type SettingsContextProps = {
  contrast: boolean;
  autoPlay: boolean;
  changeContrast: (v: boolean) => void;
  changeAutoPlay: (v: boolean) => void;
};

const SettingsContext = createContext<SettingsContextProps>({
  contrast: false,
  autoPlay: false,
  changeAutoPlay: () => {},
  changeContrast: () => {},
});

export function SettingsContextProvider({ children }: PropsWithChildren) {
  const [contrast, setChangeContrast] = useState<boolean>(
    localStorage.getItem("contrast") === "true"
  );
  const [autoPlay, setChangeAutoPlay] = useState<boolean>(
    localStorage.getItem("auto_play") === "true"
  );

  const onChangeContrast: SettingsContextProps["changeContrast"] = useCallback(
    (v) => {
      setChangeContrast(v);
      localStorage.setItem("contrast", v + "");
    },
    []
  );
  const onChangeAutoPlay: SettingsContextProps["changeAutoPlay"] = useCallback(
    (v) => {
      localStorage.setItem("auto_play", v + "");
      setChangeAutoPlay(v);
    },
    []
  );

  const value: SettingsContextProps = useMemo(
    () => ({
      autoPlay: autoPlay,
      contrast: contrast,
      changeAutoPlay: onChangeAutoPlay,
      changeContrast: onChangeContrast,
    }),
    [autoPlay, contrast, onChangeAutoPlay, onChangeContrast]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettingsContext = () => {
  return useContext(SettingsContext);
};
