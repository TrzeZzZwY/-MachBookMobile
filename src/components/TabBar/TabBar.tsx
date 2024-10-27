import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Touchable, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { TabBarButtonRenderer } from "./TabBarButtonRenderer";


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
    position: "absolute",
    bottom: 0,
    padding: 10,
    width: "100%",
    height: 68,
    zIndex: 0,
  },
});

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.tabBarStyle} className="h-18">
      <View className="flex-1 flex-wrap content-center justify-center">
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
            return TabBarButtonRenderer.RenderButtonByRouteName(route.name, onPress, isFocused);
          })
          .map((element, index, arr) => {
            return index < arr.length - 1
              ? [
                  element,
                  <View className="w-[1] mx-3 h-full bg-black opacity-5"></View>,
                ]
              : [element];
          })
          .flat()}
      </View>
    </View>
  );
}
