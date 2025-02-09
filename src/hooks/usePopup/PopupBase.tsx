import { TouchableOpacity, View } from "react-native";
import CommonHeader from "../../components/Common/CommonHeader";

export type PopupBaseProps = {
  children: React.ReactNode | React.ReactNode[] | null | undefined;
  header: string;
  isOpen: boolean;
  close: () => void;
};

export default function PopupBase({
  children,
  header,
  isOpen,
  close,
}: PopupBaseProps): React.JSX.Element | null {
  return isOpen === true ? (
    <View className="absolute w-full h-full flex justify-center items-center z-20">
      <TouchableOpacity
        activeOpacity={0.5}
        className="absolute w-full h-full bg-neutral-500 opacity-50"
        onPress={close}
      />
      <View className="w-[300] bg-white rounded-lg p-4">
        <CommonHeader text={header} />
        <View>{children}</View>
      </View>
    </View>
  ) : null;
}
