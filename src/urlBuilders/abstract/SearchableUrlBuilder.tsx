import { SearchableType } from "types/SearchableType";

export type SearchableUrlBuilder<T extends SearchableType> = {
  searchItems: (query: string) => string;
};
