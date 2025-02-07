import { TouchableOpacity, View, Text, useAnimatedValue, Animated, Easing } from "react-native";
import CommonInput from "../../Common/CommonInput";
import { useEffect, useState } from "react";
import Loader from 'svg/loader.svg';
import { AuthorType } from "../../../types/AuthorType";
import AuthorService from "../../../urlBuilders/AuthorUrlBuilder";
import useAxios from "hooks/useAxios";
import AuthorUrlBuilder from "../../../urlBuilders/AuthorUrlBuilder";

export type AddAuthorProps = {
    onCreate: (author: AuthorType) => void;
}

export default function AddAuthor({ onCreate }: AddAuthorProps) {
    
    const axios = useAxios();

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
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

    const handleLastNameChange = (value: string) => {
        setLastName(value)
    }

    const handleContryChange = (value: string) => {
        setCountry(value)
    }

    const handleBirthYearChange = (value: string) => {
        setBirthYear(parseInt(value))
    }

    const handleSubmit = () => {
        const url = AuthorUrlBuilder.createNewAuthor();

        if (birthYear === null)
            return;

        const newAuthor: AuthorType = {
            firstName: firstName,
            lastName: lastName,
            country: country,
            yearOfBirth: birthYear,
            id: 0,
            label: ""
        }

        setLoading(true);

        axios.post(url,newAuthor).finally(() => {
                setLoading(false)
                onCreate(newAuthor)
            });
    }

    return (
        <View>
            <CommonInput label={"Imię autora"} onChange={handleFirstNameChange} />
            <CommonInput label={"Nazwisko autora"} onChange={handleLastNameChange} />
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
                            <Loader className="h-5 w-5" fill={"white"}/>
                        </Animated.View> : <Text className="color-white font-roboto-bold mr-2 text-md">Dodaj Autora</Text>}
                </TouchableOpacity>
            </View>
        </View>
    )
}