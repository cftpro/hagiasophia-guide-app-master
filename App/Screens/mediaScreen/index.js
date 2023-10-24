import React, { PureComponent } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  Image,
  Platform
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import {
  createBottomTabNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
  HeaderBackButton
} from "react-navigation";
import { strings } from "i18/i18n.js";

import tab1 from "./Tabs/tab1";
import tab2 from "./Tabs/tab2";
import tab3 from "./Tabs/tab3";
import images from "components/images/images";
import { placeholder } from "@babel/types";

const { height, width } = Dimensions.get("window");

function SafeAreaMaterialTopTabBar(props) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#f4f7f6",
        paddingTop: Platform.OS === "ios" ? verticalScale(15) : 0
      }}
    >
      {/* {Platform.OS === "ios" || true || (
        <HeaderBackButton
          titleStyle={{ backgroundColor: "#f4f7f6" }}
          onPress={() => navigation.goBack(null)}
        />
	  )} */}
      {Platform.OS === "ios" && (
        <View
          style={{
            backgroundColor: "#f4f7f6",
            paddingTop: verticalScale(10),
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              width: "100%",
              paddingTop: verticalScale(12),

              flex: 1,
              textAlign: "center",
              fontFamily: "Poppins SemiBold",
              fontSize: moderateScale(20),
              fontWeight: "500",
              textAlignVertical: "center"
            }}
          >
            {strings("homePage.hagiaSophia")}
          </Text>
          <View>
            <HeaderBackButton
              onPress={() => {
                props.navigation.navigate("DrawerScreen");
                console.log("adadaaa");
              }}
              width={50}
            />
          </View>
        </View>
      )}
      <MaterialTopTabBar {...props} />
    </SafeAreaView>
  );
}

const TabNavigator = createMaterialTopTabNavigator(
  {
    tab1: {
      screen: tab1,
      navigationOptions: ({ navigation }) => ({
        title: strings("mediaScreen.Garden")
      })
    },
    bahce: {
      screen: tab2,
      navigationOptions: ({ navigation }) => ({
        title: strings("mediaScreen.FirstFloor")
      })
    },
    tab2: {
      screen: tab3,
      navigationOptions: ({ navigation }) => ({
        title: strings("mediaScreen.SecondFloor")
      })
    }

    // strings("Garden"): tab1,
    // 	strings("FirstFloor"): tab2,
    // 	strings("SecondFloor"): tab3
  },
  {
    tabBarPosition: "top",
    tabBarComponent: props => SafeAreaMaterialTopTabBar(props),
    // tabBarComponent: props => {
    //   return (
    //     <SafeAreaView
    //       style={{
    //         flexDirection: "row",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         backgroundColor: "#f4f7f6"
    //       }}
    //     >
    //       <HeaderBackButton
    //         {...props}
    //         onPress={() => {
    //           props.navigation.navigate("DrawerScreen");
    //         }}
    //         titleStyle={{
    //           backgroundColor: "#f4f7f6",
    //           alignSelf: "center",
    //           marginTop: 20,
    //           textAlignVertical: "center"
    //         }}
    //         style={{
    //           backgroundColor: "#f4f7f6",
    //           alignSelf: "center",
    //           marginTop: 20,
    //           textAlignVertical: "center"
    //         }}
    //       />
    //       <MaterialTopTabBar
    //         {...props}
    //         style={{
    //           flex: 1,
    //           backgroundColor: "#f4f7f6"
    //         }}
    //       />
    //     </SafeAreaView>
    //   );
    // },
    tabBarOptions: {
      indicatorStyle: {
        height: verticalScale(3),
        borderColor: "#e62739",
        backgroundColor: "#e62739",
        // marginTop: verticalScale(0),
        width: 120
        // marginHorizontal: scale(5)
      },

      scrollEnabled: false,
      upperCaseLabel: false,
      tabStyle: {
        // marginTop: 20
        // borderTopWidth: 0.5,
        // borderColor: "#707070"
      },
      labelStyle: {
        fontFamily: "Poppins",
        fontSize: moderateScale(17),
        fontWeight: "500",
        textAlignVertical: "center",
        fontStyle: "normal",
        // lineHeight: 0,
        letterSpacing: 0,
        textAlign: "left",
        color: "#707070"
      },

      style: {
        marginTop: Platform.OS === "ios" ? 0 : verticalScale(14),
        backgroundColor: "#f4f7f6"
      }
    }
  }
);

export default createAppContainer(TabNavigator);
