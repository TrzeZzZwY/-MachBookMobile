export type MatchType = {
  matches: UserMatchType[];
};

export type UserMatchType = {
  userId: number;
  firstName: string;
  lastName: string;
  matchBookPair: MatchPair[];
};

export type MatchPair = {
  offeredBook: BookMatchType;
  requestedBook: BookMatchType;
};

export type BookMatchType = {
  userBookItemId: number;
  title: string;
  imageId: number;
};
