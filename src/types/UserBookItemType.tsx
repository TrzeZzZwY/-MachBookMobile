import  BookType from "./BookType";
import { SearchableType } from "./SearchableType";
import { UserBookItemStatus } from "./UserBookItemStatus";

export interface UserBookItemType extends SearchableType {
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