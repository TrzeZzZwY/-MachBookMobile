import { View, Text } from "react-native";

export type ListHeaderProps = {
  text: string,
};

export default function ListHeader({ text }: ListHeaderProps) {
  return (
    <View className="mt-8">
      <Text className="font-merriweather text-xl">{text}</Text>
    </View>
  );
}
