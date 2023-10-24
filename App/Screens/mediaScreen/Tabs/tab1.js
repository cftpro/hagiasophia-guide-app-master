import React, { PureComponent } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Image,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { strings } from "i18/i18n.js";

import colors from "assets/colors/colors";
import images from "components/images/images";
import CustomAudioPlayer from "components/modal/CustomAudioPlayer/CustomAudioPlayer";
import ArrowSVG from "components/images/ArrowSVG";

const { height, width } = Dimensions.get("window");

let index = 0;
let data = null;
function createData(number, title, text, images, id) {
  const i = index;
  index = index + 1;
  console.log(data);

  if (
    data !== null &&
    data.find(item => {
      return item.documentId == id;
    })
  ) {
    console.log(data[i].text);
    item = data.find(item => {
      return item.documentId == id;
    });
    return {
      index: index,
      floor: strings("mediaScreen.Garden"),
      number: number,
      title: item.title,
      audio: item.audio,
      audioPath: item.audioPath ? item.audioPath : null,
      text: item.text,
      images: images
    };
  }
  return {
    index: index,
    floor: strings("mediaScreen.Garden"),
    number: number,
    title: title,
    text: text,
    images: images
  };
}

export default class tab2 extends PureComponent {
  constructor(props) {
    super(props);
    console.log(props);
    index = 0;
    if (this.props.navigation.state.params)
      data = this.props.navigation.state.params.data;
    const items = [
      createData(
        1,
        "1.Kat Bölüm İsmi 1",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGarden1,
        "1.00"
      ),
      createData(
        2,
        "1.Kat Bölüm ismi 2 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGarden2,
        "1.01"
      ),
      createData(
        3,
        "1.Kat Bölüm ismi 3 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGarden3,
        "1.03"
      ),
      createData(
        19,
        "1.Kat Bölüm ismi 4 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGarden19,
        "2.19"
      ),
      createData(
        20,
        "1.Kat Bölüm ismi 5 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGarden20,
        "2.20"
      )
    ];
    this.state = {
      countryFlag: null,
      countryCode: null,
      showCountryPicker: false,
      items: items,
      selectedItem: null,
      selectedText: null
    };
  }

  render() {
    const { items } = this.state;
    return (
      <ScrollView
        style={{
          width: "100%",
          height: height,
          backgroundColor: colors.backgroudColor,
          paddingTop: 0
        }}
        contentContainerStyle={{ marginTop: height * -0.09 }}
      >
        <View style={styles.container}>
          <ImageBackground
            style={styles.imageView}
            source={images.garden}
            resizeMode="contain"
          >
            <View style={styles.imageView}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  position: "absolute",
                  top: "85%",
                  left: "-30.8%",
                  width: 35,
                  height: 35,
                  backgroundColor: "#e62739",
                  borderRadius: 35 / 2
                }}
                onPress={() => {
                  this.props.navigation.navigate("mediaModal", {
                    ...items[0]
                  });
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    textAlignVertical: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    padding: 0,
                    color: "white",
                    fontFamily: "Roboto",
                    fontSize: moderateScale(18),
                    lineHeight: moderateScale(35),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff"
                  }}
                >
                  1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  position: "absolute",
                  top: "65%",
                  left: "-30.8%",
                  width: 35,
                  height: 35,
                  backgroundColor: "#e62739",
                  borderRadius: 35 / 2
                }}
                onPress={() => {
                  this.props.navigation.navigate("mediaModal", {
                    ...items[1]
                  });
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    height: "100%",

                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    padding: 0,
                    color: "white",
                    fontFamily: "Roboto",

                    fontSize: moderateScale(18),
                    lineHeight: moderateScale(34),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff",
                    textAlign: "center",
                    textAlignVertical: "center"
                  }}
                >
                  2
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#e62739",
                  borderWidth: 0,
                  borderRadius: 40,
                  position: "absolute",
                  top: "29%",
                  left: "-9%",
                  width: 35,
                  height: 35
                }}
                onPress={() => {
                  this.props.navigation.navigate("mediaModal", {
                    ...items[2]
                  });
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    textAlignVertical: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    padding: 0,
                    color: "white",
                    fontFamily: "Roboto",

                    fontSize: moderateScale(18),
                    lineHeight: moderateScale(34),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff"
                  }}
                >
                  3
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#e62739",
                  borderWidth: 0,
                  borderRadius: 40,
                  position: "absolute",
                  top: "77%",
                  left: "4%",
                  width: 35,
                  height: 35
                }}
                onPress={() => {
                  this.props.navigation.navigate("mediaModal", {
                    ...items[3]
                  });
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    textAlignVertical: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    padding: 0,
                    color: "white",
                    fontFamily: "Roboto",

                    fontSize: moderateScale(18),
                    lineHeight: moderateScale(34),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff"
                  }}
                >
                  19
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#e62739",
                  borderWidth: 0,
                  borderRadius: 40,
                  position: "absolute",
                  top: "64%",
                  left: "6.5%",
                  width: 35,
                  height: 35
                }}
                onPress={() => {
                  this.props.navigation.navigate("mediaModal", {
                    ...items[4]
                  });
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    textAlignVertical: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    padding: 0,
                    color: "white",
                    fontFamily: "Roboto",

                    fontSize: moderateScale(18),
                    lineHeight: moderateScale(34),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff"
                  }}
                >
                  20
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        {items.map(item => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              key={item.index}
              onPress={() => {
                this.props.navigation.navigate("mediaModal", {
                  ...item
                });
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: verticalScale(100),
                  borderRadius: 5,
                  borderStyle: "solid",
                  borderWidth: 2,
                  borderColor: "#e1e8f0",
                  backgroundColor: "#f4f7f6",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: scale(8),
                  marginBottom: verticalScale(1),
                  marginTop: verticalScale(1)
                }}
              >
                <View
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 40,
                    backgroundColor: "#e1e8f0",
                    justifyContent: "center",
                    borderWidth: 0,
                    paddingHorizontal: 5,
                    marginRight: 10,
                    backgroundColor: "#e62739"
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Roboto-Bold",
                      fontSize: moderateScale(16),
                      fontWeight: "bold",
                      fontStyle: "normal",
                      textAlignVertical: "center",
                      letterSpacing: 0,
                      textAlign: "center",
                      color: "#ffffff"
                    }}
                  >
                    {item.number}
                  </Text>
                </View>
                <Image
                  source={item.images[0]}
                  resizeMode="contain"
                  style={{ height: "100%", width: 100 }}
                />
                <View style={{ flex: 15, marginHorizontal: scale(16) }}>
                  <Text
                    style={{
                      fontFamily: "Roboto-Light",
                      fontSize: moderateScale(15),
                      fontWeight: "300",
                      fontStyle: "normal",
                      lineHeight: 18,
                      letterSpacing: 0,
                      textAlign: "left",
                      color: "#505050"
                      //   color: "#707070"
                    }}
                  >
                    {item.title}
                  </Text>
                </View>

                {/* <Image source={images.imageGrounds1} style={{height:"100%"}} resizeMode="contain"/> */}
                <ArrowSVG />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroudColor,
    width: "100%",
    height: height * 0.7,
    marginTop: 40,
    // marginBottom: verticalScale(5),
    borderBottomWidth: 0,
    borderBottomColor: "gray"
  },
  imageView: {
    position: "relative",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    padding: 16,
    flex: 1
  }
});
