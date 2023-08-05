import {Dimensions} from 'react-native';
const designWidth = 360;
const designHeight = 800;

function scale(number, dimension) {
  let scaleNumber;
  if (dimension == 'w') {
    const currentDeviceWidth = Dimensions.get('window').width;
    scaleNumber = (number / designWidth) * currentDeviceWidth;
  } else if (dimension == 'h') {
    const currentDeviceHeight = Dimensions.get('window').height;
    scaleNumber = (number / designHeight) * currentDeviceHeight;
  }
  return scaleNumber;
}

export default scale;
