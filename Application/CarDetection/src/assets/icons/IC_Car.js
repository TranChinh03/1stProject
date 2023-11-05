import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={65}
    height={65}
    fill="none"
    {...props}>
    <Path fill="url(#a)" d="M0 0h65v65H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#b" transform="scale(.01)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={100}
        height={100}
      />
    </Defs>
  </Svg>
);
export default SvgComponent;
