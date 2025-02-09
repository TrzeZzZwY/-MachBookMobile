import { TouchableOpacity, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { StyleSheet } from "react-native";

type TabBarButtonProps = {
  isActive: boolean;
  Component: React.FC<SvgProps>;
  primaryColor: string;
  secondaryColor: string;
  onClick: () => void;
};

export default function TabBarButton({
  isActive,
  Component,
  primaryColor,
  secondaryColor,
  onClick,
}: TabBarButtonProps) {
  const styles = StyleSheet.create({
    buttonStyles: {
      backgroundColor: secondaryColor,
      borderColor: primaryColor,
      opacity: isActive ? 1 : 0.5,
      borderWidth: isActive ? 2 : 0,
    },
    iconStyles: {
      color: primaryColor,
    },
  });

  return (
    <TouchableOpacity onPress={onClick}>
      <View className="w-14 h-full p-2 rounded-md" style={styles.buttonStyles}>
        <Component fill={primaryColor} />
      </View>
    </TouchableOpacity>
  );
}
