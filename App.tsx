import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import ListPage from "./src/pages/ListPage";
import { useFonts } from "expo-font";

export default function App() {

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Merriweather": require("./assets/fonts/Merriweather-Regular.ttf")
  })

  if(!fontsLoaded) {
    return (
      <Text>Loading...</Text>
    )
  }

  return (
    <View>
      <ListPage />
    </View>
  );
}
