import axiosInstance from "../axios/axiosInstance";
import { Pagination } from "../types/Pagination";
import { UserBookItem } from "../types/UserBookItem";

export default class UserBookItemService {
    static GetUserBooks(pageNumber: number, pageSize: number, includeBookAuthors: boolean = true): Promise<Pagination<UserBookItem>>
    {
        return axiosInstance
            .get<Pagination<UserBookItem>>(`/UserBookItem?pageNumber=${pageNumber}&pageSize=${pageSize}&includeBookAuthors=${includeBookAuthors}`)
            .then(data => data.data)
    }
}