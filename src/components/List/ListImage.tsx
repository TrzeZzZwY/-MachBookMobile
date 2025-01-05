import { Image, ImageSourcePropType, View } from "react-native";

export type ListImageProps = {
  source: string;
};

export default function ListImage({ source }: ListImageProps) {
  return (
    <View className="rounded-md overflow-hidden">
      <Image source={{ uri: source, height: 70, width: 70 }} style={{resizeMode: "cover", aspectRatio: 1}} />
    </View>
  );
}
