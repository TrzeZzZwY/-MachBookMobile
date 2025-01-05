import { TouchableOpacity, View, Text, useAnimatedValue, Animated, Easing } from "react-native";
import CommonHeader from "../Common/CommonHeader";
import CommonInput from "../Common/CommonInput";
import { useEffect, useState } from "react";
import Loader from 'svg/loader.svg';
import { AuthorType } from "../../types/AuthorType";
import AuthorService from "../../services/AuthorService";

export type AddAuthorPopupProps = {
    isOpen: boolean;
    onAdd: (author: AuthorType) => void;
    close: () => void;
}

export default function AddAuthorPopup({ isOpen, close }: AddAuthorPopupProps) {

    const [firstName, setFirstName] = useState<string>("");
    const [surName, setSurName] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [birthYear, setBirthYear] = useState<number | null>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const animateSpinner = useAnimatedValue(0);

    useEffect(() => {
        Animated.loop(
            Animated.timing(
                animateSpinner,
                {
                    toValue: 1,
                    duration: 3000,
                    easing: Easing.linear,
                    useNativeDriver: false
                }
            )
        ).start()
    })

    const handleFirstNameChange = (value: string) => {
        setFirstName(value);
    }

    const handleSurnameChange = (value: string) => {
        setSurName(value)
    }

    const handleContryChange = (value: string) => {
        setCountry(value)
    }

    const handleBirthYearChange = (value: string) => {
        setBirthYear(parseInt(value))
    }

    const handleSubmit = async () => {

        if (birthYear === null)
            return;

        const newAuthor: AuthorType = {
            firstName: firstName,
            lastName: surName,
            country: country,
            yearOfBirth: birthYear,
            id: 0,
            label: ""
        }

        setLoading(true)

        await AuthorService
            .createNewAuthor(newAuthor)
            .then(close)
            .finally(() => setLoading(false))
    }

    if (isOpen === false)
        return null;

    return <View className="absolute w-full h-full flex justify-center items-center z-20">
        <TouchableOpacity activeOpacity={0.5} className="absolute w-full h-full bg-neutral-500 opacity-50" onPress={close} />
        <View className="w-[300] bg-white rounded-lg p-4">
            <CommonHeader text="Dodaj nowego autora" />
            <CommonInput label={"Imię autora"} onChange={handleFirstNameChange} />
            <CommonInput label={"Nazwisko autora"} onChange={handleSurnameChange} />
            <View className="flex flex-row justify-between">
                <View className="w-[45%] mx-[1%]">
                    <CommonInput label={"Kraj pochodzenia"} onChange={handleContryChange} />
                </View>
                <View className="w-[45%] mx-[1%]">
                    <CommonInput numeric label={"Rok urodzenia"} onChange={handleBirthYearChange} />
                </View>
            </View>
            <View className="mt-5">
                <TouchableOpacity onPress={handleSubmit} className="w-full flex flex-row items-center justify-center bg-neutral-900 px-2 py-3 rounded-md">
                    {loading ?
                        <Animated.View style={{
                            transform: [{
                                rotate: animateSpinner.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg']
                                })
                            }]
                        }}>
                            <Loader className="h-5 w-5" />
                        </Animated.View> : <Text className="color-white font-roboto-bold mr-2 text-md">Dodaj Autora</Text>}
                </TouchableOpacity>
            </View>
        </View>
    </View>
}