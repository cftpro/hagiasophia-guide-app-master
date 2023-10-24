//import liraries
import React, { PureComponent } from "react";
import {
  View,
  Alert,
  StatusBar,
  Text,
  Dimensions,
  StyleSheet,
  Image
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
// import RNFetchBlob from "rn-fetch-blob";
import RNFS from "react-native-fs";

import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import axios from "axios";
import apiUrl from "../../apiUrl.js";
import { strings, getLocale } from "i18/i18n.js";

const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
// let dirs = RNFetchBlob.fs.dirs;

serializeKey = data => {
  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return formBody;
};

// create a component
class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loadingPercentage: 0,
      loaded: 0,
      image: ""
    };
  }

  async componentDidMount() {
    const lang = getLocale().substring(0, 2);
    const isLoaded = await AsyncStorage.getItem("textInstalled");
    const isData = await AsyncStorage.getItem("textData" + lang).then(item =>
      JSON.parse(item)
    );
    const redeemCode = this.props.navigation.state.params.redeemCode;
    console.log("Redeem Code : ");
    console.log(redeemCode);
    console.log(isLoaded);
    console.log(isData);
    if (isLoaded !== null && isData !== null && isLoaded == lang) {
      this.props.navigation.replace("mediaScreen", { data: isData });

      return;
    }
    console.log(
      JSON.stringify({
        language: lang,
        redeemCode: redeemCode
      })
    );
    await fetch("http://63.33.235.174:8080/api/0.0/contents/initialize", {
      method: "POST",
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded"
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language: lang,
        redeemCode: redeemCode,
        isFree: false,
        appType: "hg"
      })
    })
      .then(res => res.json())
      .then(async res => {
        console.log(res.success);
        if (res.success == false) {
          alert("Wrong Redeem Code !");
          this.props.navigation.goBack();
          return;
        }
        console.log(res);
        console.log(res.success.data.documents);
        await AsyncStorage.setItem(
          "textData" + lang,
          JSON.stringify(res.success.data.documents)
        );
        console.log("Texts are installed");

        const data = await AsyncStorage.getItem("textData" + lang)
          .then(item => JSON.parse(item))
          .catch(error => {
            alert("Wrong Redeem Code");
          });

        console.log(data);
        console.log(RNFS.ExternalDirectoryPath);
        console.log(RNFS.DocumentDirectoryPath);
        const fileUri = RNFS.DocumentDirectoryPath + "/audios/" + lang;
        await RNFS.mkdir(fileUri);
        console.log(RNFS.readDir(fileUri + "/"));
        if (RNFS.readDir(fileUri) !== null) console.log("adana");
        const download = data.map(async item => {
          if (item.audio === null) {
            return;
          }
          const filePath =
            fileUri +
            "/" +
            item.audio.substring(item.audio.lastIndexOf("/") + 1);
          console.log(filePath);
          const DownloadFileOptions = {
            fromUrl: item.audio,
            toFile: filePath,
            progress: progress => {
              console.log(progress);
            }
          };
          await RNFS.downloadFile(DownloadFileOptions).promise.then(() => {
            item.audioPath = filePath;
            this.setState({
              loaded: this.state.loaded + 100 / data.length
            });
          });
        });
        Promise.all(download)
          .then(() => {
            console.log("downloand finished");
            console.log(RNFS.readdir(fileUri + "/"));
            return AsyncStorage.setItem(
              "textData" + lang,
              JSON.stringify(data)
            );
          })
          .then(() => {
            AsyncStorage.setItem("textInstalled", lang);
          })
          .then(() =>
            this.props.navigation.replace("mediaScreen", { data: data })
          );
      })
      .catch(err => {
        Alert.alert("Error!", "Wrong Redeem Code!");
        console.log("Bir Sorun Oluştu " + err);
      });
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const {
      countryFlag,
      showCountryPicker,
      countryCode,
      loaded,
      image
    } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />
        <View style={styles.logoContainer}>
          <Text style={styles.hagiaSophia}>
            {strings("homePage.hagiaSophia")}
          </Text>
          <View
            style={{
              alignSelf: "center",
              borderWidth: 0.5,
              height: 1,
              marginTop: 5,
              width: scale(250),
              borderColor: "#fff"
            }}
          />
          <Text style={styles.logoSubTitle}>
            {strings("loadingPage.Subtitle")}
          </Text>
        </View>

        <View style={styles.loading}>
          <Text style={styles.percentage}>{Math.floor(loaded)}%</Text>
          <Text style={styles.downloadContent}>
            {strings("loadingPage.MainTitle")}
          </Text>
          <Text style={styles.downloadLanguage}>
            {strings("loadingPage.MainTitle2")}
          </Text>
        </View>
        <View style={{ flex: 2.5 }} />
        {/* <ImageBackground
          source={images.background}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.backBtnStyle}>
            <TouchableOpacity
              onPress={() => goBack()}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,

    padding: moderateScale(16),
    paddingHorizontal: scale(16),
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "transparent",
    paddingTop: verticalScale(16),
    paddingHorizontal: scale(16)
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
    textAlign: "center",
    color: "#fff"
  },
  loading: {
    flex: 1.5,
    width: (width * 3) / 4,
    flexDirection: "column",
    justifyContent: "space-evenly",
    textAlign: "left",
    padding: 10,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  percentage: {
    fontFamily: "Poppins",
    fontSize: moderateScale(28),
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 50,
    letterSpacing: 0,
    textAlign: "left",
    color: "#fff"
  },
  downloadContent: {
    fontFamily: "Poppins",
    fontSize: moderateScale(28),
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 30,
    letterSpacing: 0,
    textAlign: "left",
    color: "#fff"
  },
  downloadLanguage: {
    opacity: 1,
    fontFamily: "Poppins",
    fontSize: moderateScale(16),
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "left",
    color: "#fff"
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
