import axiosInstance from "../axios/axios";
import { IdType } from "../types/IdType";
import ImageIdType from "../types/ImageIdType";
import { Pagination } from "../types/Pagination";
import { UserBookItemType, UserBookItemUploadType } from "../types/UserBookItemType";
import { SearchableService } from "./Abstract/SearchableService";

export type UserBookItemService = {
    getUserBooks: (pageNumber: number, pageSize: number, includeBookAuthors?: boolean) => Promise<Pagination<UserBookItemType>>
    uploadBookImage: (data: FormData) => Promise<ImageIdType>
    createUserBookItem: (userBookItem: UserBookItemUploadType) => Promise<IdType>
    deleteUserBookItem: (id: number) => Promise<IdType>
} & SearchableService<UserBookItemType>

const UserBookItemService: UserBookItemService = {

    searchItems: async (query: string) => 
        await axiosInstance
            .get<Pagination<UserBookItemType>>(`/UserBookItem?pageNumber=${1}&pageSize=${10}&includeBookAuthors=${true}`)
            .then(data => data.data.items),

    getUserBooks: async (pageNumber: number, pageSize: number, includeBookAuthors: boolean = true) => 
        await axiosInstance
            .get<Pagination<UserBookItemType>>(`/UserBookItem?pageNumber=${pageNumber}&pageSize=${pageSize}&includeBookAuthors=${includeBookAuthors}&itemStatus=ActivePublic`)
            .then(data => data.data),

    uploadBookImage: async (data: FormData) =>
        await axiosInstance
            .post<ImageIdType>(`/UserBookItem/Image`,data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => response.data),

    createUserBookItem: async (userBookItem: UserBookItemUploadType) =>
        await axiosInstance
            .post<IdType>(`/UserBookItem`,userBookItem)
            .then(data => data.data),

    deleteUserBookItem: async (id: number) => 
        await axiosInstance
            .delete(`/UserBookItem/${id}`)
}

export default UserBookItemService;