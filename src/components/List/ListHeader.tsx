import { View, Text } from "react-native";
import CommonHeader from "../Common/CommonHeader";

export type ListHeaderProps = {
  text: string;
};

export default function ListHeader({ text }: ListHeaderProps) {
  return (
    <View className="mt-8">
      <CommonHeader text={text} />
    </View>
  );
}
