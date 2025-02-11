import { Pressable, View, Text } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import AngleRight from "svg/angleRight.svg";

export type WideButtonType = {
  action: () => void;
  text: string;
} & ViewProps;

export default function WideButton({ text, action, ...props }: WideButtonType) {
  return (
    <Pressable
      className={`bg-stone-200 py-3 px-4 rounded-md my-1`}
      {...props}
      onPress={action}
    >
      <View className="flex flex-row justify-between">
        <Text className="font-light color-neutral-900">{text}</Text>
        <AngleRight className="w-[10]" fill={"#1e2939"} />
      </View>
    </Pressable>
  );
}
