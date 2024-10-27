import List from "../../../assets/svg/list.svg";
import Hearth from "../../../assets/svg/hearth.svg";
import User from "../../../assets/svg/user.svg";
import Map from "../../../assets/svg/map.svg";

import TabBarButton from "./TabBarButton";

export class TabBarButtonRenderer
{
  static MATCH_ROUTE_NAME = "match"
  static LIST_ROUTE_NAME = "list"
  static PROFILE_ROUTE_NAME = "profile"
  static MAP_ROUTE_NAME = "map"

  static RenderButtonByRouteName(routeName: string, onClick: () => void, isActive: boolean): React.ReactElement | null {
    switch (routeName) {
      case this.MATCH_ROUTE_NAME:
        return (
          <TabBarButton
            Component={Hearth}
            isActive={isActive}
            primaryColor="#DDB6B6"
            secondaryColor="#EEDFDF"
            onClick={onClick}
          />
        );
      case this.LIST_ROUTE_NAME:
        return (
          <TabBarButton
            Component={List}
            isActive={isActive}
            primaryColor="#8E99AA"
            secondaryColor="#C6D1DF"
            onClick={onClick}
          />
        );
      case this.PROFILE_ROUTE_NAME:
        return (
          <TabBarButton
            Component={User}
            isActive={isActive}
            primaryColor="#BAB4AA"
            secondaryColor="#E5E2D8"
            onClick={onClick}
          />
        );
      case this.MAP_ROUTE_NAME:
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
