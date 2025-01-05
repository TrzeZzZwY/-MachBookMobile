import { View } from "react-native";

export type ListWrapperProps = {
  children: React.ReactElement | React.ReactElement[];
};

export default function ListWrapper({ children }: ListWrapperProps) {
  return <View>{children}</View>;
}
