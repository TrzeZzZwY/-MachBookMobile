import { UserBookItemType } from "types/UserBookItemType";
import { SearchableUrlBuilder } from "./abstract/SearchableUrlBuilder";

import appConfig from "appConfig";

export type UserBookItemUrlBuilderType = {
  getUserBooks: (
    pageNumber: number,
    pageSize: number,
    userId: number,
    includeBookAuthors?: boolean
  ) => string;
  uploadBookImage: () => string;
  createUserBookItem: () => string;
  deleteUserBookItem: (id: number) => string;
  toggleLike: () => string;
  getLikedBooks: (page: number, pageSize: number) => string;
  getFeed: (page: number, pageSize: number) => string;
  getMatches: (page: number, pageSize: number) => string;
} & SearchableUrlBuilder<UserBookItemType>;

const UserBookItemUrlBuilder: UserBookItemUrlBuilderType = {
  searchItems: (query: string) =>
    `${
      appConfig.apiPaths.userBookItem
    }/user-books/2?pageNumber=${1}&pageSize=${10}&includeBookAuthors=${true}`,

  getUserBooks: (
    pageNumber: number,
    pageSize: number,
    userId: number,
    includeBookAuthors: boolean = true
  ) =>
    `${appConfig.apiPaths.userBookItem}/user-books/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}&includeBookAuthors=${includeBookAuthors}`,

  uploadBookImage: () => `${appConfig.apiPaths.userBookItem}/Image`,

  createUserBookItem: () => `${appConfig.apiPaths.userBookItem}`,

  deleteUserBookItem: (id: number) =>
    `${appConfig.apiPaths.userBookItem}/${id}`,

  getFeed: (page: number, pageSize: number) =>
    `${appConfig.apiPaths.userBookItem}/Feed?pageSize=${pageSize}&pageNumber=${page}`,

  toggleLike: () => `${appConfig.apiPaths.userBookItem}/toggle-like`,

  getLikedBooks: (page: number, pageSize: number) =>
    `${appConfig.apiPaths.userBookItem}/get-like?pageSize=${pageSize}&pageNumber=${page}`,

  getMatches: (page: number, pageSize: number) =>
    `${appConfig.apiPaths.match}?pageSize=${pageSize}&pageNumber=${page}`,
};

export default UserBookItemUrlBuilder;
