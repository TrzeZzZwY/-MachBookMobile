import { View, Text } from "react-native";
import SectionHeader from "../SectionHeader";
import Chart from "../../../../../assets/svg/chart.svg";

type StatisticsBlockProps = {
    text: string,
    stat: number
}

export default function StatisticsBlock({text,stat}: StatisticsBlockProps) {

  return (
    <View className="w-[28%] h-[90] rounded-lg" style={{backgroundColor: "#EDEDED"}}>
      <View className="py-2 mx-1">
        <Text className="text-center text-xs font-merriweather mt-2">{text}</Text>
        <Text className="text-center text-2xl font-extrabold">{stat}</Text>
      </View>
    </View>
  );
}
