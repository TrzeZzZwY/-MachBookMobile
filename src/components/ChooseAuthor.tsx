import { View, Text } from "react-native";
import CommonHeader from "./Common/CommonHeader";
import SearchablePicker from "./Common/SearchablePicker";
import { AuthorModel } from "../models/AuthorModel";
import AuthorService from "services/AuthorService";

export type ChooseAuthorProps = {
    sideButtonAction: () => void,
    onChange: (item: AuthorModel | null) => void,
} 

export default function ChooseAuthor({sideButtonAction,onChange} : ChooseAuthorProps) {

    const renderDropdownItemForAuthor = (item: AuthorModel): JSX.Element => {
        return <View className="h-10 my-1 px-3 flex flex-row justify-between items-center">
            <View>
                <View><Text>{item.label}</Text></View>
                <View><Text className="font-roboto-light text-xs">{item.country}</Text></View>
            </View>

            <View className="bg-neutral-100 py-1 px-2 rounded-md">
                <Text className="font-roboto-bold text-neutral-800">{item.yearOfBirth}</Text>
            </View>
        </View>
    }

    return (
        <View>
            <CommonHeader text="Wybierz autora książki" />
            <SearchablePicker
                sideButtonAction={sideButtonAction}
                onChange={onChange}
                dropdownItemRenderer={renderDropdownItemForAuthor}
                service={AuthorService}
                placeholder="Wybierz autora"
                searchPlaceholder="Wyszukaj autora..." />
        </View>
    )
}