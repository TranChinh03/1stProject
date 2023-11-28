import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {Component} from 'react';
import APP_COLORS from '../src/constants/appcolors';
import {IMG_CAR} from '../src/assets/imgs';
import CUSTOM_SIZES from '../src/constants/size';
import {custom_styles} from '../src/constants/style';
import scale from '../src/constants/responsive';

export default class LoadingScreens extends Component {
  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 3000);
  }
  render() {
    // const navigation = useNavigation();
    return (
      <SafeAreaView
        style={[
          custom_styles.mainContainer,
          {backgroundColor: APP_COLORS.primaryColor},
        ]}>
        <View style={styles.subCon1}>
          <Image source={IMG_CAR} resizeMode="cover" style={styles.imgCon} />
        </View>
        <View style={styles.subCon2}>
          <Text style={styles.txtTiltle1}>Welcome to</Text>
          <Text style={[styles.txtTiltle1, {fontSize: CUSTOM_SIZES.x4Large}]}>
            Sharehoi
          </Text>
          <View style={styles.subCon3}>
            <ActivityIndicator size="large" color="white" />
            <Text style={custom_styles.txtDiscription}>
              {'Use this app to detect\nand classify any car!'}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  subCon1: {
    flex: 1,
    //backgroundColor: 'red',
    justifyContent: 'flex-end',
  },
  subCon2: {
    flex: 1,
    //backgroundColor: 'yellow',
    alignItems: 'center',
  },
  subCon3: {
    flex: 1,
    //backgroundColor: 'yellow',
    justifyContent: 'space-evenly',
  },
  imgCon: {
    height: '70%',
    width: '100%',
    alignSelf: 'flex-end',
    marginRight: scale(-100, 'w'),
  },
  txtTiltle1: {
    color: 'white',
    fontSize: CUSTOM_SIZES.x2Large,
    fontFamily: 'Livvic-Bold',
    alignSelf: 'center',
  },
});
