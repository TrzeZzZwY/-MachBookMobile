import { View, Text } from "react-native";
import ProfileHeader from "../components/Profile/Sections/ProfileHeader";
import ProfileStatistics from "../components/Profile/Sections/Statistics/ProfileStatistics";
import SectionHeader from "../components/Profile/Sections/SectionHeader";
import Settings from "../../assets/svg/settings.svg";
import Cogs from "../../assets/svg/cogs.svg";

export default function ProfilePage() {
  return (
    <View>
      <ProfileHeader />
      <View className="w-full mx-5">
        <ProfileStatistics
          postedBooksCount={21}
          totalMatchesCount={27}
          totalLikesCount={420}
        />
        <View className="mt-5">
          <SectionHeader title="Preferencje" Icon={Settings} />
          <View className="mt-10">
            <Text className="mt-1 underline">Twoje polubione tytuly</Text>
            <Text className="mt-1 underline">Twoi plubieni autorzy</Text>
          </View>
        </View>
        <View className="mt-10 mb-5">
          <SectionHeader title="Akcje" Icon={Cogs} />
          <View className="mt-10">
            <Text className="mt-1 underline">Zmiana hasla</Text>
            <Text className="mt-1 underline">Zmiana adresu email</Text>
            <Text className="mt-1 underline">Zmiana nazwy uzytkownika</Text>
            <Text className="mt-1 underline">Zmiana imienia i nazwiska</Text>
            <Text className="mt-1 underline">Zmiana aktualnego rejonu</Text>
          </View>
          <View className="mt-10">
            <Text className="mt-1 underline text-red-800">Usuniecie konta</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
