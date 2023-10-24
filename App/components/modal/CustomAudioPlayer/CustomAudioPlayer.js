import React, { PureComponent } from "react";

import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import service from "../service";
import colors from "assets/colors/colors";
import ResetSVG from "components/images/ResetSVG.js";
import PlaySVG from "components/images/PlaySVG.js";
import PauseSVG from "components/images/PauseSVG.js";

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  Dimensions,
  Slider
} from "react-native";
const { height, width } = Dimensions.get("window");
import Sound from "react-native-sound";

const img_speaker = require("./resources/ui_speaker.png");
const img_pause = require("./resources/ui_pause.png");
const img_play = require("./resources/ui_play.png");
const img_playjumpleft = require("./resources/ui_playjumpleft.png");
const img_playjumpright = require("./resources/ui_playjumpright.png");

export default class CustomAudioPlayer extends PureComponent {
  static navigationOptions = props => ({
    title: props.navigation.state.params.title
  });

  constructor(props) {
    super(props);
    this.state = {
      playState: "paused", //playing, paused
      playSeconds: 0,
      duration: 0
    };
    this.sliderEditing = false;
  }

  componentDidMount() {
    this.timeout = setInterval(() => {
      if (
        this.sound &&
        this.sound.isLoaded() &&
        this.state.playState == "playing" &&
        !this.sliderEditing
      ) {
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState({ playSeconds: seconds });
        });
      }
    }, 100);
  }
  componentWillUnmount() {
    if (this.sound) {
      this.sound.release();
      this.sound = null;
    }
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }

  onSliderEditStart = () => {
    this.sliderEditing = true;
  };
  onSliderEditEnd = () => {
    this.sliderEditing = false;
  };
  onSliderEditing = value => {
    if (this.sound) {
      this.sound.setCurrentTime(value);
      this.setState({ playSeconds: value });
    }
  };

  play = async () => {
    if (this.sound) {
      this.sound.play(this.playComplete);
      this.setState({ playState: "playing" });
    } else {
      const filepath = this.props.audio
        ? this.props.audio
        : "https://istanbulwelcomecard.com/uploads/audio-guide/audio.mp3";
      console.log("[Play]", filepath);

      this.sound = new Sound(filepath, "", error => {
        if (error) {
          console.log("failed to load the sound", error);
          Alert.alert("Notice", "audio file error. (Error code : 1)");
          this.setState({ playState: "paused" });
        } else {
          this.setState({
            playState: "playing",
            duration: this.sound.getDuration()
          });
          this.sound.play(this.playComplete);
        }
      });
    }
  };
  playComplete = success => {
    if (this.sound) {
      if (success) {
        console.log("successfully finished playing");
        const { free } = this.props;
        if (free) {
          this.props.free();
        }
      } else {
        console.log("playback failed due to audio decoding errors");
        alert("Notice", "audio file error. (Error code : 2)");
      }
      this.setState({ playState: "paused", playSeconds: 0 });
      this.sound.setCurrentTime(0);
    }
  };

  pause = () => {
    if (this.sound) {
      this.sound.pause();
    }

    this.setState({ playState: "paused" });
  };
  reset = () => {
    if (this.sound) {
      this.sound.setCurrentTime(0);
      this.setState({ playSeconds: 0 });
      this.pause();
    }
  };

  jumpPrev15Seconds = () => {
    this.jumpSeconds(-15);
  };
  jumpNext15Seconds = () => {
    this.jumpSeconds(15);
  };
  jumpSeconds = secsDelta => {
    if (this.sound) {
      this.sound.getCurrentTime((secs, isPlaying) => {
        let nextSecs = secs + secsDelta;
        if (nextSecs < 0) nextSecs = 0;
        else if (nextSecs > this.state.duration) nextSecs = this.state.duration;
        this.sound.setCurrentTime(nextSecs);
        this.setState({ playSeconds: nextSecs });
      });
    }
  };

  getAudioTimeString(seconds) {
    const h = parseInt(seconds / (60 * 60));
    const m = parseInt((seconds % (60 * 60)) / 60);
    const s = parseInt(seconds % 60);

    return (
      //   (h < 10 ? "0" + h : h) +
      //   ":" +
      (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s)
    );
  }

  render() {
    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "transparent",
          width: "100%",
          height: height,
          borderWidth: 0,
          alignItems: "flex-start"
        }}
      >
        <View
          style={{
            marginVertical: 15,
            marginHorizontal: 0,
            flexDirection: "row",
            borderWidth: 0
          }}
        >
          <View style={{ flex: 5.5, borderWidth: 0 }}>
            <Slider
              onTouchStart={this.onSliderEditStart}
              // onTouchMove={() => console.log('onTouchMove')}
              onTouchEnd={this.onSliderEditEnd}
              // onTouchEndCapture={() => console.log('onTouchEndCapture')}
              // onTouchCancel={() => console.log('onTouchCancel')}
              onValueChange={this.onSliderEditing}
              value={this.state.playSeconds}
              maximumValue={this.state.duration}
              maximumTrackTintColor="#2758cb"
              minimumTrackTintColor="#2758cb"
              thumbTintColor="#2758cb"
              style={{
                flex: 1,
                alignSelf: "center",
                margin: 0,
                width: width * 0.7,
                padding: 0,
                height: 5
                // marginHorizontal: Platform.select({ ios: 5, android: 15 })
              }}
            />
            <View
              style={{
                marginRight: 0,
                flexDirection: "row",
                justifyContent: "flex-end",
                flex: 3,
                width: width * 0.64
              }}
            >
              <Text
                style={{
                  color: "#707070"
                }}
              >
                {currentTimeString}
              </Text>
              <Text style={{ color: "#707070" }}>{"  --  "}</Text>
              <Text
                style={{
                  color: "#707070"
                }}
              >
                {durationString}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: -6,
              flex: 2,
              backgroundColor:
                this.state.playState != "playing" ? "#bbdefb" : "#1976d2",
              marginRight: 10,
              height: 40,
              borderRadius: 5
            }}
          >
            {/* <TouchableOpacity
              onPress={this.reset}
              style={{ justifyContent: "center", flex: 1 }}
            >
              <ResetSVG Color="#000" />
            </TouchableOpacity> */}
            {this.state.playState != "playing" ? (
              <TouchableOpacity
                onPress={this.play}
                style={{
                  alignSelf: "center",
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    height: 27.281,
                    textAlignVertical: "center",
                    fontSize: 18,
                    color: "#1a237e" //"#1a237e"
                  }}
                >
                  Play
                </Text>
                {/* <PlaySVG
                  Color={this.state.playState != "playing" && "#7a95d6"}
                /> */}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={this.pause}
                style={{
                  alignSelf: "center",
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    height: 27.281,
                    textAlignVertical: "center",
                    color: "#fff",
                    fontSize: 18
                  }}
                >
                  Pause
                </Text>
                {/* <PlaySVG
                  Color={this.state.playState != "playing" && "#7a95d6"}
                /> */}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}
