import { View, Text, Pressable } from "react-native";
import CommonInput from "../../components/Common/CommonInput";
import SectionDivider from "../../components/Common/SectionDivider";
import CommonHeader from "../../components/Common/CommonHeader";
import { useNavigation } from "@react-navigation/native";
import { LOGIN_PAGE_ROUTE_NAME } from "./RootPageRouteDefinitions";
import RegionPicker, { RegionType } from "../../components/Common/RegionPicker";
import CommonDatePicker from "../../components/Common/CommonDatePicker";
import { useState } from "react";
import useAxios from "hooks/useAxios";
import AuthUrlBuilder from "services/AuthUrlBuilder";
import { axiosAuth, axiosPrivate } from "../../axios/axios";

export default function RegisterPage() {
    const navigate = useNavigation();

    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [birthYear, setBirthYear] = useState<Date | null>(null);
    const [region, setRegion] = useState<RegionType | null>(null);

    const handleRegisterUser = () => {
        const url = AuthUrlBuilder.register();


        console.log(firstName)
        console.log(lastName)
        console.log(email)
        console.log(password)
        console.log(birthYear?.toISOString())
        console.log(region)

        console.log(url)

        axiosAuth.post(url, {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            bithDate: birthYear?.toISOString(),
            region: region?.id
        }).then(() => {
            navigate.navigate(LOGIN_PAGE_ROUTE_NAME);
        }).catch(console.log)
    }

    const navigateToLoginPage = () => {
        navigate.navigate(LOGIN_PAGE_ROUTE_NAME);
    }

    return (
        <View className="h-[100vh] w-[100vw] flex items-center justify-center">
            <View className="mx-5 px-8 py-10 rounded-xl bg-white shadow-xl min-w-[85%]">
                <View>
                    <CommonHeader text="Zarejestruj się do aplikacji" className="text-center text-lg color-neutral-700" />
                    <CommonHeader text="MatchBook!" className="text-center"></CommonHeader>
                </View>
                <SectionDivider className="mt-5 w-[70%]" />
                <View className="mt-4">
                    <View className="flex flex-row">
                        <CommonInput className="w-[48%] mx-1" label={"Imie"} onChange={setFirstName} />
                        <CommonInput className="w-[48%] mx-1" label={"Nazwisko"} onChange={setLastName} />
                    </View>
                    <CommonInput label={"Email"} onChange={setEmail} />
                    <CommonInput label={"Hasło"} onChange={setPassword} />
                    <View className="flex flex-row">
                        <CommonDatePicker className="w-[48%] mx-1" label={"Data urodzenia"} onChange={setBirthYear} />
                        <RegionPicker className="w-[48%] mx-1" label={"Region"} onChange={setRegion} />
                    </View>

                </View>
                <SectionDivider className="mt-5 w-[70%]" />
                <View className="mt-8">
                    <View className="flex items-center">
                        <Pressable className="px-6 bg-neutral-900 py-3 rounded-md" onPress={handleRegisterUser}>
                            <Text className="color-white font-roboto-bold">Zarejestruj się</Text>
                        </Pressable>
                    </View>
                </View>
                <View className="mt-5">
                    <Pressable className="w-full" onPress={navigateToLoginPage}>
                        <Text className="text-center color-neutral-300">Posiadasz już konto?</Text>
                        <Text className="text-center underline color-neutral-600 font-bold">Zaloguj się!</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}