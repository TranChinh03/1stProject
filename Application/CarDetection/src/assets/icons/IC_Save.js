import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#023E8A"
        d="M3 1.5A1.5 1.5 0 0 0 1.5 3v18A1.5 1.5 0 0 0 3 22.5h18a1.5 1.5 0 0 0 1.5-1.5V3A1.5 1.5 0 0 0 21 1.5h-6.75a1.5 1.5 0 0 0-1.5 1.5v10.94l3.969-3.971a.75.75 0 1 1 1.062 1.062l-5.25 5.25a.75.75 0 0 1-1.062 0l-5.25-5.25a.75.75 0 1 1 1.062-1.062l3.969 3.97V3a3 3 0 0 1 3-3H21a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h3.75a.75.75 0 1 1 0 1.5H3Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
