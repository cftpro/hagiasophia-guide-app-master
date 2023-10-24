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
  Image,
  TouchableOpacity
} from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import { strings } from "i18/i18n.js";
import images from "../../components/images/images";

const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
// let dirs = RNFetchBlob.fs.dirs;

let index = 0;
let data = null;
function createData(number, title, text, images, id) {
  const i = index;
  index = index + 1;

  if (data !== null) {
    item = data;
    return {
      index: index,
      floor: " ",
      number: number,
      title: item.title,
      audio: item.audio,
      audioPath: item.audioPath ? item.audioPath : null,
      text: item.text,
      images: images
    };
  }
  console.log("data:");
  console.log(data);
  return {
    index: index,
    floor: strings("mediaScreen.Garden"),
    number: number,
    title: title,
    text: text,
    images: images
  };
}

// create a component
class FreeVersion extends PureComponent {
  constructor(props) {
    super(props);
    if (this.props.navigation.state.params)
      data = this.props.navigation.state.params.data;
    const item = createData(
      1,
      "1.Kat Bölüm İsmi 1",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem.Integer ut turpis quis neque pellentesque convallis sed eu augue.Morbi pharetra lorem sit amet ex luctus, et mollis leo tristique.et mollis leo tristique.et mollis leo tristique.",
      images.imageGarden1,
      "1.00"
    );
    this.state = {
      item: item
    };
  }
  componentDidMount() {
    const item = this.state.item;
    this.props.navigation.replace("mediaModal", {
      ...item,
      free: true
    });
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const { item } = this.state;

    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,

    paddingHorizontal: scale(16),
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingTop: verticalScale(16)
  },
  logoContainer: {},
  hagiaSophia: {
    width: (width * 3) / 4,
    fontFamily: "Poppins SemiBold",
    fontSize: scale(36),
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#fff",
    marginTop: moderateScale(10)
  },
  map: {
    width: "100%",
    height: width / 2
  },
  logoSubTitle: {
    width: (width * 3) / 4,
    height: verticalScale(48),
    fontFamily: "Poppins Light",
    fontSize: scale(32),
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#fff"
  }
});

export default FreeVersion;
