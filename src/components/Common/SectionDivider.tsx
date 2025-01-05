import { View, ViewProps } from "react-native";

export type SectionDividerProps = {
} & ViewProps

export default function SectionDivider({className, ...props} : SectionDividerProps) {
    return <View className="flex flex-row justify-center">
        <View className={`w-[95%] h-[0.5] bg-neutral-100 ${className}}`} {...props}/>
    </View>
}