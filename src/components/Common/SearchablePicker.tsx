import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Plus from "svg/plus.svg";
import { useEffect, useState } from "react";
import { SearchableUrlBuilder } from "services/abstract/SearchableUrlBuilder";
import { SearchableType } from "types/SearchableType";
import useAxios from "hooks/useAxios";
import { Pagination } from "types/Pagination";

export type SearchablePickerProps<T extends SearchableType> = {
    sideButtonAction?: null | (() => void);
    onChange: (item: T | null) => void;
    dropdownItemRenderer: (item: T) => JSX.Element;
    mapper: (item: T) => T;
    service: SearchableUrlBuilder<T>;
    placeholder: string;
    searchPlaceholder: string;
}

const sectionHeight = 40;

const dropdownStyles = StyleSheet.create({
    dropdown: {
        height: sectionHeight,
        backgroundColor: "#F5F5F5",
        borderRadius: 6,
        paddingHorizontal: 15,
    },
    containerStyle: {
        marginTop: 5,
        borderRadius: 6,
    },
    inputSearchStyle: {
        height: sectionHeight,
        borderRadius: 4,
        fontFamily: "Roboto-Light"
    }
});

export default function SearchablePicker<T extends SearchableType>({ onChange, dropdownItemRenderer, service, placeholder, mapper, searchPlaceholder, sideButtonAction = null }: SearchablePickerProps<T>) {

    const axios = useAxios();
    const [searchTimeout, setSearchTimeout] = useState<null | ReturnType<typeof setTimeout>>(null);
    const [items, setItems] = useState<null | T[]>(null);

    useEffect(() => {
        seatchItems("")
    }, [])

    const seatchItems = (query: string) => {

        axios.get<Pagination<T>>(service.searchItems(query))
            .then(response => response.data)
            .then(data => data.items.map(mapper))
            .then(setItems);
    }


    const handleSearch = (searchTerm: string) => {
        if (searchTerm === '')
            return;

        if (searchTimeout !== null)
            clearTimeout(searchTimeout);

        const timeout = setTimeout(() => seatchItems(searchTerm), 250)
        setSearchTimeout(timeout);
    }

    return (
        <View>
            <View className="mt-2 flex-row items-center justify-between">
                <View className={sideButtonAction !== null ? "w-[80%]" : "w-[100%]"}>
                    <Dropdown
                        data={items === null ? [] : items}
                        onChangeText={handleSearch}
                        onChange={onChange}
                        valueField={"id"}
                        labelField={"label"}
                        search
                        style={dropdownStyles.dropdown}
                        containerStyle={dropdownStyles.containerStyle}
                        inputSearchStyle={dropdownStyles.inputSearchStyle}
                        placeholder={placeholder}
                        searchPlaceholder={searchPlaceholder}
                        renderItem={dropdownItemRenderer}

                    />
                </View>
                {sideButtonAction !== null ? <View className="w-[18%] ml-[2%]" style={{ height: sectionHeight }}>
                    <TouchableOpacity className="w-full h-full flex items-center justify-center bg-neutral-900 rounded-md" onPress={sideButtonAction}>
                        <Plus className="h-5 w-5" fill={"white"} />
                    </TouchableOpacity>
                </View> : null}

            </View>
        </View>
    )
}

