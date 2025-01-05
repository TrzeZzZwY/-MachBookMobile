import axiosInstance from "../axios/axiosInstance";
import { Pagination } from "../types/Pagination";
import SearchableService from "./SearchableService";
import BookModel from "../models/BookModel";

export default class BookService implements SearchableService<BookModel>
{
    public searchItems(query: string): Promise<BookModel[]>
    {
        return axiosInstance
            .get<Pagination<BookModel>>(`/Book?title=${query}&includeBookAuthors=true`)
            .then(data => data.data)
            .then(data => data.items.map(d => new BookModel(d)))
    }
    
}