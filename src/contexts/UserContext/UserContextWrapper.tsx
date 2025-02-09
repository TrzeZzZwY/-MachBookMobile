import { useState } from "react";
import UserContext, { UserContextType } from "./UserContext";
import BookType from "../../types/BookType";

export type UserContextWrapperType = {
  children: React.ReactNode | React.ReactNode[] | undefined;
};

export default function UserContextWrapper({
  children,
}: UserContextWrapperType) {
  const [books, setBooks] = useState<BookType[]>([]);
  const [bookLikes, setBookLikes] = useState<BookType[]>([]);

  const defaultUserContextValue: UserContextType = {
    userId: 0,
    userBooks: {
      books: {
        data: books,
        setData: setBooks,
      },
      bookLikes: {
        data: bookLikes,
        setData: setBookLikes,
      },
      likedByOthers: {
        data: [],
        setData: () => null,
      },
    },
  };

  return (
    <UserContext.Provider value={defaultUserContextValue}>
      {children}
    </UserContext.Provider>
  );
}
