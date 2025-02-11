import { View, Text, ScrollView, Pressable } from "react-native";
import ProfileHeader from "../components/Profile/Sections/ProfileHeader";
import ProfileStatistics from "../components/Profile/Sections/Statistics/ProfileStatistics";
import SectionHeader from "../components/Profile/Sections/SectionHeader";
import Settings from "../../assets/svg/settings.svg";
import Cogs from "../../assets/svg/cogs.svg";
import Chart from "svg/chart.svg";
import WideButton from "../components/Common/WideButtont";
import AngleRight from "svg/angleRight.svg";
import SectionDivider from "../components/Common/SectionDivider";
import { useContext } from "react";
import AuthContext from "../contexts/AuthorizationContext/AuthContext";

export default function ProfilePage() {
  const auth = useContext(AuthContext);

  return (
    <ScrollView className="flex-1">
      <ProfileHeader />
      <View className="mx-5 flex-1 mb-10">
        <View className="mt-2 mb-2">
          <SectionHeader title="Statystyki" Icon={Chart} />
        </View>
        <SectionDivider className="bg-stone-200 mb-5 w-[90%]" />
        <ProfileStatistics
          postedBooksCount={21}
          totalMatchesCount={37}
          totalLikesCount={420}
        />
        <SectionDivider className="bg-stone-200 mt-5 w-[90%]" />
        <View className="mt-5 mb-2">
          <SectionHeader title="Preferencje" Icon={Settings} />
        </View>

        <WideButton text="Twoje polubione tytuly" action={() => null} />
        <WideButton text="Twoi plubieni autorzy" action={() => null} />
        <SectionDivider className="bg-stone-200 mt-5 w-[90%]" />

        <View className="mt-5 mb-2">
          <SectionHeader title="Akcje" Icon={Cogs} />
        </View>

        <WideButton text="Zmiana hasla" action={() => null} />
        <WideButton text="Zmiana adresu email" action={() => null} />
        <WideButton text="Zmiana nazwy uzytkownika" action={() => null} />
        <WideButton text="Zmiana imienia i nazwiska" action={() => null} />
        <WideButton text="Zmiana aktualnego rejonu" action={() => null} />
        <SectionDivider className="bg-stone-200 mt-5 w-[90%]" />
        <View className="mt-5">
          <WideButton text="Wyloguj się" action={() => auth.signOut()} />
          <Pressable className={`bg-red-500 py-3 px-4 rounded-md my-1`}>
            <View className="flex flex-row justify-between">
              <Text className="font-bold color-white">Usunięcie konta</Text>
              <AngleRight className="w-[10]" fill={"#FFFFFF"} />
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
