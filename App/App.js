//import liraries and files
import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { AppNavigator } from "components/route/route";
import { ImageBackground, Image, Dimensions } from "react-native";
import { Root } from "native-base";
import images from "components/images/images";

const { height, width } = Dimensions.get("window");
console.log("Width Height");
console.log(height);
console.log(width);
//make this AppNavigator available to the app
const App = createAppContainer(AppNavigator);
export default class NavigatorApp extends Component {
  render() {
    return (
      <Root style={{ height: height, width: width }}>
        <ImageBackground
          source={images.background}
          style={{
            flex: 1,
            // alignSelf:"center",
            backgroundColor: "#000",
            alignContent: "center"
          }}
          resizeMode="cover"
          resizeMethod="resize"
          imageStyle={{
            opacity: 0.8,
            backgroundColor: "#000"
          }}
        >
          <App style={{ backgroundColor: "black" }} />
        </ImageBackground>
      </Root>
    );
  }
}
