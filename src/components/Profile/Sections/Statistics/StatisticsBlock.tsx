import { View, Text } from "react-native";

type StatisticsBlockProps = {
  text: string;
  stat: number;
};

export default function StatisticsBlock({ text, stat }: StatisticsBlockProps) {
  return (
    <View className="w-[29%] h-[90] rounded-lg bg-stone-200">
      <View className="py-2 mx-1">
        <Text className="text-center text-xs font-merriweather mt-2">
          {text}
        </Text>
        <Text className="text-center text-2xl font-extrabold">{stat}</Text>
      </View>
    </View>
  );
}
