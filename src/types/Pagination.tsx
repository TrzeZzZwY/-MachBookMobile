export interface Pagination<T> {
    itemsCount: number,
    pageNumber: number,
    pageSize: number,
    items: T[]
}