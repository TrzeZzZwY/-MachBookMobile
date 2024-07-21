import { View } from "react-native";

export type VerticalListLeftSectionProps = {
  children: React.ReactElement | React.ReactElement[];
};

export default function VerticalListLeftSection({
  children,
}: VerticalListLeftSectionProps) {
  return <View className="flex flex-row">{children}</View>;
}
