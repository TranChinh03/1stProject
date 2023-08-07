import {StyleSheet} from 'react-native';
import CUSTOM_COLORS from './color';
import APP_COLORS from './appcolors';
import CUSTOM_SIZES from './size';
import CUSTOM_FONTS from './fonts';
import scale from './responsive';
const custom_styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    //backgroundColor: APP_COLORS.primaryColor,
  },
  txtDiscription: {
    color: 'white',
    fontSize: CUSTOM_SIZES.medium,
    fontFamily: CUSTOM_FONTS.medium,
    textAlign: 'center',
  },
  txtHeading1: {
    color: 'white',
    fontSize: CUSTOM_SIZES.xLarge,
    fontFamily: CUSTOM_FONTS.bold,
    alignSelf: 'center',
    marginLeft: scale(15, 'w'),
  },
});

export {custom_styles};
