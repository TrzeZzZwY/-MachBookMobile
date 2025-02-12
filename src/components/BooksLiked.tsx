import { View, Text } from "react-native";
import HorizontalList from "./List/HorizontalList/HorizontalList";
import { useContext, useEffect } from "react";
import { useAssets } from "expo-asset";
import { UserBookItemType } from "types/UserBookItemType";
import useAxios from "hooks/useAxios";
import UserBookItemUrlBuilder from "services/UserBookItemUrlBuilder";
import { UserLikesType } from "types/UserLikesType";
import BookLikedHorizontalListColumn from "./List/HorizontalList/ColumnDefinitions/BookLikedHorizontalListColumn";
import UserBookLikedContext from "../contexts/UserBookLikedContext/UserBookLikedContext";

export default function BooksLiked() {
  const axios = useAxios();
  const { data, setData } = useContext(UserBookLikedContext);

  useEffect(() => {
    getUserLikes();
  }, []);

  const getUserLikes = (): Promise<void> => {
    const url = UserBookItemUrlBuilder.getLikedBooks(1, 10);
    return axios
      .get<UserLikesType>(url)
      .then((response) => response.data)
      .then((data) => data.userLikes.items)
      .then(setData)
      .catch(console.log);
  };

  const toggleLike = (id: number): Promise<void> => {
    const url = UserBookItemUrlBuilder.toggleLike();
    return axios
      .post(url, {
        userBookItemId: id,
      })
      .then(getUserLikes)
      .catch(console.log);
  };

  const renderListColumn = (item: UserBookItemType) => (
    <BookLikedHorizontalListColumn item={item} deleteAction={toggleLike} />
  );

  return !data || data.length === 0 ? (
    <View className="mt-10" />
  ) : (
    <View className="mt-10 mb-5">
      <HorizontalList
        data={!data ? [] : data}
        renderColumn={renderListColumn}
        onRefresh={getUserLikes}
      />
    </View>
  );
}
