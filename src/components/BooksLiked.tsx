import { View, Text } from "react-native";
import HorizontalList from "./List/HorizontalList/HorizontalList";
import { useEffect, useState } from "react";
import { useAssets } from "expo-asset";
import { UserBookItemType } from "types/UserBookItemType";
import useAxios from "hooks/useAxios";
import UserBookItemUrlBuilder from "services/UserBookItemUrlBuilder";
import { Pagination } from "types/Pagination";
import { UserLikesType } from "types/UserLikesType";
import BookLikedHorizontalListColumn from "./List/HorizontalList/ColumnDefinitions/BookLikedHorizontalListColumn";

export default function BooksLiked() {
  const axios = useAxios();
  const [data, setData] = useState<UserBookItemType[]>([]);
  const [assets, error] = useAssets([
    require("../../assets/images/template.png"),
    require("../../assets/images/user.png"),
  ]);

  const editAction = () => {};

  useEffect(() => {
    const url = UserBookItemUrlBuilder.getLikedBooks(1, 10);
    axios
      .get<UserLikesType>(url)
      .then((response) => response.data)
      .then((data) => data.userLikes.items)
      .then(setData)
      .catch(console.log);
  }, []);

  const getUserLikes = async () => {
    const url = UserBookItemUrlBuilder.getLikedBooks(1, 10);
    return await axios
      .get<UserLikesType>(url)
      .then((response) => response.data)
      .then((data) => data.userLikes.items)
      .then(setData)
      .catch(console.log);
  };

  const renderListColumn = (item: UserBookItemType) => {
    return <BookLikedHorizontalListColumn item={item} />;
  };

  return (
    <View className="mt-10">
      <HorizontalList
        data={data}
        renderColumn={renderListColumn}
        onRefresh={getUserLikes}
      />
    </View>
  );
}
