import { Pagination } from "../types/Pagination";
import { SearchableType } from "../types/SearchableType";

export default abstract class SearchableService<T extends SearchableType> {
    abstract searchItems: (query: string) => Promise<T[]>
}