import { useAssets } from "expo-asset";
import { Text, View, Image } from "react-native";

export default function ProfileHeader() {
  const [assets, error] = useAssets(
    require("../../../../assets/images/user.png")
  );

  return (
    <View className="h-40 relative">
      <View>
        <View className="bg-purple-300 h-[50%] "></View>
        <View className=" h-20"></View>
      </View>
      <View className="flex-1 flex-wrap justify-center inset-0 w-full h-full absolute">
        <View className="flex flex-wrap h-[50%] ml-5">
          <View className="w-20 h-full mr-8 mt-[-8]">
            {assets != undefined ? (
              <View className="bg-red-500 h-[100] w-[100] rounded-full" />
            ) : (
              // <Image
              //   source={{
              //     uri: assets[0].uri,
              //     height: 100,
              //     width: 100,
              //   }}
              //   style={{
              //     resizeMode: "cover",
              //     aspectRatio: 1,
              //   }}
              //   className="rounded-full shadow-lg"
              // />
              <View className="bg-black" />
            )}
          </View>
          <View className="flex h-20 justify-center mt-[-6]">
            <Text className="text-2xl font-roboto-light mb-2">
              Dawid Jasper
            </Text>
            <Text className="font-bold text-md">11.09.2001</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
