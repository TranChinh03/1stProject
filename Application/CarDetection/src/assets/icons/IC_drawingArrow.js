import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import CUSTOM_COLORS from '../../constants/color';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={34}
    fill="none"
    {...props}>
    <Path
      stroke={CUSTOM_COLORS.Marianblue}
      d="M9.89 1.5c-3.333-.5-11.6 6.2-8 17 4.5 13.5 25.5 15.5 15.5 14"
    />
  </Svg>
);
export default SvgComponent;
