import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18v12a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V18m-6-9-6-6m0 0-6 6m6-6v19.5"
    />
  </Svg>
);
export default SvgComponent;
