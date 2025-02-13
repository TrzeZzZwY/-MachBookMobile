import React, { useState } from "react";
import { UserBookItemType } from "../../types/UserBookItemType";
import DataContextBase from "../DataContextBase";
import { MatchType } from "types/MatchType";

const MatchesContext = React.createContext<MatchesContextType>({
  data: null,
  setData: (data: MatchType) => {},
});

export type MatchesContextType = {} & DataContextBase<MatchType>;

export type MatchesContextWrapperType = {
  children: React.ReactNode[] | React.ReactNode | undefined;
};

export function MatchesContextWrapper({ children }: MatchesContextWrapperType) {
  const [books, setData] = useState<MatchType | null>(null);

  return (
    <MatchesContext.Provider value={{ data: books, setData: setData }}>
      {children}
    </MatchesContext.Provider>
  );
}

export default MatchesContext;
