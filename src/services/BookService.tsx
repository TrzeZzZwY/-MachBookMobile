import axiosInstance from "../axios/axiosInstance";
import { Pagination } from "../types/Pagination";
import { SearchableService } from "./Abstract/SearchableService";
import BookModel from "../models/BookModel";
import { IdType } from "../types/IdType";
import BookType from "../types/BookType";

export type BookService = {
    createBook: (title: string, authorId: number) => Promise<IdType>
} & SearchableService<BookType>

const BookService: BookService = {
    searchItems: async (query: string) =>
        await axiosInstance
            .get<Pagination<BookModel>>(`/Book?title=${query}&includeBookAuthors=true`)
            .then(response => response.data)
            .then(data => data.items.map(d => new BookModel(d))),


    createBook: async (title: string, authorId: number) =>
        await axiosInstance
            .post<IdType>(`/Book`, {
                title: title,
                authorsIds: [authorId]
            }).then(response => response.data)
}



export default BookService;