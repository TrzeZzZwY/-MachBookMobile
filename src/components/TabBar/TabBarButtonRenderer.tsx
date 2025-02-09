import List from "svg/list.svg";
import Hearth from "svg/hearth.svg";
import User from "svg/user.svg";
import Map from "svg/map.svg";

import TabBarButton from "./TabBarButton";

export const MATCH_ROUTE_NAME = "Match";
export const LIST_ROUTE_NAME = "List";
export const PROFILE_ROUTE_NAME = "Profile";
export const MAP_ROUTE_NAME = "Map";

export class TabBarButtonRenderer {
  static RenderButtonByRouteName(
    routeName: string,
    onClick: () => void,
    isActive: boolean
  ): React.ReactElement | null {
    switch (routeName) {
      case MATCH_ROUTE_NAME:
        return (
          <TabBarButton
            Component={Hearth}
            isActive={isActive}
            primaryColor="#DDB6B6"
            secondaryColor="#EEDFDF"
            onClick={onClick}
          />
        );
      case LIST_ROUTE_NAME:
        return (
          <TabBarButton
            Component={List}
            isActive={isActive}
            primaryColor="#8E99AA"
            secondaryColor="#C6D1DF"
            onClick={onClick}
          />
        );
      case PROFILE_ROUTE_NAME:
        return (
          <TabBarButton
            Component={User}
            isActive={isActive}
            primaryColor="#BAB4AA"
            secondaryColor="#E5E2D8"
            onClick={onClick}
          />
        );
      case MAP_ROUTE_NAME:
        return (
          <TabBarButton
            Component={Map}
            isActive={isActive}
            primaryColor="#8EAA94"
            secondaryColor="#C6DFC9"
            onClick={onClick}
          />
        );
      default:
        return null;
    }
  }
}
