import { View, Text } from "react-native";
import CommonHeader from "./Common/CommonHeader";
import SearchablePicker from "./Common/SearchablePicker";
import BookService from "../urlBuilders/BookUrlBuilder";
import BookType from "../types/BookType";
import { AuthorType } from "../types/AuthorType";
import BookModel from "../models/BookModel";
import BookUrlBuilder from "../urlBuilders/BookUrlBuilder";

export type ChooseBookProps = {
    sideButtonAction: () => void,
    onChange: (item: BookModel | null) => void,
} 

export default function ChooseBook({sideButtonAction, onChange}: ChooseBookProps) {

    const bookMapper = (item: BookType) => new BookModel(item);

    const renderDropdownItemForBook = (item: BookType): JSX.Element => {
        return <View className="h-10 my-1 px-3 flex flex-row justify-between items-center">
            <View>
                <View><Text>{item.title}</Text></View>
                <View><Text className="font-roboto-light text-xs">{displayAuthors(item.authors)}</Text></View>
            </View>
        </View>
    }

    const displayAuthors = (authors: AuthorType[]): string => {
        if (authors === null)
            return "";
        return authors.map(a => `${a.firstName} ${a.lastName}`).join(',');
    }

    return (
        <View>
            <CommonHeader text="Wybierz książkę" />
            <SearchablePicker
                sideButtonAction={sideButtonAction}
                onChange={onChange}
                mapper={bookMapper}
                dropdownItemRenderer={renderDropdownItemForBook}
                service={BookUrlBuilder}
                placeholder="Wybierz książkę"
                searchPlaceholder="Wyszukaj książkę..." />
        </View>
    )
}