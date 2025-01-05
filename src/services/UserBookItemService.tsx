import axiosInstance from "../axios/axiosInstance";
import { IdType } from "../types/IdType";
import ImageIdType from "../types/ImageIdType";
import { Pagination } from "../types/Pagination";
import { UserBookItemType, UserBookItemUploadType } from "../types/UserBookItemType";

export default class UserBookItemService {

    static GetUserBooks(pageNumber: number, pageSize: number, includeBookAuthors: boolean = true): Promise<Pagination<UserBookItemType>>
    {
        return axiosInstance
            .get<Pagination<UserBookItemType>>(`/UserBookItem?pageNumber=${pageNumber}&pageSize=${pageSize}&includeBookAuthors=${includeBookAuthors}`)
            .then(data => data.data)
    }

    static uploadBookImage(data: FormData) : Promise<ImageIdType>
    {
        return axiosInstance
            .post<ImageIdType>(`/UserBookItem/Image`,data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => response.data)
    }

    static createUserBookItem(userBookItem: UserBookItemUploadType)
    {
        return axiosInstance
            .post<IdType>(`/UserBookItem`,userBookItem);
    }
}