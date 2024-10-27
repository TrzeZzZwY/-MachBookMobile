import ListPage from "./pages/ListPage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./components/TabBar/TabBar";
import { TabBarButtonRenderer } from "./components/TabBar/TabBarButtonRenderer";

const Tab = createBottomTabNavigator();

export default function MatchBook() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{header: () => null}} 
        tabBar={props => <TabBar {...props}/>}
        >
        <Tab.Screen
          name={TabBarButtonRenderer.MATCH_ROUTE_NAME}
          component={ListPage}
          options={{ title: "Welcome" }}
        />
        <Tab.Screen
          name={TabBarButtonRenderer.LIST_ROUTE_NAME}
          component={ListPage}
          options={{ title: "Welcome" }}
        />
        <Tab.Screen
          name={TabBarButtonRenderer.MAP_ROUTE_NAME}
          component={ListPage}
          options={{ title: "Welcome" }}
        />
        <Tab.Screen
          name={TabBarButtonRenderer.PROFILE_ROUTE_NAME}
          component={ListPage}
          options={{ title: "Welcome" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
