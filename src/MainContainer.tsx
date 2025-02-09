import ListPage from "./pages/ListPage";
import {
  NavigationContainer,
  NavigatorScreenParams,
  TabRouter,
  useNavigation,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./components/TabBar/TabBar";
import {
  LIST_ROUTE_NAME,
  MAP_ROUTE_NAME,
  MATCH_ROUTE_NAME,
  PROFILE_ROUTE_NAME,
  TabBarButtonRenderer,
} from "./components/TabBar/TabBarButtonRenderer";
import ProfilePage from "./pages/ProfilePage";
import { StyleSheet, View, StatusBar } from "react-native";
import { useContext, useEffect, useState } from "react";
import AddBookModal from "./components/Modals/AddBookModal";
import SystemNavigationBar from "react-native-system-navigation-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./pages/RootPages/LoginPage";
import RegisterPage from "./pages/RootPages/RegisterPage";
import AuthContext from "./contexts/AuthorizationContext/AuthContext";
import {
  LOGIN_PAGE_ROUTE_NAME,
  REGISTER_PAGE_ROUTE_NAME,
} from "./pages/RootPages/RootPageRouteDefinitions";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainApp: NavigatorScreenParams<AppStackParamList>;
};

export type AppStackParamList = {
  Match: undefined;
  List: undefined;
  Profile: undefined;
  Map: undefined;
};

const Tab = createBottomTabNavigator<AppStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainContainer() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const openModal = (): void => setOpen(true);
  const closeModal = (): void => setOpen(false);

  const auth = useContext(AuthContext);

  return (
    <>
      <AddBookModal isOpen={isOpen} close={closeModal} />
      <NavigationContainer>
        <Stack.Navigator>
          {auth.token === null ? (
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                name={LOGIN_PAGE_ROUTE_NAME}
                component={LoginPage}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name={REGISTER_PAGE_ROUTE_NAME}
                component={RegisterPage}
              />
            </>
          ) : (
            <Stack.Screen name="MainApp" options={{ headerShown: false }}>
              {() => (
                <Tab.Navigator
                  screenOptions={{ header: () => null }}
                  tabBar={(props) => (
                    <TabBar {...{ ...props, openModalAction: openModal }} />
                  )}
                >
                  <Tab.Screen
                    name={MATCH_ROUTE_NAME}
                    component={ListPage}
                    options={{ title: "Welcome" }}
                  />
                  <Tab.Screen
                    name={LIST_ROUTE_NAME}
                    component={ListPage}
                    options={{ title: "Welcome" }}
                  />
                  <Tab.Screen
                    name={MAP_ROUTE_NAME}
                    component={ListPage}
                    options={{ title: "Welcome" }}
                  />
                  <Tab.Screen
                    name={PROFILE_ROUTE_NAME}
                    component={ProfilePage}
                    options={{ title: "Welcome" }}
                  />
                </Tab.Navigator>
              )}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
