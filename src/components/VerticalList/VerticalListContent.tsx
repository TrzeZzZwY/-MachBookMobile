import { View } from "react-native";

export type VerticalListContentProps = {
  children: React.ReactElement;
};

export default function VerticalListContent({
  children,
}: VerticalListContentProps) {
  return <View>{children}</View>;
}
