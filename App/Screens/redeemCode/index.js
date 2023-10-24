//import liraries
import React, { PureComponent } from "react";
import {
  Image,
  Share,
  View,
  Keyboard,
  Alert,
  StatusBar,
  YellowBox,
  Text,
  TouchableOpacity,
  Touchable,
  FlatList,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TextInput,
  Platform
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import images from "components/images/images";
import { strings, getLocale } from "i18/i18n.js";

const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;

// create a component
class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      redeemCode: null
    };
  }

  async componentDidMount() {
    const lang = getLocale().substring(0, 2);
    const isLoaded = await AsyncStorage.getItem("textInstalled");
    const isData = await AsyncStorage.getItem("textData" + lang).then(item =>
      JSON.parse(item)
    );
    console.log(isLoaded);
    console.log(isData);
    if (isLoaded !== null && isData !== null && isLoaded == lang) {
      this.props.navigation.replace("mediaScreen", { data: isData });

      return;
    }
  }

  saveCountryCode = async index => {
    try {
      await AsyncStorage.setItem("countryCode", JSON.stringify(index));
    } catch (e) {
      alert(e);
    }
    this.setCountryCode(index);
  };
  submit = () => {
    const redeemCode = this.state.redeemCode;
    if (redeemCode !== null) {
      this.props.navigation.navigate("loadingScreen", {
        redeemCode: redeemCode.toUpperCase().replace(".", "")
      });
    }
  };
  render() {
    const { navigate, goBack, state } = this.props.navigation;
    const { countryFlag, showCountryPicker, countryCode } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />
        {Platform.OS === "ios" && (
          <View
            style={{
              position: "absolute",
              top: 25,
              left: 0,
              paddingVertical: verticalScale(23),
              paddingHorizontal: verticalScale(23),
              alignContent: "space-between",
              justifyContent: "space-between",
              alignItems: "stretch",
              //   backgroundColor: "rgba(256,256,256,0.2)",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Image
                source={images.backIcon}
                resizeMode="contain"
                style={{ width: scale(28), height: verticalScale(28) }}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.logoContainer}>
          <Text style={styles.hagiaSophia}>
            {strings("homePage.hagiaSophia")}
          </Text>
          <View
            style={{
              alignSelf: "center",
              borderWidth: 0.5,
              height: 1,
              marginTop: 0,
              width: scale(225),
              borderColor: "#fff"
            }}
          />
          <Text style={styles.logoSubTitle}>
            {strings("redeemPage.Subtitle")}
          </Text>
        </View>
        <View style={styles.form}>
          <TextInput
            placeholder={strings("redeemPage.EnterCode")}
            multiline={false}
            autoCapitalize="characters"
            style={{
              color: "#000",
              paddingHorizontal: moderateScale(17),
              paddingTop: moderateScale(7),
              paddingBottom: moderateScale(10),
              textAlignVertical: "center",
              fontFamily: "Roboto",
              backgroundColor: "#fff",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#fff",
              fontSize: 24,
              textAlign: "center"
            }}
            onChangeText={text => {
              this.setState({ redeemCode: text });
            }}
            index
            maxLength={8}
          />

          {/* <TextInput
            mode="outlined"
            label={strings("redeemPage.RedeemCode")}
            placeholder={strings("redeemPage.EnterCode")}
            underlineColor="#c0c2c1"
            multiline
            underlineColorAndroid="#000000"
            selectionColor="#c0c2c1"
            value={this.state.text}
            ref="codeInput"
            onChangeText={text => this.setState({ text })}
            style={{
              color: "#c0c2c1",
              paddingLeft: moderateScale(17),
              paddingTop: moderateScale(7),
              fontFamily: "Roboto",
              backgroundColor: "#fff",
              borderRadius: 10,
              borderWidth: 10,
              borderTopWidth: 5,
              borderColor: "#fff"
            }}
            blurOnSubmit={false}
            autoFocus={true}
            theme={{
              ...DefaultTheme,
              roundness: 5,
              colors: {
                ...DefaultTheme.colors,
                primary: "#989898",
                accent: "#fff",
                text: "#000",
                placeholder: "#000",
                backdrop: "#000"
              },
              fonts: {
                medium: "Roboto",
                light: "Roboto",
                regular: "Roboto",
                thin: "Roboto"
              }
            }}
          /> */}
          <TouchableOpacity style={styles.button} onPress={this.submit}>
            <Text style={styles.buttonText}>
              {strings("redeemPage.SubmitCode")}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <ImageBackground
          source={images.background}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.backBtnStyle}>
            <TouchableOpacity
              onPress={() => {
                state.params.onComeBack();
                goBack();
              }}
              style={styles.backButton}
            >
              <Image source={images.backIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.countryStyle}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ showCountryPicker: true });
              }}
            >
              <Text style={styles.countryCodeText}>{countryFlag}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.logoContainer}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 35,
                fontWeight: "bold",
                color: "white"
              }}
            >
              Hagia Sophia
            </Text>
          </View>
          <View style={styles.ButtonContainer}>
            <FormInput
              placeholdertext="Code"
              value={this.state.code}
              onChange={evt => this.handleChange(evt, "code", "codeErr")}
              placeholderTextColor={colors.placeholderTextColor}
              style={[
                styles.input,
                styles.romanFont,
                { color: "white", alignSelf: "center" }
              ]}
            />
            <TouchableOpacity
              style={styles.Button}
              onPress={() => this.props.navigation.navigate("redeemCode")}
            >
              <Text color="#000" style={{ fontSize: 20, color: "#000" }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>

		</ImageBackground> */}
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            position: "absolute",
            bottom: 0,
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    flex: 1,
    backgroundColor: "transparent",
    padding: moderateScale(16),
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "center"
  },
  logoContainer: {
    flex: 2
  },
  hagiaSophia: {
    width: (width * 3) / 4,
    fontFamily: "Poppins SemiBold",
    fontSize: scale(32),
    fontStyle: "normal",
    textAlignVertical: "center",
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff",
    marginTop: moderateScale(31),
    textTransform: "uppercase"
  },

  logoSubTitle: {
    width: (width * 3) / 4,
    fontFamily: "Poppins Light",
    fontSize: scale(36),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff"
  },
  form: {
    width: (width * 3) / 4,
    flex: 3
  },
  button: {
    width: (width * 3) / 4,
    borderRadius: 5,
    padding: moderateScale(15),
    marginTop: verticalScale(18),
    fontSize: moderateScale(32),
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    backgroundColor: "#3abf15"
  },
  buttonText: {
    fontFamily: "Roboto",
    fontSize: scale(18),
    fontWeight: "300",
    fontStyle: "normal",
    lineHeight: scale(20),
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff",
    flexDirection: "row",
    flexWrap: "nowrap"
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
});

export default Home;
