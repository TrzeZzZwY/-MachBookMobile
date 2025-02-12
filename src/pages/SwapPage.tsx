import useAxios from "hooks/useAxios";
import { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import UserBookItemUrlBuilder from "services/UserBookItemUrlBuilder";
import { Pagination } from "types/Pagination";
import { UserBookItemType } from "types/UserBookItemType";
import SwipeEntry from "../components/SwipeEntry";
import UserBookLikedContext from "../contexts/UserBookLikedContext/UserBookLikedContext";
import { UserLikesType } from "types/UserLikesType";

export default function SwapPage() {
  const { data, setData } = useContext(UserBookLikedContext);
  const [feedBooks, setFeedBooks] = useState<UserBookItemType[]>([]);
  const axios = useAxios();

  const likeHandler = (id: number) => {
    const url = UserBookItemUrlBuilder.toggleLike();
    const likedBooksUrl = UserBookItemUrlBuilder.getLikedBooks(1, 10);

    axios
      .post(url, {
        userBookItemId: id,
      })
      .then(() => axios.get<UserLikesType>(likedBooksUrl))
      .then((response) => response.data)
      .then((data) => data.userLikes.items)
      .then(setData)
      .catch(console.log);
  };

  useEffect(() => {
    const url = UserBookItemUrlBuilder.getFeed(1, 50);

    axios
      .get<Pagination<UserBookItemType>>(url)
      .then((response) => response.data)
      .then((data) => data.items)
      .then(setFeedBooks);
  }, []);

  return (
    <View className="flex-1">
      <Swiper horizontal={false} loop={false} showsPagination={false}>
        {!feedBooks ? (
          <View></View>
        ) : (
          feedBooks.map((item) => (
            <SwipeEntry item={item} key={item.id} onUserLike={likeHandler} />
          ))
        )}
      </Swiper>
    </View>
  );
}
