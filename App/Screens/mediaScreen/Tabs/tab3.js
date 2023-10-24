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
      floor: strings("mediaScreen.SecondFloor"),
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
    floor: strings("mediaScreen.SecondFloor"),
    number: number,
    title: title,
    text: text,
    images: images
  };
}

export default class tab3 extends PureComponent {
  constructor(props) {
    super(props);
    index = 0;
    if (this.props.navigation.state.params)
      data = this.props.navigation.state.params.data;
    const items = [
      createData(
        11,
        "2.Kat Bölüm İsmi 1",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGrounds11,
        "2.11"
      ),
      createData(
        12,
        "2.Kat Bölüm ismi 2 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGrounds12,
        "2.12"
      ),
      createData(
        13,
        "2.Kat Bölüm ismi 3 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGrounds13,
        "2.13"
      ),
      createData(
        14,
        "2.Kat Bölüm ismi 4 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGrounds14,
        "2.14"
      ),
      createData(
        15,
        "2.Kat Bölüm ismi 5 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGrounds15,
        "2.15"
      ),
      createData(
        16,
        "2.Kat Bölüm ismi 6 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGrounds16,
        "2.16"
      ),
      createData(
        17,
        "2.Kat Bölüm ismi 7 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGrounds17,
        "2.17"
      ),
      createData(
        18,
        "2.Kat Bölüm ismi 8 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGrounds18,
        "2.18"
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

  handleChangeAudio = item => {
    //alert(item.title);
    this.setState({ selectedItem: item, selectedText: item.text });
  };

  render() {
    const { items, selectedItem } = this.state;

    console.log(items);
    return (
      <ScrollView
        style={{
          width: "100%",
          height: height,
          backgroundColor: colors.backgroudColor,
          paddingTop: 0
        }}
        contentContainerStyle={{ marginTop: height * -0.05 }}
      >
        <StatusBar
          backgroundColor="#f4f7f6"
          barStyle="dark-content"
          translucent
        />
        <View style={styles.container}>
          <ImageBackground
            style={styles.imageView}
            source={images.secondFloor}
            resizeMode="contain"
            fadeDuration={0}
          >
            <View style={styles.imageView}>
              <TouchableHighlight
                style={{
                  position: "absolute",
                  top: "72%",
                  left: "-1%",
                  width: 35,
                  height: 35,
                  backgroundColor: "#e62739",
                  borderRadius: 40
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
                    lineHeight: 36,
                    fontSize: moderateScale(18),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff"
                  }}
                >
                  11
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#e62739",
                  borderWidth: 0,
                  borderRadius: 40,
                  position: "absolute",
                  top: "60%",
                  left: "48%",
                  width: 35,
                  height: 35
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
                    textAlign: "center",
                    textAlignVertical: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    padding: 0,
                    color: "white",
                    fontFamily: "Roboto",
                    lineHeight: 36,

                    fontSize: moderateScale(20),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff"
                  }}
                >
                  12
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#e62739",
                  borderWidth: 0,
                  borderRadius: 40,
                  position: "absolute",
                  top: "49%",
                  left: "53%",
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

                    lineHeight: 36,
                    fontSize: moderateScale(18),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff"
                  }}
                >
                  13
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#e62739",
                  borderWidth: 0,
                  borderRadius: 40,
                  position: "absolute",
                  top: "47%",
                  left: "35%",
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
                    lineHeight: 36,

                    fontSize: moderateScale(18),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff"
                  }}
                >
                  14
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#e62739",
                  borderWidth: 0,
                  borderRadius: 40,
                  position: "absolute",
                  top: "35%",
                  left: "52%",
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
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    padding: 0,
                    color: "white",
                    fontFamily: "Roboto",
                    textAlignVertical: "center",
                    lineHeight: 35,
                    fontSize: moderateScale(18),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff"
                  }}
                >
                  15
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#e62739",
                  borderWidth: 0,
                  borderRadius: 40,
                  position: "absolute",
                  top: "13%",
                  left: "18%",
                  width: 35,
                  height: 35
                }}
                onPress={() => {
                  this.props.navigation.navigate("mediaModal", {
                    ...items[5]
                  });
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    padding: 0,
                    color: "white",
                    fontFamily: "Roboto",
                    textAlignVertical: "center",
                    lineHeight: 35,
                    fontSize: moderateScale(18),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff"
                  }}
                >
                  16
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#e62739",
                  borderWidth: 0,
                  borderRadius: 40,
                  position: "absolute",
                  top: "15%",
                  left: "42%",
                  width: 35,
                  height: 35
                }}
                onPress={() => {
                  this.props.navigation.navigate("mediaModal", {
                    ...items[6]
                  });
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    padding: 0,
                    color: "white",
                    fontFamily: "Roboto",
                    textAlignVertical: "center",
                    lineHeight: 35,
                    fontSize: moderateScale(18),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff"
                  }}
                >
                  17
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#e62739",
                  borderWidth: 0,
                  borderRadius: 40,
                  position: "absolute",
                  top: "34%",
                  left: "-39%",
                  width: 35,
                  height: 35
                }}
                onPress={() => {
                  this.props.navigation.navigate("mediaModal", {
                    ...items[7]
                  });
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    padding: 0,
                    color: "white",
                    fontFamily: "Roboto",
                    textAlignVertical: "center",
                    lineHeight: 35,
                    fontSize: moderateScale(18),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff"
                  }}
                >
                  18
                </Text>
              </TouchableHighlight>
            </View>
          </ImageBackground>

          {/* {selectedItem && (
          <View
            style={{
              alignItems: "center",
              width: "100%",
              height: height * 0.283,
              paddinTop: verticalScale(10),
              backgroundColor: "transparent",
              alignSelf: "center",
              marginHorizontal: -16,

              flex: 0.3
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={true}
              style={{ width: "100%" }}
              contentContainerStyle={{ alignItems: "center" }}
            >
              <Text
                style={{
                  width: scale(300),
                  fontFamily: "Roboto",
                  fontSize: 25,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  letterSpacing: 0,
                  textAlign: "center",
                  color: "#000000"
                }}
              >
                {selectedItem.title}
              </Text>

              <Text
                style={{
                  width: scale(300),
                  fontFamily: "Roboto Regular",
                  fontSize: moderateScale(18),
                  fontWeight: "normal",
                  fontStyle: "normal",
                  letterSpacing: 0,
                  textAlign: "center",
                  color: "#000000"
                }}
              >
                {selectedItem.text}
              </Text>
            </ScrollView>

            <Image
              style={{
                width: "100%",
                height: 50,
                position: "absolute",
                bottom: 0,
                left: 0
              }}
              source={images.shadow}
            />
          </View>
        )} */}
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
                  backgroundColor:
                    selectedItem === item ? "#dddddd" : "#f4f7f6",
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
    height: height * 0.78,
    marginTop: 0,
    marginBottom: verticalScale(5),
    borderBottomWidth: 0,
    borderBottomColor: "gray",
    marginBottom: -15
  },
  imageView: {
    position: "relative",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    marginTop: 16,
    padding: 16,
    flex: 1
  },
  HagiaTab1: {
    //height: "100%"
    // width: "100%"
  }
});
