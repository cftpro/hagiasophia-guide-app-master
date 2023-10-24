import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from "react-native";

import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import CustomAudioPlayer from "components/modal/CustomAudioPlayer/CustomAudioPlayer";

import images from "components/images/images";
import Carousel, { Pagination } from "react-native-snap-carousel";

const { width, height } = Dimensions.get("window");
const SLIDER_1_FIRST_ITEM = 0;

export default class mediaModal extends Component {
  constructor(props) {
    super(props);
    const params = props.navigation.state.params;
    console.log(params);
    this.state = {
      floor: params.floor ? params.floor : "",
      number: params.number ? params.number : 1,
      title: params.title ? params.title : "title",
      entries: params.images,
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      audio: params.audioPath
        ? params.audioPath
        : params.audio
        ? params.audio
        : null,
      text: params.text
        ? params.text
        : "   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
      free: params.free
    };
  }
  _renderItem = ({ item, index }) => {
    const { floor, number, title, text } = this.state;
    return (
      <Image
        source={item}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    );
  };

  free = () => {
    console.log("free");
    setTimeout(() => {
      this.props.navigation.replace("redeemCodeScreen"), 6000;
    });
  };

  render() {
    const {
      floor,
      number,
      title,
      text,
      slider1ActiveSlide,
      audio
    } = this.state;
    console.log(this.state);
    return (
      <View style={styles.bgView}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.bgImage}>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.entries}
            renderItem={this._renderItem}
            sliderWidth={width}
            itemWidth={width}
            hasParallaxImages={true}
            firstItem={SLIDER_1_FIRST_ITEM}
            onSnapToItem={index => {
              console.log(index);
              this.setState({ slider1ActiveSlide: index });
            }}
            autoplay
            enableMomentum={false}
            lockScrollWhileSnapping={true}
            autoplayDelay={5000}
          />

          <View
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              paddingVertical: verticalScale(23),
              paddingHorizontal: verticalScale(23),
              paddingTop: verticalScale(45),
              alignContent: "space-between",
              justifyContent: "space-between",
              alignItems: "stretch",
              backgroundColor: "rgba(0,0,0,0.2)",
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
                style={{ width: scale(24), height: verticalScale(24) }}
              />
            </TouchableOpacity>
            <Text
              style={{
                alignSelf: "flex-end",
                fontFamily: "Poppins",
                fontSize: moderateScale(20),
                fontWeight: "600",
                fontStyle: "normal",
                lineHeight: 21,
                letterSpacing: 0,
                textAlign: "left",
                color: "#ffffff"
              }}
            >
              {floor}
            </Text>
          </View>
          <Pagination
            dotsLength={this.state.entries.length}
            activeDotIndex={slider1ActiveSlide}
            // dotColor={"gray"}
            // inactiveDotColor={"white"}
            dotStyle={{ backgroundColor: "rgba(255, 255, 255, 0.92)" }}
            inactiveDotStyle={{ backgroundColor: "white" }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={1}
            carouselRef={this._carousel}
            tappableDots={!!this._carousel}
            containerStyle={{
              position: "absolute",
              bottom: "5%",
              alignSelf: "center"
            }}
          />

          <View
            style={{
              width: 40,
              height: 40,
              position: "absolute",
              bottom: "-5%",
              alignSelf: "center",
              backgroundColor: "#e62638",
              borderStyle: "solid",
              borderWidth: 3,
              color: "#fff",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              borderColor: "#ffffff",

              zIndex: 99
            }}
          >
            <Text
              style={{
                textAlign: "center",
                textAlignVertical: "center",
                fontFamily: "Poppins",
                fontSize: moderateScale(20),
                lineHeight: moderateScale(33),
                fontWeight: "600",
                fontStyle: "normal",
                letterSpacing: 0,

                color: "#ffffff"
              }}
            >
              {number}
            </Text>
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            width: "100%",
            height: height * 0.283,
            marginTop: verticalScale(10),
            // backgroundColor: "#ffffff",
            alignSelf: "center",
            marginHorizontal: -16,
            // borderWidth: 2,
            flex: 0.34
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
                color: "#000000",
                paddingVertical: verticalScale(15)
              }}
            >
              {title}
              {/* {selectedItem.title} */}
            </Text>

            <Text
              style={{
                width: scale(300),
                fontFamily: "Roboto-Regular",
                fontSize: moderateScale(18),
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "center",
                color: "#000000"
              }}
            >
              {text}
            </Text>
          </ScrollView>
        </View>
        <View style={{ flex: 0.12, borderWidth: 0 }}>
          <CustomAudioPlayer
            audio={audio}
            free={this.state.free === true ? () => this.free() : null}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolBarBg: {
    position: "absolute",
    top: "0"
  },
  bgImage: {
    width: "100%",
    flex: 0.54
  },

  bgView: {
    width,
    height,
    paddingTop: verticalScale(0),
    backgroundColor: "#fff"
  }
});
