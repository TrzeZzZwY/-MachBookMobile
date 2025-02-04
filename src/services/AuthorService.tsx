import axiosInstance from "../axios/axios";
import { Pagination } from "../types/Pagination";
import { SearchableService } from "./Abstract/SearchableService";
import { AuthorModel } from "../models/AuthorModel";
import { AuthorType } from "../types/AuthorType";
import { IdType } from "../types/IdType";

export type AuthorServiceType = {
    createNewAuthor: (author: AuthorType) => Promise<IdType>
} & SearchableService<AuthorModel>

const AuthorService: AuthorServiceType = {
    searchItems: async (query: string) => {



        return await axiosInstance
            .get<Pagination<AuthorModel>>(`/Author?authorName=${query}`)
            .then(data => data.data)
            .then(data => data.items.map(a => new AuthorModel(a)))
    },
    createNewAuthor: async (author: AuthorType) => {
        return await axiosInstance
            .post<IdType>('/Author', {
                firstName: author.firstName,
                lastName: author.lastName,
                country: author.country,
                yearOfBirth: author.yearOfBirth
            })
            .then(data => data.data)
    }

}


export default AuthorService;