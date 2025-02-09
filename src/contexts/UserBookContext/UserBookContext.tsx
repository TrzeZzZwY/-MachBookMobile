import React, { useState } from "react";
import { UserBookItemType } from "../../types/UserBookItemType";
import DataContextBase from "../DataContextBase";

const UserBookContext = React.createContext<UserBookContextType>({
  data: [],
  setData: (data: UserBookItemType[]) => {},
});

export type UserBookContextType = {} & DataContextBase<UserBookItemType>;

export type UserBookContextWrapperType = {
  children: React.ReactNode[] | React.ReactNode | undefined;
};

export function UserBookContextWrapper({
  children,
}: UserBookContextWrapperType) {
  const [books, setBooks] = useState<UserBookItemType[] | null>(null);

  return (
    <UserBookContext.Provider value={{ data: books, setData: setBooks }}>
      {children}
    </UserBookContext.Provider>
  );
}

export default UserBookContext;
