import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions
} from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { strings } from "i18/i18n.js";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  screenContainer: {
    width: width,
    height: height,
    backgroundColor: "#00000090",
    position: "absolute",
    alignItems: "flex-start",
    justifyContent: "center",
    zIndex: 10
  },
  touchableContianer: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center"
  },
  mainContainer: {
    width: width * 0.8,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FAFAFA"
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "lightgrey",
    marginHorizontal: 5
  },
  topView: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: "#fafafa",
    borderBottomWidth: 0,
    borderBottomColor: "lightgrey"
  },
  categoryInfoView: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  selectCategoryText: {
    paddingLeft: 5,
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: moderateScale(16),
    textAlign: "center",
    marginVertical: 3,
    backgroundColor: "transparent"
  },
  closeView: {
    position: "absolute",
    right: 4,
    top: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  closeTouchable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  closeText: {
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: moderateScale(14),
    textAlign: "center",
    fontWeight: "400"
  },
  listContainer: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fafafa"
  },
  listStyle: {
    alignSelf: "stretch",
    maxHeight: height * 0.5
  },
  rowStyle: {
    flexDirection: "row",
    paddingHorizontal: 8,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 6,
    borderBottomLeftRadius: 20,
    backgroundColor: "transparent"
  },
  rowText: {
    flex: 1,
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: moderateScale(20),
    textAlign: "left",
    marginRight: 5,
    marginVertical: 5,
    paddingLeft: 3
  }
});

class CustomDropDown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { props } = this;
    return (
      <View>
        <Modal animationType="slide" visible={props.showModal} transparent>
          <View style={styles.screenContainer}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.touchableContianer}
              onPress={() => props.close()}
            >
              <View
                style={[styles.mainContainer, props.dropdownContainerStyle]}
              >
                <View style={styles.topView}>
                  <View style={styles.categoryInfoView}>
                    <Text
                      style={styles.selectCategoryText}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {strings("customDropDown.SelectLanguage")}
                    </Text>
                  </View>
                  <View style={styles.closeView}>
                    <TouchableOpacity
                      onPress={() => props.close()}
                      style={styles.closeTouchable}
                    >
                      <Text style={styles.closeText}>
                        {strings("customDropDown.Close")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.listContainer}>
                  <FlatList
                    style={styles.listStyle}
                    data={props.listData}
                    keyExtractor={index => index}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                          props.onSelectOption(item, index);
                          props.close();
                        }}
                      >
                        <View style={styles.rowStyle}>
                          <Text
                            style={styles.rowText}
                            numberOfLines={3}
                            lineBreakMode="tail"
                          >
                            {item}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

CustomDropDown.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.any).isRequired,
  onSelectOption: PropTypes.func,
  close: PropTypes.func,
  dropdownContainerStyle: PropTypes.any,
  showModal: PropTypes.bool
};

CustomDropDown.defaultProps = {
  title: "Select an option",
  listData: [],
  onSelectOption: () => {},
  close: () => {},
  dropdownContainerStyle: null,
  showModal: false
};

export default CustomDropDown;
