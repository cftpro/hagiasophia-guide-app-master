import React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";

const SvgComponent = props => (
  <Svg
    {...props}
    style={{ backgroundColor: "transparent" }}
    width={360}
    height={62}
  >
    <Defs>
      <LinearGradient
        id="prefix__a"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset="1" stopColor="#000" stopOpacity="0%" />
        <Stop offset="1" stopColor="#fff" />
      </LinearGradient>
    </Defs>
    <G data-name="Symbol 4 \u2013 1" translate="0,-180">
      <Path
        d="M0 0h360v62H0z"
        data-name="Rectangle 23"
        fill="url(#prefix__a)"
        translate="0,397"
      />
    </G>
  </Svg>
);

export default SvgComponent;
