import axiosInstance from "../axios/axiosInstance";
import { Pagination } from "../types/Pagination";
import SearchableService from "./SearchableService";
import BookModel from "../models/BookModel";
import { IdType } from "../types/IdType";

export default class BookService implements SearchableService<BookModel>
{
    searchItems(query: string): Promise<BookModel[]>
    {
        return axiosInstance
            .get<Pagination<BookModel>>(`/Book?title=${query}&includeBookAuthors=true`)
            .then(response => response.data)
            .then(data => data.items.map(d => new BookModel(d)))
    }

    static createBook(title: string, authorId: number): Promise<IdType> {
        return axiosInstance
            .post<IdType>(`/Book`, {
                title: title,
                authorsIds: [
                    authorId
                ]
            }).then(response => response.data)
    }
    
}