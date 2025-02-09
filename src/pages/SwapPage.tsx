import useAxios from "hooks/useAxios";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import UserBookItemUrlBuilder from "services/UserBookItemUrlBuilder";
import { Pagination } from "types/Pagination";
import { UserBookItemType } from "types/UserBookItemType";
import SwipeEntry from "../components/SwipeEntry";

export default function SwapPage() {
  const [items, setItems] = useState<UserBookItemType[] | null>(null);
  const axios = useAxios();

  const likeHandler = (id: number) => {
    const url = UserBookItemUrlBuilder.toggleLike();

    axios
      .post(url, {
        userBookItemId: id,
      })
      .catch(console.log);
  };

  useEffect(() => {
    const url = UserBookItemUrlBuilder.getFeed(1, 50);

    axios
      .get<Pagination<UserBookItemType>>(url)
      .then((response) => response.data)
      .then((data) => data.items)
      .then(setItems);
  }, []);

  return (
    <View className="flex-1">
      <Swiper horizontal={false} loop={false} showsPagination={false}>
        {!items ? (
          <View></View>
        ) : (
          items.map((item) => (
            <SwipeEntry item={item} key={item.id} onUserLike={likeHandler} />
          ))
        )}
      </Swiper>
    </View>
  );
}
