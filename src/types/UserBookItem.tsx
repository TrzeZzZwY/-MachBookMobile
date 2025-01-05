import  BookType from "./BookType";
import { UserBookItemStatus } from "./UserBookItemStatus";

export interface UserBookItem {
    id: number,
    userId: number,
    status: UserBookItemStatus,
    description: "Książka",
    bookReference: BookType
}