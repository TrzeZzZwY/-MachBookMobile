import { View } from "react-native";

export type VerticalListRightSectionProps = {
  children: React.ReactElement | React.ReactElement[];
};

export default function VerticalListRightSection({
  children,
}: VerticalListRightSectionProps) {
  return <View className="w-[60] flex justify-around">{children}</View>;
}
