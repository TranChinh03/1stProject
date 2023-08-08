import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import {custom_styles} from '../src/constants/style';
import CUSTOM_COLORS from '../src/constants/color';
import APP_COLORS from '../src/constants/appcolors';
import scale from '../src/constants/responsive';
import {IC_Car} from '../src/assets/icons';
import {launchImageLibrary} from 'react-native-image-picker';
import {IMG_CAR} from '../src/assets/imgs';

export default class ClassifyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgPath: '',
    };
  }
  ImagePicker() {
    let option = {
      storageOption: {
        path: 'image',
      },
    };

    launchImageLibrary(option, response => {
      this.setState({imgPath: response.assets[0].uri});
      //console.log(this.imgPath);
      console.log(response.assets[0].uri);
      //this.props.navigation.navigate('Result', {imgPath: IMG_CAR});
      this.props.navigation.navigate('Result', {imgPath: this.state.imgPath});
    });
  }
  render() {
    return (
      <SafeAreaView style={custom_styles.mainContainer}>
        <View style={styles.container1}>
          <Text
            style={[
              custom_styles.txtDiscription,
              {color: APP_COLORS.primaryColor},
            ]}>
            {'Choose an image of the car\n from your device'}
          </Text>
        </View>
        <View style={styles.container1} />
        <View style={styles.container2}>
          <TouchableOpacity
            style={styles.btnImport}
            onPress={() => {
              this.ImagePicker();
            }}>
            <IC_Car style={{alignSelf: 'center'}} />
          </TouchableOpacity>
          <Text
            style={[
              custom_styles.txtDiscription,
              {color: APP_COLORS.primaryColor},
            ]}>
            Import file
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    //backgroundColor: 'red',
    justifyContent: 'flex-end',
  },
  container2: {
    flex: 3,
    justifyContent: 'flex-start',
  },
  btnImport: {
    height: scale(125, 'w'),
    width: scale(125, 'w'),
    borderRadius: scale(125 / 2, 'w'),
    backgroundColor: APP_COLORS.primaryColor,
    alignSelf: 'center',
    marginBottom: scale(20, 'h'),
    justifyContent: 'center',
  },
});
