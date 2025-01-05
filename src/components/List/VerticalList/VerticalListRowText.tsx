import { Text, View } from "react-native";

export type VerticalListRowTextProps = {
  header: string;
  subHeader: string;
};

export default function VerticalListRowText({
  header,
  subHeader,
}: VerticalListRowTextProps) {

  return (
    <View className="flex justify-center ml-3 max-w-[200]">
      <View>
        <Text className="font-roboto-light text-sm" numberOfLines={2}>{header}</Text>
      </View>
      <View>
        <Text className="font-roboto-bold text-xs" numberOfLines={1}>{subHeader}</Text>
      </View>
    </View>
  );
}
