import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={196}
    height={176}
    fill="none"
    {...props}>
    <Rect
      width={190}
      height={170}
      x={3}
      y={3}
      stroke="#0096C7"
      strokeDasharray="200 200"
      strokeLinejoin="round"
      strokeWidth={5}
      rx={27}
    />
  </Svg>
);
export default SvgComponent;
