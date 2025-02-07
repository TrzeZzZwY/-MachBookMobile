import { useContext, useState } from "react";
import { Pressable, View, Text } from "react-native";
import AuthContext from "../../contexts/AuthorizationContext/AuthContext";
import CommonInput from "../../components/Common/CommonInput";
import CommonHeader from "../../components/Common/CommonHeader";
import SectionDivider from "../../components/Common/SectionDivider";
import { useNavigation } from "@react-navigation/native";
import { REGISTER_PAGE_ROUTE_NAME } from "./RootPageRouteDefinitions";

export default function LoginPage() {
    const [email, setEmail] = useState<string | null>();
    const [password, setPassword] = useState<string | null>();

    const auth = useContext(AuthContext);
    const navigate = useNavigation();

    const navigateToRegisterPage = () => {
        navigate.navigate(REGISTER_PAGE_ROUTE_NAME);
    }

    const login = () => {
        if (email && password)
            auth.signIn(email, password)
    }
 
    return (
        <View className="h-[100vh] w-[100vw] flex items-center justify-center">
            <View className="mx-5 px-8 py-10 rounded-xl bg-white shadow-xl min-w-[85%]">
                <View>
                    <CommonHeader text="Zaloguj się do aplikacji" className="text-center color-neutral-700 text-lg" />
                    <CommonHeader text="MatchBook!" className="text-center" />
                </View>
                <SectionDivider className="mt-5 w-[70%]"/>
                <View className="mt-4">
                    <CommonInput label={"Email"} onChange={setEmail} />
                    <CommonInput label={"Hasło"} onChange={setPassword} />
                </View>
                <SectionDivider className="mt-5 w-[70%]"/>
                <View className="mt-8">
                    <View className="flex items-center">
                        <Pressable className="px-6 bg-neutral-900 py-3 rounded-md" onPress={login}>
                            <Text className="color-white font-roboto-bold">Zaloguj się</Text>
                        </Pressable>
                    </View>
                </View>
                <View className="mt-5">
                    <Pressable className="w-full" onPress={navigateToRegisterPage}>
                        <Text className="text-center color-neutral-300">Nie posiadasz konta?</Text>
                        <Text className="text-center underline color-neutral-600 font-bold">Zarejestruj się</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}