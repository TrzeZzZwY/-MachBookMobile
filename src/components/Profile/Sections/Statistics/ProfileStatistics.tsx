import { View } from "react-native";
import SectionHeader from "../SectionHeader";
import Chart from "../../../../../assets/svg/chart.svg";
import StatisticsBlock from "./StatisticsBlock";

type ProfileStatisticsProps = {
  postedBooksCount: number;
  totalMatchesCount: number;
  totalLikesCount: number;
};

export default function ProfileStatistics({
  postedBooksCount,
  totalMatchesCount,
  totalLikesCount,
}: ProfileStatisticsProps) {
  return (
    <View className="flex flex-row items-center justify-between ">
      <StatisticsBlock text="Wystawione ksiazki" stat={postedBooksCount} />
      <StatisticsBlock text="Liczba matchy" stat={totalMatchesCount} />
      <StatisticsBlock text="Liczba polubien" stat={totalLikesCount} />
    </View>
  );
}
