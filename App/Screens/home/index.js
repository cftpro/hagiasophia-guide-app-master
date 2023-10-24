import { Dimensions } from "react-native";
import { createDrawerNavigator } from "react-navigation";

import home from "./components/home";

// import SideMenu from './sideMenu';

const { height, width } = Dimensions.get("window");

const DrawerScreen = createDrawerNavigator(
  {
    home: { screen: home }
  },
  {
    initialRouteName: "home",
    contentOptions: {
      activeTintColor: "black"
    },

    // contentComponent: SideMenu,
    drawerWidth: 275
  }
);

export default DrawerScreen;
