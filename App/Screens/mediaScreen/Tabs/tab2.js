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
      floor: strings("mediaScreen.FirstFloor"),
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
    floor: strings("mediaScreen.FirstFloor"),
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
        images.imageGrounds1,
        "2.01"
      ),
      createData(
        2,
        "1.Kat Bölüm ismi 2 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",

        images.imageGrounds2,
        "2.02"
      ),
      createData(
        3,
        "1.Kat Bölüm ismi 3 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGrounds3,
        "2.03"
      ),
      createData(
        4,
        "1.Kat Bölüm ismi 4 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGrounds4,
        "2.04"
      ),
      createData(
        5,
        "1.Kat Bölüm ismi 5 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGrounds5,
        "2.05"
      ),
      createData(
        6,
        "1.Kat Bölüm ismi 6 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGrounds6,
        "2.06"
      ),
      createData(
        7,
        "1.Kat Bölüm ismi 7 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGrounds7,
        "2.07"
      ),
      createData(
        8,
        "1.Kat Bölüm ismi 8 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGrounds8,
        "2.08"
      ),
      createData(
        9,
        "1.Kat Bölüm ismi 9 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGrounds9,
        "2.09"
      ),
      createData(
        10,
        "1.Kat Bölüm ismi 10 ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
        images.imageGrounds10,
        "2.10"
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
    console.log(items[0].images);
    console.log(items);
    return (
      <ScrollView
        style={{
          width: "100%",
          height: height,
          backgroundColor: colors.backgroudColor,
          paddingTop: 0
        }}
        // contentContainerStyle={{ marginTop: height * -0.02 }}
      >
        <StatusBar
          backgroundColor="#f4f7f6"
          barStyle="dark-content"
          translucent
        />
        <View style={styles.container}>
          <ImageBackground
            style={styles.imageView}
            source={images.groundMap}
            resizeMode="contain"
          >
            <View style={styles.imageView}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  position: "absolute",
                  top: "84%",
                  left: "5%",
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
                    lineHeight: 35,
                    fontSize: moderateScale(18),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff"
                  }}
                >
                  {items[0].number}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  position: "absolute",
                  top: "83%",
                  left: "27.5%",
                  width: 35,
                  height: 35,
                  borderRadius: 35 / 2,
                  backgroundColor: "#e62739"
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
                    lineHeight: 35,
                    fontSize: moderateScale(18),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff"
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
                  top: "74%",
                  left: "45%",
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
                    lineHeight: 35,
                    fontSize: moderateScale(18),
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
                  top: "74%",
                  left: "-2%",
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
                    lineHeight: 35,
                    fontSize: moderateScale(18),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff"
                  }}
                >
                  4
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
                  top: "53%",
                  left: "-2%",
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
                    lineHeight: 35,
                    fontSize: moderateScale(18),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff"
                  }}
                >
                  5
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
                  top: "38%",
                  left: "43%",
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
                    textAlignVertical: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    padding: 0,
                    color: "white",
                    fontFamily: "Roboto",
                    lineHeight: 35,
                    fontSize: moderateScale(18),
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: "#ffffff"
                  }}
                >
                  6
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
                  top: "13%",
                  left: "28%",
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
                  7
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
                  top: "1%",
                  left: "0%",
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
                  8
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
                  top: "60%",
                  left: "-44%",
                  width: 35,
                  height: 35
                }}
                onPress={() => {
                  this.props.navigation.navigate("mediaModal", {
                    ...items[8]
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
                  9
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
                  top: "75%",
                  left: "-50%",
                  width: 35,
                  height: 35
                }}
                onPress={() => {
                  this.props.navigation.navigate("mediaModal", {
                    ...items[9]
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
                  10
                </Text>
              </TouchableOpacity>
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
          </S>
        )} */}

          {/* <View
          style={{
            marginHorizontal: verticalScale(0),
            flex: 0.106
          }}
          title="deneme"
        > */}
          {/* <CustomAudioPlayer
            audioUrl={selectedItem !== null ? selectedItem.url : ""}
          /> */}
          {/* </View> */}
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
    marginTop: 16,
    padding: 16,
    flex: 1
  }
});
