import React, { useState } from "react";
import { UserBookItemType } from "../../types/UserBookItemType";
import DataContextBase from "../DataContextBase";

const UserBookLikedContext = React.createContext<UserBookLikedContextType>({
  data: [],
  setData: (data: UserBookItemType[]) => {},
});

export type UserBookLikedContextType = {} & DataContextBase<UserBookItemType[]>;

export type UserBookLikedContextWrapperType = {
  children: React.ReactNode[] | React.ReactNode | undefined;
};

export function UserBookLikedContextWrapper({
  children,
}: UserBookLikedContextWrapperType) {
  const [books, setBooks] = useState<UserBookItemType[] | null>(null);

  return (
    <UserBookLikedContext.Provider value={{ data: books, setData: setBooks }}>
      {children}
    </UserBookLikedContext.Provider>
  );
}

export default UserBookLikedContext;
