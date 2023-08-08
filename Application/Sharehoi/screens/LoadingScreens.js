import {Text, StyleSheet, View, SafeAreaView, Image} from 'react-native';
import React, {Component} from 'react';
import APP_COLORS from '../src/constants/appcolors';
import {IMG_CAR} from '../src/assets/imgs';
import CUSTOM_SIZES from '../src/constants/size';
import CUSTOM_FONTS from '../src/constants/fonts';
import {IC_Loading} from '../src/assets/icons';
import {custom_styles} from '../src/constants/style';
import scale from '../src/constants/responsive';

export default class LoadingScreens extends Component {
  render() {
    return (
      <SafeAreaView style={custom_styles.mainContainer}>
        <View style={styles.subCon1}>
          <Image source={IMG_CAR} resizeMode="cover" style={styles.imgCon} />
        </View>
        <View style={styles.subCon2}>
          <Text style={styles.txtTiltle1}>Welcome to</Text>
          <Text style={[styles.txtTiltle1, {fontSize: CUSTOM_SIZES.x4Large}]}>
            Sharehoi
          </Text>
          <View style={styles.subCon3}>
            <IC_Loading style={{alignSelf: 'center'}} />
            <Text style={custom_styles.txtDiscription}>
              {'Use this app to find\nthe name of any car!'}
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
