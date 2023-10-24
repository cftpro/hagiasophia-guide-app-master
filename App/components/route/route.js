//import liraries and files
import { createStackNavigator } from "react-navigation";

import Drawer from "screens/home/index";
import RedeemCode from "screens/redeemCode/index";
import Loading from "screens/loading/index";
import loadingFree from "screens/loadingFree/index";
import mediaScreen from "screens/mediaScreen/index";
import mediaModal from "containers/mediaModal/index";
import AboutThisApp from "screens/aboutThisApp/index";
import freeVersion from "screens/freeVersion/index";
import Tab1 from "screens/mediaScreen/Tabs/tab1";
import Home from "../../Screens/home/components/home";

// create a navigator
export const AppNavigator = createStackNavigator(
  {
    DrawerScreen: { screen: Home },
    redeemCodeScreen: { screen: RedeemCode },
    loadingScreen: { screen: Loading },
    mediaScreen: { screen: mediaScreen },
    Tab1: { screen: Tab1 },
    mediaModal: { screen: mediaModal },
    aboutThisApp: { screen: AboutThisApp },
    freeVersion: { screen: freeVersion },
    loadingFree: { screen: loadingFree }
    // mainScreen: { screen: mainScreen }
  },
  {
    mode: "card",

    headerMode: "none",
    cardStyle: { backgroundColor: "transparentr", opacity: 1 },

    navigationOptions: {
      gesturesEnabled: true
    },
    animationEnabled: true,
    lazy: true,
    navigationOptions: params => ({
      gesturesEnabled: true,
      gesturesDirection: "default"
    }),
    transitionConfig: () => ({
      containerStyle: { backgroundColor: "transparent" },

      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;
        const width = layout.initWidth;
        return {
          opacity: position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 1, 0]
          }),
          transform: [
            {
              translateX: position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [width, 0, -width]
              })
            }
          ]
        };
      },
      transitionSpec: {
        duration: 300
      }
    })
  }
);
