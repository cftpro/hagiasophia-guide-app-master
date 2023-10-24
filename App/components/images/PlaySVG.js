import React from "react";
import Svg, { Path } from "react-native-svg";

import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const SvgComponent = props => {
  if (props.Color === "#7a95d6")
    return (
      <Svg width={27.281} height={27.281} data-name="001-play-button">
        <Path
          d="M13.64 1.364A12.276 12.276 0 1 1 1.364 13.64 12.29 12.29 0 0 1 13.64 1.364m0-1.364a13.64 13.64 0 1 0 13.64 13.64A13.641 13.641 0 0 0 13.64 0z"
          data-name="Path 17"
          fill="#7a95d6"
        />
        <Path
          d="M19.09 12.165l-7.263-4.78c-1.254-.825-2.279-.271-2.279 1.229v10.051c0 1.5 1.027 2.056 2.283 1.234l7.256-4.749a1.661 1.661 0 0 0 .003-2.985zm-.968 1.991l-6.45 4.221c-.418.274-.761.089-.761-.411V9.322c0-.5.342-.684.76-.409l6.452 4.246a.554.554 0 0 1-.001.993z"
          data-name="Path 18"
          fill="#7a95d6"
        />
      </Svg>
    );
  return (
    <Svg width={27.281} height={27.281} data-name="001-play-button">
      <Path
        d="M13.64 1.364A12.276 12.276 0 1 1 1.364 13.64 12.29 12.29 0 0 1 13.64 1.364m0-1.364a13.64 13.64 0 1 0 13.64 13.64A13.641 13.641 0 0 0 13.64 0z"
        data-name="Path 17"
      />
      <Path
        d="M19.09 12.165l-7.263-4.78c-1.254-.825-2.279-.271-2.279 1.229v10.051c0 1.5 1.027 2.056 2.283 1.234l7.256-4.749a1.661 1.661 0 0 0 .003-2.985zm-.968 1.991l-6.45 4.221c-.418.274-.761.089-.761-.411V9.322c0-.5.342-.684.76-.409l6.452 4.246a.554.554 0 0 1-.001.993z"
        data-name="Path 18"
      />
    </Svg>
  );
};

export default SvgComponent;
