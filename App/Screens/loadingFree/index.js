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
class LoadingFree extends PureComponent {
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
    const isLoaded = await AsyncStorage.getItem("textInstalledFree");
    const isData = await AsyncStorage.getItem("textDataFree" + lang).then(
      item => JSON.parse(item)
    );
    if (isLoaded !== null && isData !== null && isLoaded == lang) {
      this.props.navigation.replace("freeVersion", { data: isData });
      return;
    }
    await fetch("http://63.33.235.174:8080/api/0.0/contents/free", {
      method: "POST",
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded"
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language: lang
      })
    })
      .then(res => res.json())
      .then(async res => {
        if (res.success == false) {
          alert("There is something wrong!");
          this.props.navigation.goBack();
        }
        console.log(res);
        console.log(res.success.data.doc);
        await AsyncStorage.setItem(
          "textDataFree" + lang,
          JSON.stringify(res.success.data.doc)
        );
        console.log("Free Texts are installed");

        const data = await AsyncStorage.getItem("textDataFree" + lang)
          .then(item => JSON.parse(item))
          .catch(error => {
            alert("Some Thing is Wrong");
          });

        console.log(data);
        console.log(RNFS.ExternalDirectoryPath);
        console.log(RNFS.DocumentDirectoryPath);
        const fileUri = RNFS.DocumentDirectoryPath + "/free/" + lang;
        await RNFS.mkdir(fileUri);
        console.log(RNFS.DocumentDirectoryPath);
        console.log(RNFS.readDir(fileUri + "/"));
        if (RNFS.readDir(fileUri) !== null) console.log("adana");
        const download = async () => {
          console.log(data);
          item = data;
          if (item.audio === null) {
            return;
          }
          const filePath =
            fileUri +
            "/" +
            item.audio.substring(item.audio.lastIndexOf("/") + 1);
          console.log(item.audio.lastIndexOf("/") + 1);

          const DownloadFileOptions = {
            fromUrl: item.audio,
            toFile: filePath,
            progress: progress => {
              this.setState({
                loaded: (progress.bytesWritten / progress.contentLength) * 100
              });
            },
            begin: begin => {
              console.log("beginned");
            }
          };

          await RNFS.downloadFile(DownloadFileOptions).promise.then(() => {
            item.audioPath = filePath;
            console.log("das");
          });
        };

        Promise.all([download()])
          .then(() => {
            console.log("downloand finished");
            console.log(RNFS.readdir(fileUri + "/"));
            return AsyncStorage.setItem(
              "textDataFree" + lang,
              JSON.stringify(item)
            );
          })
          .then(() => {
            AsyncStorage.setItem("textInstalledFree", lang);
            console.log(item);
          })
          .then(() =>
            this.props.navigation.replace("freeVersion", { data: item })
          );
      })
      .catch(err => {
        Alert.alert("Bir Sorun Oluştu " + err);
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
              width: scale(245),
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
    marginTop: moderateScale(30)
  },

  logoSubTitle: {
    width: (width * 3) / 4,
    fontFamily: "Poppins Light",
    fontSize: scale(36),
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

// // define your styles
// const styles = StyleSheet.create({
//   findDriverContainer: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.8)",
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   tabText: {
//     fontSize: 12
//   },
//   subTabText: {
//     fontSize: 8
//   },
//   btn: {
//     marginTop: 20
//   },
//   text: {
//     color: "white",
//     fontSize: 16,
//     marginBottom: 15,
//     marginTop: 15
//   },
//   locationIcon: {
//     color: "#fff",
//     fontSize: 40,
//     marginTop: 15,
//     alignSelf: "center"
//   },
//   inputLogin: {
//     flexDirection: "row",
//     width: width * 0.8,
//     height: height * 0.07,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: "black",
//     borderBottomWidth: 1,
//     marginLeft: 20,
//     marginRight: 20
//   },
//   inputStyle: {
//     flex: 1,
//     paddingHorizontal: 8,
//     color: "black"
//   },
//   content: {
//     flex: 1,
//     paddingTop: 40,
//     alignItems: "center"
//   },
//   pickup: {
//     width: width * 0.9,
//     borderRadius: 7,
//     height: 40,
//     backgroundColor: "#fff",
//     marginTop: 20,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   toArrow: {
//     color: "#fff",
//     fontSize: 16,
//     marginTop: 10
//   },
//   dropoff: {
//     width: width * 0.9,
//     borderRadius: 7,
//     height: 40,
//     backgroundColor: "#fff",
//     marginTop: 10,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   cancelBtnWrapper: {
//     marginTop: 15,
//     width: width * 0.9,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   cancelBtn: {
//     width: width * 0.9,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 7,
//     borderWidth: 1,
//     borderColor: "#fff",
//     backgroundColor: "transparent"
//   },
//   cancelBtnText: {
//     color: "#fff"
//   },
//   termsText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: 14,
//     marginTop: 10,
//     marginBottom: 10
//   },
//   container: {
//     height: height,
//     width: width
//   },
//   bottomContainer: {
//     flex: 1,
//     zIndex: 2,
//     position: "absolute",
//     ...Platform.select({
//       ios: {
//         bottom: 0
//       },
//       android: {
//         bottom: 0,
//         right: 0
//       }
//     })
//   },
//   dropOffButton: {
//     borderRadius: 1,
//     backgroundColor: "#5e2fc4",
//     height: 40,
//     width: width,
//     zIndex: 2
//   },
//   iosOnlyTopBar: {
//     backgroundColor: "transparent",
//     zIndex: 2,
//     ...Platform.select({
//       ios: {
//         height: 20,
//         marginTop: 10
//       },
//       android: {
//         height: 0,
//         marginTop: 10
//       }
//     })
//   },
//   topBarContainer: {
//     backgroundColor: "transparent",
//     zIndex: 2,
//     height: 59,
//     flexDirection: "row",
//     alignItems: "center"
//   },
//   homePickerContainer: {
//     zIndex: 2,
//     marginTop: 25,
//     marginLeft: 25,
//     marginRight: 25,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     borderColor: "#000",
//     flexDirection: "row",
//     paddingTop: 5,
//     paddingBottom: 5
//   },
//   mobilPilihanContainer: {
//     marginLeft: 12,
//     marginRight: 12,
//     borderRadius: 4,
//     marginBottom: 5,
//     zIndex: 2,
//     flex: 1,
//     height: "100%",
//     justifyContent: "space-around"
//   },
//   mobilTop: {
//     borderRadius: 5,
//     backgroundColor: "#fff",
//     height: 150,
//     flexDirection: "column",
//     zIndex: 3
//   },
//   mobilEffect: {
//     height: 19,
//     marginLeft: 14,
//     marginRight: 14,
//     marginTop: -7,
//     borderRadius: 5,
//     backgroundColor: "#F4F6F8",
//     zIndex: 2
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//     zIndex: 1
//   },
//   buttonStyle: {
//     height: height * 0.07,
//     width: width * 0.45,
//     marginTop: 15,
//     marginLeft: (width - width * 0.5) / 2,
//     marginRight: 20,
//     borderRadius: 30,
//     borderWidth: 0.5,
//     borderColor: colors.appColor,
//     justifyContent: "center"
//   },
//   footerContainer: {
//     backgroundColor: "#fff"
//   },
//   type: {
//     fontSize: 12
//   },
//   title: {
//     fontSize: 6
//   }
// });

export default LoadingFree;
