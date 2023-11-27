import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M11.883 30.517h13.334c4.6 0 8.333-3.734 8.333-8.334s-3.733-8.333-8.333-8.333H6.883"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M10.717 18.017 6.45 13.75l4.267-4.267"
    />
  </Svg>
);
export default SvgComponent;
