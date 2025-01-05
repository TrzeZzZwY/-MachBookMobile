import { Text, View } from "react-native";
import { SvgProps } from "react-native-svg";

type SectionHeaderProps = {
  title: string;
  Icon: React.FC<SvgProps>;
};

export default function SectionHeader({ title, Icon }: SectionHeaderProps) {
  return (
    <View className="flex-1 flex-row flex-wrap align-middle">
      <Text className="font-merriweather text-xl">{title}</Text>
      <Icon className="w-5 h-5 mt-1 ml-3" />
    </View>
  );
}
