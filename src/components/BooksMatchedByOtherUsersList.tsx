import { View } from "react-native";
import HorizontalList from "./HorizontalList/HorizontalList";
import { HorizontalListItemEntry } from "./HorizontalList/HorizontalListItem";
import { useEffect, useState } from "react";
import { useAssets } from "expo-asset";

export default function BooksMatchedByOthersUsersList() {
  const [data, setData] = useState<HorizontalListItemEntry[]>([]);
  const [assets, error] = useAssets([
    require("../../assets/images/template.png"),
    require("../../assets/images/user.png"),
  ]);

  const editAction = () => {};

  useEffect(() => {
    if (assets !== undefined) {
      setData([
        {
          image: assets[0],
          user: assets[1],
          bookId: 1,
        },
        {
          image: assets[0],
          user: assets[1],
          bookId: 2,
        },
        {
          image: assets[0],
          user: assets[1],
          bookId: 3,
        },
        {
          image: assets[0],
          user: assets[1],
          bookId: 4,
        },
        {
          image: assets[0],
          user: assets[1],
          bookId: 5,
        },
        {
          image: assets[0],
          user: assets[1],
          bookId: 6,
        },
      ]);
    }
  }, [assets]);

  return (
    <View className="mt-10">
      <HorizontalList data={data}/>
    </View>
  );
}
