import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { TabBarButtonRenderer } from "./TabBarButtonRenderer";
import Plus from "svg/plus.svg";

export const BOTTOM_BAR_NAVIGATION_HEIGHT = 68;

//https://stackoverflow.com/questions/73372647/tailwind-css-in-react-native-box-shadow
const styles = StyleSheet.create({
  tabBarStyle: {
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    backgroundColor: "#fff",
    bottom: 0,
    width: "100%",
    zIndex: 0,
    height: BOTTOM_BAR_NAVIGATION_HEIGHT,
  },
});

export type CustomBottomTabBarProps = BottomTabBarProps & {
  openModalAction: () => void;
};

export default function TabBar({
  state,
  descriptors,
  navigation,
  openModalAction,
}: CustomBottomTabBarProps) {
  return (
    <View style={styles.tabBarStyle}>
      <View className="absolute w-full top-[-40] flex items-center justify-center">
        <TouchableOpacity onPress={openModalAction}>
          <View className="h-[40] bg-black opacity-[0.9] w-[160] flex items-center justify-center flex-row rounded-t-[5]">
            <Plus className="h-5 w-5 mr-3" fill={"white"} />
            <Text className="color-white font-bold">Dodaj książkę</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-1 flex-wrap content-center justify-center p-2">
        {state.routes
          .map((route, index) => {
            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };
            return TabBarButtonRenderer.RenderButtonByRouteName(
              route.name,
              onPress,
              isFocused
            );
          })
          .map((element, index, arr) => {
            return index < arr.length - 1
              ? [
                  element,
                  <View className="w-[1] mx-3 h-[50%] bg-black opacity-5"></View>,
                ]
              : [element];
          })
          .flat()}
      </View>
    </View>
  );
}
