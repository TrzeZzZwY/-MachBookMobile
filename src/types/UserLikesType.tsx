import { Pagination } from "./Pagination";
import { UserBookItemType } from "./UserBookItemType";

export type UserLikesType = {
  userId: number;
  userLikes: Pagination<UserBookItemType>;
};
