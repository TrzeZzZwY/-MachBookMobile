import { View, Image, Text, Pressable } from "react-native";
import ImageUrlBuiler from "services/ImageUrlBuilder";
import { UserBookItemType } from "types/UserBookItemType";
import SectionDivider from "./Common/SectionDivider";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import HearthFull from "svg/hearthFull.svg";
import useAxios from "hooks/useAxios";

const DOUBLE_TAP_DELAY = 200;
const LIKE_DELAY = 750;

export type SwipeEntryProps = {
  item: UserBookItemType;
  onUserLike: (id: number) => void;
};

export default function SwipeEntry({ item, onUserLike }: SwipeEntryProps) {
  const [hearthVisible, setHearthVisible] = useState<boolean>(false);
  const [firstTap, setFirstTap] = useState<boolean>(true);
  const [tapTimeout, setTapTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const imageUrl = ImageUrlBuiler.getUserBookItemImage(item.imageId);
  const authors = item.bookReference.authors
    .map((author) => `${author.firstName} ${author.lastName}`)
    .join(",");

  const handleLike = () => {
    setHearthVisible(true);
    onUserLike(item.id);
    setTimeout(() => {
      setHearthVisible(false);
    }, LIKE_DELAY);
  };

  const handleDoubleTap = () => {
    if (firstTap) {
      setFirstTap(false);

      setTimeout(() => {
        setFirstTap(true);
      }, DOUBLE_TAP_DELAY);
    } else {
      setFirstTap(true);
      handleLike();
    }
  };

  return (
    <View className="flex-1">
      <View className="flex-1">
        <View className="h-full">
          <Pressable onPress={handleDoubleTap} className="flex-1">
            <Image src={imageUrl} style={{ flex: 1 }} />
            {hearthVisible ? (
              <View className="absolute flex-1 h-full w-full items-center justify-center z-10">
                <View className="mb-10">
                  <HearthFull
                    className="w-24 h-24 shadow-xl shadow-black"
                    fill={"#ec003f"}
                  />
                </View>
              </View>
            ) : null}
            <LinearGradient
              style={{ opacity: 0.2 }}
              colors={["transparent", "#1c1917"]}
              className="h-full w-full absolute"
            />
          </Pressable>

          <View className="flex-1 absolute z-10 bottom-7 w-full px-5 py-5">
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0.0, 0.99]}
              colors={["#fafaf9", "#f5f5f4"]}
              className="flex rounded-md bg-stone-100 py-5 px-5 shadow-lg"
            >
              <Text className="font-merriweather-bold text-xl">
                {item.description}
              </Text>
              <SectionDivider className="bg-stone-200 my-2" />
              <View className="mt-1">
                <Text className="font-bold text-xs">
                  <Text className="font-roboto-light">Tytuł książki: </Text>
                  {item.bookReference.title}
                </Text>
                <Text className="font-bold text-xs">
                  <Text className="font-roboto-light">Autorzy: </Text>
                  {authors}
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </View>
    </View>
  );
}
