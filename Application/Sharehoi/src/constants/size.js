import scale from './responsive';

const CUSTOM_SIZES = {
  xSmall: scale(10, 'w'),
  small: scale(14, 'w'),
  medium: scale(16, 'w'),
  large: scale(20, 'w'),
  xLarge: scale(24, 'w'),
  x2Large: scale(36, 'w'),
  x3Large: scale(40, 'w'),
  x4Large: scale(64, 'w'),
};
export default CUSTOM_SIZES;
