import appConfig from "appConfig";
import { SearchableUrlBuilder } from "./abstract/SearchableUrlBuilder";
import BookType from "types/BookType";

export type BookUrlBuilderType = {
  createBook: () => string;
} & SearchableUrlBuilder<BookType>;

const BookUrlBuilder: BookUrlBuilderType = {
  searchItems: (query: string) =>
    `/${appConfig.apiPaths.book}?title=${query}&includeBookAuthors=true`,
  createBook: () => `${appConfig.apiPaths.book}`,
};

export default BookUrlBuilder;
