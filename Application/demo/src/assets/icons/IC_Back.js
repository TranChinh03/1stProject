import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={47}
    height={47}
    fill="none"
    {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M13.963 35.857H29.63c5.405 0 9.791-4.387 9.791-9.792s-4.386-9.791-9.791-9.791H8.088"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M12.592 21.17 7.58 16.156l5.013-5.013"
    />
  </Svg>
);
export default SvgComponent;
