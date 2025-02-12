import { View, Text, Image, Pressable } from "react-native";
import ImageUrlBuiler from "services/ImageUrlBuilder";
import TrashCan from "svg/trashCan.svg";
import { UserBookItemType } from "types/UserBookItemType";
import User from "svg/user.svg";

export type BookLikedHorizontalListColumnProps = {
  deleteAction: (id: number) => Promise<void>;
  item: UserBookItemType;
};

export default function BookLikedHorizontalListColumn({
  item,
  deleteAction,
}: BookLikedHorizontalListColumnProps) {
  const imageUrl = ImageUrlBuiler.getUserBookItemImage(item.imageId);

  const handleDeletion = () => {
    deleteAction(item.id);
  };

  return (
    <View className="ml-3 h-[80]">
      <View className="relative w-[70] h-[70]">
        <View className="absolute z-[1] mt-1 ml-1">
          <View className="overflow-hidden rounded-md">
            <View className="p-[3] bg-stone-200">
              <User style={{ height: 15, width: 15 }} fill={"#444444"} />
            </View>
          </View>
        </View>
        <View className="rounded-md overflow-hidden h-[70]">
          <Image
            source={{ uri: imageUrl, height: 70, width: 70 }}
            style={{
              resizeMode: "cover",
              aspectRatio: 1,
              width: 70,
              height: 70,
            }}
          />
        </View>
      </View>
      <View className="absolute bottom-[0] flex items-center justify-center w-full">
        <View>
          <Pressable
            onPress={handleDeletion}
            className="w-full rounded-md items-center justify-center py-1 px-4"
            style={{ backgroundColor: "black" }}
          >
            <TrashCan width={12} fill={"white"} height={12} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
