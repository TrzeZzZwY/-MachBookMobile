import { SearchableType } from "../../types/SearchableType";

export type SearchableService<T extends SearchableType> = {
    searchItems: (query: string) => Promise<T[]>
}