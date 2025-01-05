import { TextInput, Text, View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

export const inputHeight = 40;

export type CommonInputProps = {
    numeric?: boolean | null;
    label?: string | null;
    onChange: (text: string) => void
} & ViewProps

export default function CommonInput({onChange,label = null, numeric = null,className, ...props}: CommonInputProps) {

    return <View className={`${className}`} {...props}>
        { label !== null ? <Text className="font-roboto-light mt-3 mb-1">{label}</Text> : null }
        <TextInput keyboardType={numeric !== null ? 'numeric' : undefined} onChangeText={onChange} className={`w-full bg-neutral-100 rounded-md text-md px-4 ${className}`} style={{height: inputHeight}}/>
    </View>
}