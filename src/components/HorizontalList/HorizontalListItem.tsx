import { Asset } from "expo-asset";
import { View, Text } from "react-native";
import ListImage from "../List/ListImage";
import HorizontalListItemBadge from "./HorizontalListItemBadge";

export type HorizontalListItemEntry = {
  image: Asset;
  user: Asset;
  bookId: number;
};

export type HorizontalListItemProps = {
  children: React.ReactElement;
  item: HorizontalListItemEntry;
};

export default function HorizontalListItem({
  item,
  children,
}: HorizontalListItemProps) {
  return (
    <View className="ml-3 h-[80]">
      <View className="relative w-[70] h-[70]">
        <View className="absolute z-[1] mt-1 ml-1">
          <HorizontalListItemBadge source={item.user.uri} />
        </View>
        <ListImage source={item.image.uri} />
      </View>
      <View className="absolute bottom-[0] flex items-center justify-center w-full">
        {children}
      </View>
    </View>
  );
}
