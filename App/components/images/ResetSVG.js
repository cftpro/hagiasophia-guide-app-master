import React from "react";
import Svg, { Path } from "react-native-svg";

import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const SvgComponent = props => {
  if (props.Color === '"#7a95d6"')
    return (
      <Svg width={27.281} height={27.281} data-name="004-stop">
        <Path
          d="M13.64 1.364A12.276 12.276 0 1 1 1.364 13.64 12.29 12.29 0 0 1 13.64 1.364m0-1.364a13.64 13.64 0 1 0 13.64 13.64A13.641 13.641 0 0 0 13.64 0z"
          data-name="Path 19"
          fill="#7a95d6"
        />
        <Path
          d="M17.935 7.076H9.353A2.28 2.28 0 0 0 7.08 9.349v8.586a2.28 2.28 0 0 0 2.273 2.273h8.582a2.28 2.28 0 0 0 2.273-2.273V9.353a2.28 2.28 0 0 0-2.273-2.277zm.909 10.4a1.368 1.368 0 0 1-1.364 1.364H9.807a1.368 1.368 0 0 1-1.364-1.364V9.803a1.368 1.368 0 0 1 1.364-1.364h7.673a1.368 1.368 0 0 1 1.364 1.364z"
          data-name="Path 20"
          fill="#7a95d6"
        />
      </Svg>
    );
  return (
    <Svg width={27.281} height={27.281} data-name="004-stop">
      <Path
        d="M13.64 1.364A12.276 12.276 0 1 1 1.364 13.64 12.29 12.29 0 0 1 13.64 1.364m0-1.364a13.64 13.64 0 1 0 13.64 13.64A13.641 13.641 0 0 0 13.64 0z"
        data-name="Path 19"
        fill="#000"
      />
      <Path
        d="M17.935 7.076H9.353A2.28 2.28 0 0 0 7.08 9.349v8.586a2.28 2.28 0 0 0 2.273 2.273h8.582a2.28 2.28 0 0 0 2.273-2.273V9.353a2.28 2.28 0 0 0-2.273-2.277zm.909 10.4a1.368 1.368 0 0 1-1.364 1.364H9.807a1.368 1.368 0 0 1-1.364-1.364V9.803a1.368 1.368 0 0 1 1.364-1.364h7.673a1.368 1.368 0 0 1 1.364 1.364z"
        data-name="Path 20"
        fill="#000"
      />
    </Svg>
  );
};

export default SvgComponent;
