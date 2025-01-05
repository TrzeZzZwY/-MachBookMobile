import axiosInstance from "../axios/axiosInstance";
import { Pagination } from "../types/Pagination";
import SearchableService from "./SearchableService";
import { AuthorModel } from "../models/AuthorModel";
import { AuthorType } from "../types/AuthorType";
import { IdType } from "../types/IdType";

export default class AuthorService implements SearchableService<AuthorModel>
{
    searchItems(query: string) : Promise<AuthorModel[]> {
        return axiosInstance
            .get<Pagination<AuthorModel>>(`/Author?authorName=${query}`)
            .then(data => data.data)
            .then(data => data.items.map(a => new AuthorModel(a)))
    }

    static createNewAuthor(author: AuthorType) : Promise<IdType> {
        return axiosInstance
            .post<IdType>('/Author',{
                firstName: author.firstName,
                lastName: author.lastName,
                country: author.country,
                yearOfBirth: author.yearOfBirth
            })
            .then(data => data.data);
    }
}