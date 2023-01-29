import { Dispatch, SetStateAction, createContext } from "react";

type ContextProps = {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
};

export const QueryInfoContext = createContext({} as ContextProps);
