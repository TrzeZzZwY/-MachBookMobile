import { Image, ImageSourcePropType, View } from "react-native";

export type ListImageProps = {
  source: string;
  src?: string;
};

export default function ListImage({ source, src }: ListImageProps) {

  return (
    <View className="rounded-md overflow-hidden h-[70]">
      { src === undefined ? 
        <Image source={{ uri: source, height: 70, width: 70 }} style={{resizeMode: "cover", aspectRatio: 1, width: 70, height: 70}} /> : 
        <Image src={src} style={{resizeMode: "cover", aspectRatio: 1, width: 70, height: 70}} /> }
    </View>
  );
}
