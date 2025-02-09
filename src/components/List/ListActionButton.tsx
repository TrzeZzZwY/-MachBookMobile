import { ColorValue, Pressable, View } from "react-native";

type ListDeleteButtonProps = {
  icon: React.ReactElement;
  backgroundColor: ColorValue;
  action: () => void;
};

export default function ListActionButton({
  backgroundColor,
  action,
  icon,
}: ListDeleteButtonProps) {
  return (
    <View>
      <Pressable
        className="w-full rounded-sm flex items-center justify-center py-2"
        onPress={action}
        style={{ backgroundColor: backgroundColor }}
      >
        {icon}
      </Pressable>
    </View>
  );
}
