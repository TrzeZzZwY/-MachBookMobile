import  BookType from "./BookType";
import { UserBookItemStatus } from "./UserBookItemStatus";

export interface UserBookItemType {
    id: number,
    userId: number,
    status: UserBookItemStatus,
    description: string,
    bookReference: BookType,
    imageId: number
}

export interface UserBookItemUploadType {
    userId: number,
    description: string,
    status: keyof typeof UserBookItemStatus,
    bookReferenceId: number,
    bookPointId?: number | null,
    imageId: number
}