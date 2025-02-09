import appConfig from "appConfig";
import { SearchableUrlBuilder } from "./abstract/SearchableUrlBuilder";
import { AuthorType } from "types/AuthorType";

export type AuthorUrlBuilderType = {
  createNewAuthor: () => string;
} & SearchableUrlBuilder<AuthorType>;

const AuthorUrlBuilder: AuthorUrlBuilderType = {
  searchItems: (query: string) =>
    `${appConfig.apiPaths.author}?authorName=${query}`,
  createNewAuthor: () => `${appConfig.apiPaths.author}`,
};

export default AuthorUrlBuilder;
