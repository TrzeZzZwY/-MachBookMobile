import { View } from "react-native";
import SectionHeader from "../SectionHeader";
import Chart from "../../../../../assets/svg/chart.svg";
import StatisticsBlock from "./StatisticsBlock";

type ProfileStatisticsProps = {
  postedBooksCount: number,
  totalMatchesCount: number, 
  totalLikesCount: number
}

export default function ProfileStatistics({postedBooksCount,totalMatchesCount,totalLikesCount} : ProfileStatisticsProps) {

  return (
    <View>
      <SectionHeader title="Twoje statysyki" Icon={Chart} />
      <View className="flex flex-row items-center justify-between mt-10 w-[90%]">
        <StatisticsBlock text="Wystawione ksiazki" stat={postedBooksCount} />
        <StatisticsBlock text="Liczba matchy" stat={totalMatchesCount} />
        <StatisticsBlock text="Liczba polubien" stat={totalLikesCount} />
      </View>
    </View>
  );
}
