import React from "react";
import BookType from "../../types/BookType";

export type UserContextType = {
  userId: number;
  userBooks: CurrentUserBooksType;
};

export type CurrentUserBooksType = {
  bookLikes: BookDataContainer<BookType[]>;
  books: BookDataContainer<BookType[]>;
  likedByOthers: BookDataContainer<BookType[]>;
};

export type BookDataContainer<T> = {
  data: T;
  setData: (data: T) => void;
};

export const defaultUserContextValue: UserContextType = {
  userId: 0,
  userBooks: {
    bookLikes: {
      data: [],
      setData: () => null,
    },
    books: {
      data: [],
      setData: () => null,
    },
    likedByOthers: {
      data: [],
      setData: () => null,
    },
  },
};

const UserContext = React.createContext(defaultUserContextValue);

export default UserContext;
