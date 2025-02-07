import { ViewProps, StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export type RegionType = {
    id: number,
    regionName: string
}

export const AvailableRegions: RegionType[] = [
    {
        id: 1,
        regionName: "KRK",
    },
    {
        id: 2,
        regionName: "WAW",
    }
]

export type RegionPickerProps = {
    label: string,
    onChange: (region: RegionType) => void
} & ViewProps

const dropdownStyles = StyleSheet.create({
    rootStyle: {
        height: 40,
        backgroundColor: "#F5F5F5",
        borderRadius: 6,
        paddingHorizontal: 15,
    },
    placeholderStyle: {
        fontSize: 14,
        fontWeight: "200",
    }
});

export default function RegionPicker({ onChange, label, ...props }: RegionPickerProps) {

    return (
        <View className={`${props.className}`} {...props}>
            <Text className="mt-3 mb-1 font-roboto-light">{label}</Text>
            <Dropdown
                data={AvailableRegions}
                onChange={onChange}
                valueField={"id"}
                labelField={"regionName"}
                style={dropdownStyles.rootStyle}
                placeholderStyle={dropdownStyles.placeholderStyle}
                placeholder="Wybierz region"
                renderRightIcon={() => null}
                
            />
        </View>
    )
}