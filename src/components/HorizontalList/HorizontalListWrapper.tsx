import { View } from "react-native";

export type HorizontalListWrapperProps = {
  children: React.ReactElement | React.ReactElement[];
};

export default function HorizontalListWrapper(
  props: HorizontalListWrapperProps
) {
  return <View>{props.children}</View>;
}
