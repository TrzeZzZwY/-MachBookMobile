import { Pagination } from "../../types/Pagination"

export type PaginatedService<T> = {
    getPaginated: (page: number) => Promise<Pagination<T>>
}