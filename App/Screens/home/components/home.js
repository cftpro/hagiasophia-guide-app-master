//import liraries
import React, { PureComponent } from "react";
import {
  Image,
  Share,
  View,
  TextInput,
  Keyboard,
  Alert,
  StatusBar,
  YellowBox,
  Text,
  TouchableOpacity,
  Touchable,
  FlatList,
  Modal,
  Linking,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Platform,
  I18nManager
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import AsyncStorage from "@react-native-community/async-storage";
import { strings, getLocale, setLocale } from "../../../i18n/i18n";
import images from "components/images/images";
import CountriesList from "assets/utils/countries.json";
import CustomDropDown from "components/modal/CustomDropDown";

const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;

// create a component
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      countryFlag: null,
      countryCode: null,
      showCountryPicker: false,
      countryCca2: null
    };
  }

  componentDidMount() {
    //   this.setCountryCode(0); // 1 index of Turkey  in  CountriesList
    this.getLocaleLanguage();
  }

  onComeBack = async () => {
    let cCode;
    try {
      cCode = await AsyncStorage.getItem("countryCode");
      cCode = Number(cCode);
    } catch (e) {
      alert(e);
    }
    if (cCode) this.setCountryCode(cCode);
    else this.setCountryCode(0); // Defaults to GB
  };

  saveCountryCode = async index => {
    this.setCountryCode(index);
    try {
      await AsyncStorage.setItem("countryCode", JSON.stringify(index));
    } catch (e) {
      alert(e);
    }
  };

  setCountryCode = index => {
    const country = CountriesList[index]; //index of Country in  CountriesList
    this.setState({
      countryCode: country.callingCode,
      countryFlag: country.flag,
      countryName: country.name,
      countryCca2: country.cca2,
      countryColor: country.color
    });

    setLocale(country.locale);
  };
  getLocaleLanguage = () => {
    const locale = getLocale();
    let flag = false;
    CountriesList.map((item, index) => {
      if (
        locale.indexOf(item.locale) !== -1 ||
        item.locale.indexOf(locale) !== -1
      ) {
        this.setCountryCode(index);
        // setLocale(item.locale);
        flag = true;
      }
    });
    if (!flag) {
      this.setCountryCode(0);
    }
  };

  render() {
    const { navigate, goBack } = this.props.navigation;
    const {
      countryFlag,
      showCountryPicker,
      countryCca2,
      countryColor
    } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />

        <View style={styles.logoContainer}>
          <Text
            style={{
              ...styles.hagiaSophia,
              textAlign: "left"
            }}
          >
            {strings("homePage.hagiaSophia")}
          </Text>
          <View
            style={{
              alignSelf: "flex-start",
              borderWidth: 0.5,
              height: 1,
              marginBottom: 10,
              width: scale(225),
              borderColor: "#fff"
            }}
          />
          <Text
            style={{
              ...styles.logoSubTitle,
              textAlign:
                getLocale() === "ar" || getLocale() == "zh" ? "center" : "left"
            }}
          >
            {strings("homePage.Subtitle")}
          </Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("redeemCodeScreen");
            }}
          >
            <Text style={styles.buttonText}>
              {strings("homePage.RedeemCode")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("loadingFree");
            }}
          >
            <Text style={styles.buttonText}>
              {strings("homePage.FreeVersion")}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Linking.openURL(
                "https://istanbulwelcomecard.com/shop/hagia-sophia-tickets"
              );
            }}
          >
            <Text style={styles.buttonText}>
              {strings("homePage.BuyTickets")}
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("aboutThisApp");
            }}
          >
            <Text style={styles.buttonText}>
              {strings("homePage.AboutThisApp")}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("generalInfo");
            }}
          >
            <Text style={styles.buttonText}>
              {strings("homePage.Information")}
            </Text>
          </TouchableOpacity> */}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            position: "absolute",
            bottom: 40,
            justifyContent: "space-around",
            width: width,
            paddingHorizontal: 5,
            backgroundColor: "rgba(0,0,0,0.6)"
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
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://istanbulwelcomecard.com/shop/hagia-sophia-tickets"
              );
            }}
          >
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
          </TouchableOpacity>
        </View>
        <View style={styles.countryStyleView}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ showCountryPicker: true });
            }}
            style={{ ...styles.countryStyle, borderColor: countryColor }}
          >
            <Text style={styles.countryCodeText}>{countryFlag}</Text>

            <Text
              style={{
                fontSize: moderateScale(16),
                justifyContent: "center",
                flexDirection: "row",
                position: "relative",
                alignContent: "center",
                alignSelf: "center",
                textAlign: "center",
                alignItems: "center",
                paddingTop: moderateScale(-100),
                paddingBottom: 0,
                lineHeight: 30,
                color: "#000"
              }}
            >
              {countryCca2}
            </Text>
          </TouchableOpacity>
        </View>
        <CustomDropDown
          showModal={showCountryPicker}
          listData={CountriesList.map(
            country => `${country.flag} ${country.name} ${``}  `
          )}
          onSelectOption={(item, index) => {
            this.saveCountryCode(index);
          }}
          close={() => this.setState({ showCountryPicker: false })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
    paddingTop: verticalScale(16),
    paddingHorizontal: scale(16),
    flexDirection: "column"
  },
  hagiaSophia: {
    width: (width * 3) / 4,
    fontFamily: "Poppins SemiBold",
    fontSize: scale(32),
    fontStyle: "normal",
    lineHeight: scale(35),
    letterSpacing: 0,
    textAlign: getLocale() ? "center" : "left",
    color: "#ffffff",
    marginTop: moderateScale(30),
    textTransform: "uppercase"
  },
  logoSubTitle: {
    width: (width * 3) / 4,
    fontFamily: "Poppins Light",
    fontSize: scale(38),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
    elevation: 0,
    marginTop: -14
  },
  countryStyleView: {
    position: "absolute",
    top: height / 20,
    right: 0,
    marginTop: moderateScale(10)
  },
  countryStyle: {
    borderWidth: 2,
    flexDirection: "row",
    borderRadius: 7,
    borderColor: "red",
    backgroundColor: "#ffffff",
    width: scale(80),
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    textAlign: "center",
    justifyContent: "space-around",
    marginRight: moderateScale(10)
  },
  countryCodeText: {
    fontSize: moderateScale(24),
    color: "red",
    justifyContent: "center",
    flexDirection: "row",
    position: "relative",
    alignContent: "center",
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center"
  },
  buttons: {
    marginTop: moderateScale(52),
    flexDirection: "column",

    alignItems: "center",
    alignContent: "center",
    height: verticalScale(250)
  },
  button: {
    width: scale(156),
    height: verticalScale(45),
    borderRadius: 5,
    marginBottom: verticalScale(10),
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  buttonText: {
    fontFamily: "Poppins Medium",
    fontSize: scale(16),
    fontWeight: "300",
    fontStyle: "normal",
    lineHeight: scale(20),
    letterSpacing: 0,
    textAlign: "center",
    color: "#000000",
    flexDirection: "row",
    flexWrap: "nowrap",
    textTransform: "capitalize"
  },
  hagiaSophiaVector: {
    width: width,
    height: height,
    position: "absolute",
    bottom: 0,
    top: 0,
    padding: 0,
    justifyContent: "flex-end"
  }
  //   countryStyle: {
  //     justifyContent: "center",
  //     alignItems: "center",
  //     flexDirection: "row",
  //     position: "absolute",
  //     right: 0,
  //     width: width * 0.15,
  //     marginTop: Platform.OS == "ios" ? 20 : 10
  //   },

  //   logoContainer: {
  //     width: 230,
  //     height: 45,
  //     fontFamily: "Poppins Thin",
  //     fontSize: 32,
  //     fontWeight: "600",
  //     fontStyle: "normal",
  //     lineHeight: 35,
  //     letterSpacing: 0,
  //     textAlign: "left",
  //     color: "#000000"
  //   },
  //   hagiaSophia: {
  //     width: 230,
  //     height: 45,
  //     fontFamily: "Poppins",
  //     fontSize: 32,
  //     fontWeight: "600",
  //     fontStyle: "normal",
  //     lineHeight: 35,
  //     letterSpacing: 0,
  //     textAlign: "left",
  //     color: "#000000"
  //   },
  //   logoSubTitle: {
  //     width: 285,
  //     height: 48,
  //     fontFamily: "Poppins",
  //     fontSize: 16,
  //     fontWeight: "300",
  //     fontStyle: "normal",
  //     lineHeight: 25,
  //     letterSpacing: 0,
  //     textAlign: "left",
  //     color: "#000000"
  //   },
  //   hagiaSophiaVector: {
  //     // position: "absolute",
  //     // bottom: 30,
  //     // width,
  //     // height //scale, verticalScale, moderateScale
  //     position: "absolute",
  //     bottom: 10
  //   },
  //   countryCodeText: {
  //     color: "white",
  //     fontSize: 40
  //     //  marginTop: Platform.OS == "ios" ? 15 : 30
  //   }
});

export default Home;
