import {Text, StyleSheet, View, SafeAreaView, Image} from 'react-native';
import React, {Component} from 'react';
import APP_COLORS from '../src/constants/appcolors';
import {IMG_CAR} from '../src/assets/imgs';

export default class LoadingScreens extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.subCon1}>
          <Image
            source={IMG_CAR}
            resizeMode="cover"
            style={styles.imgCon}></Image>
        </View>
        <View style={styles.subCon2}></View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: APP_COLORS.primaryColor,
  },
  subCon1: {
    height: '50%',
    backgroundColor: 'red',
  },
  subCon2: {
    height: '50%',
    backgroundColor: 'yellow',
  },
  imgCon: {
    height: '80%',
    width: '100%',
  },
});
