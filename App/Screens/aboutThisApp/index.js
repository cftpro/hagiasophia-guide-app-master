//import liraries
import React, { PureComponent } from "react";
import {
  View,
  Alert,
  StatusBar,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Linking,
  Platform,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import images from "components/images/images";
import { HeaderBackButton } from "react-navigation";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import { strings } from "i18/i18n.js";
//import console = require("console");

const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
// let dirs = RNFetchBlob.fs.dirs;

// create a component
class AboutThisApp extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }
  handlePress = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { navigate, goBack } = this.props.navigation;

    return (
      <SafeAreaView
        style={{
          paddingTop: verticalScale(28),
          backgroundColor: "rgba(0,0,0,0.7)"
        }}
      >
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />
        {/* {Platform.OS === "ios" && ( */}
        <View
          style={{
            width: width,
            paddingVertical: verticalScale(13),
            paddingHorizontal: verticalScale(23),
            backgroundColor: "rgba(256,256,256,0.2)",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity onPress={this.handlePress}>
            {
              <Image
                source={images.backIcon}
                resizeMode="contain"
                style={{ width: scale(28), height: verticalScale(28) }}
              />
            }
          </TouchableOpacity>
        </View>
        {/* )} */}
        <ScrollView
          contentContainerStyle={styles.container}
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <View style={styles.logoContainer}>
            <Text style={styles.hagiaSophia}>HAGIA SOPHIA</Text>

            <View
              style={{
                alignSelf: "center",
                borderWidth: 0.5,
                height: 1,
                marginTop: 5,
                width: scale(245),
                borderColor: "#fff"
              }}
            />
            <Text style={styles.logoSubTitle}>
              {strings("loadingPage.Subtitle")}
            </Text>
          </View>
          <View style={{ flex: 5 }}>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                marginHorizontal: scale(10)
              }}
            >
              <Image
                source={images.iconPhone}
                style={{ height: 30, width: 30, alignSelf: "center" }}
                resizeMode="contain"
              />
              <Text style={styles.header}>{strings("info.Content")}</Text>
            </View>
            <Text style={styles.text}>{strings("info.ContentText")}</Text>
          </View>

          <View style={{ flex: 5 }}>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                marginHorizontal: scale(10)
              }}
            >
              <Image
                source={images.iconMale}
                style={{
                  height: 27,
                  width: 27,
                  alignSelf: "center",
                  marginRight: 5
                }}
                resizeMode="contain"
              />
              <Text style={styles.header}>{strings("info.OurExpertise")}</Text>
            </View>
            <Text style={styles.text}>
              {strings("info.OurExpertiseText")}
              {/* The content of this app was created by local historians and
              official Hagia Sophia licensed guides. With this app you will turn
              your Hagia Sophia visit into a unique experience. */}
            </Text>
          </View>
          <View style={{ flex: 5 }}>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                marginHorizontal: scale(15)
              }}
            >
              <Image
                source={images.iconQuestion}
                style={{
                  height: 25,
                  width: 25,
                  alignSelf: "center",
                  marginRight: 10
                }}
                resizeMode="contain"
              />
              <Text style={styles.header}>{strings("info.Questions")}</Text>
            </View>
            <Text style={styles.text}>
              {strings("info.QuestionsText")}
              {/* This app was produced by an active guiding team at the Hagia
              Sophia. Our team of Istanbul Welcome Card guides are at the Hagia
              Sophia daily between 09:00 - 17:00.{"\n\n"}
              So, if you have any special interest about the architecture or
              questions about the Byzantine or Ottoman Empire please do not
              hesitate to ask our guides at the Hagia Sophia. */}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://istanbulwelcomecard.com/shop/hagia-sophia-tickets"
              );
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                justifyContent: "space-around",
                width: width,
                paddingHorizontal: 5,
                flexDirection: "row",
                width: width,
                backgroundColor: "rgba(0,0,0,0.6)",
                marginTop: 10
              }}
            >
              <View
                style={{
                  alignSelf: "center",
                  marginLeft: -5,

                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  paddingVertical: 5
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: scale(20),
                    fontStyle: "normal",
                    fontFamily: "Poppins Medium",
                    letterSpacing: 0,
                    textAlign: "left",
                    textAlignVertical: "bottom",
                    color: "#ffffff",
                    marginRight: 5
                  }}
                >
                  Made by Local Experts
                </Text>
              </View>

              <Image
                source={images.iwcWhite}
                style={{
                  top: 0,
                  width: 70,
                  height: 70,
                  marginRight: 10
                }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://istanbulwelcomecard.com/shop/hagia-sophia-tickets"
              );
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",

                marginTop: 10
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins SemiBold",
                  fontSize: scale(18),
                  fontStyle: "normal",
                  textAlignVertical: "center",
                  lineHeight: scale(40),
                  color: "#fff",

                  marginBottom: 20,
                  paddingRight: scale(10)
                }}
              >
                Powered by
              </Text>
              <Image
                source={images.kirmiziBalon}
                style={{ top: 0, width: 80, height: 80 }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    padding: moderateScale(16),
    paddingHorizontal: scale(16),
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    paddingTop: Platform.OS === "ios" ? verticalScale(16) : verticalScale(16),
    paddingHorizontal: scale(16),

    paddingBottom: verticalScale(40)
  },
  logoContainer: {
    flex: 2
  },
  hagiaSophia: {
    width: (width * 3) / 4,
    fontFamily: "Poppins SemiBold",
    fontSize: scale(36),
    fontStyle: "normal",
    lineHeight: scale(40),
    letterSpacing: 0,
    textAlign: "center",
    color: "#fff",
    marginTop: moderateScale(6)
  },

  logoSubTitle: {
    width: (width * 3) / 4,
    height: verticalScale(48),
    fontFamily: "Poppins Light",
    fontSize: scale(36),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff",
    elevation: 5
  },
  header: {
    fontFamily: "Poppins SemiBold",
    fontSize: scale(24),
    fontStyle: "normal",
    marginBottom: verticalScale(16),
    textAlignVertical: "center",
    marginTop: verticalScale(24),
    letterSpacing: 0,
    textAlign: "left",
    color: "#fff"
  },
  text: {
    width: width,
    fontFamily: "Poppins Light",
    fontSize: scale(14),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    paddingHorizontal: scale(16),
    textAlign: "left",
    color: "#ffffff",
    elevation: 5,
    marginTop: -14
  }
});

export default AboutThisApp;
