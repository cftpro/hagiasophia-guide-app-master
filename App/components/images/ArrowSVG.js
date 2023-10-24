import React from "react";
import Svg, { G, Rect, Path } from "react-native-svg";

const ArrowSVG = props => (
  <Svg width={29} height={29} {...props}>
    <G data-name="Group 24" transform="translate(-304 -274)">
      <Rect
        width={29}
        height={29}
        data-name="Rectangle 10"
        rx={14.5}
        transform="translate(304 274)"
        fill="#e1e8f0"
      />
      <Path
        d="M316.5 284.007l4.959 4.959-4.959 4.959"
        data-name="Path 6"
        fill="none"
        stroke="#656f7a"
        strokeWidth={2}
      />
    </G>
  </Svg>
);

export default ArrowSVG;
