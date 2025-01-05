import { ColorValue, Pressable, View } from "react-native";
import { TrashIcon } from "../List/ListDeleteButton";
import Svg, { NumberProp, Path } from "react-native-svg";

export type ListDeleteButtonProps = {
  backgroundColor: ColorValue;
  color: ColorValue;
  deleteAction: () => void;
};

export default function HorizontalListDeleteButton(
  props: ListDeleteButtonProps
) {
  return (
    <View>
      <Pressable
        className="w-full rounded-md items-center justify-center py-1 px-4"
        onPress={props.deleteAction}
        style={{ backgroundColor: props.backgroundColor }}
      >
        <AltTrashIcon color={props.color} size={12} />
      </Pressable>
    </View>
  );
}

export const AltTrashIcon = ({color,size} : {color: ColorValue, size: NumberProp}) => {
  return (
    <Svg viewBox="0 0 448 512" fill={color} width={size} height={size}>
      <Path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
    </Svg>
  );
};
