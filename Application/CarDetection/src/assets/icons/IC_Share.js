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
      fill="#000"
      d="m32.096 15.221-6.75 6.75a.844.844 0 0 1-1.192-1.192l5.308-5.31h-6.259a12.648 12.648 0 0 0-12.258 9.492.844.844 0 1 1-1.634-.422 14.336 14.336 0 0 1 13.892-10.758h6.262l-5.311-5.31a.844.844 0 0 1 1.192-1.192l6.75 6.75a.844.844 0 0 1 0 1.192ZM27 29.531H5.625a.281.281 0 0 1-.281-.281V12.375a.844.844 0 1 0-1.688 0V29.25a1.969 1.969 0 0 0 1.969 1.969H27a.843.843 0 1 0 0-1.688Z"
    />
  </Svg>
);
export default SvgComponent;
