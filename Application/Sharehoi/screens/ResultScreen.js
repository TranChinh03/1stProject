import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import {custom_styles} from '../src/constants/style';
import APP_COLORS from '../src/constants/appcolors';
import CUSTOM_COLORS from '../src/constants/color';
import scale from '../src/constants/responsive';
import {IC_Back, IC_BorderDashed} from '../src/assets/icons';
import {IMG_CAR01164} from '../src/assets/imgs';
import CUSTOM_SIZES from '../src/constants/size';
import CUSTOM_FONTS from '../src/constants/fonts';
import BackButton from '../src/components/buttonBack';
import {launchImageLibrary} from 'react-native-image-picker';

export default class ResultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgPath: this.props.route.params.imgPath,
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
      console.log('path: ', this.imgPath);
      //this.props.navigation.navigate('Result', {imgPath: IMG_CAR});
    });
  }
  render() {
    //onsole.log('log', this.props.route.params);

    return (
      <SafeAreaView style={custom_styles.mainContainer}>
        <StatusBar
          animated={true}
          backgroundColor={APP_COLORS.primaryColor}
          //   barStyle={statusBarStyle}
          //   showHideTransition={statusBarTransition}
          //   hidden={hidden}
        />
        <View style={styles.container1}>
          <View style={styles.subCon1}>
            <BackButton
              style={{alignSelf: 'center'}}
              onPress={() => this.props.navigation.navigate('Classify')}
            />
            <Text style={custom_styles.txtHeading1}>Result</Text>
          </View>
        </View>
        <View style={styles.container2}>
          <View style={styles.subCon2}>
            <Image
              //source={IMG_CAR01164}
              source={{uri: this.state.imgPath}}
              resizeMode="cover"
              style={styles.imgCon}
            />
          </View>
          <Text style={styles.txtLabel}>2010 Audi R8 5.2</Text>

          {/* <IC_BorderDashed style={{alignSelf: 'center'}}></IC_BorderDashed> */}
        </View>
        <View style={styles.container3}>
          <TouchableOpacity
            style={styles.btnCon}
            onPress={() => {
              this.ImagePicker();
            }}>
            <Text style={styles.txtBtn}>Choose another image</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container1: {flex: 1, backgroundColor: APP_COLORS.primaryColor},
  container2: {
    flex: 4.5,
    //backgroundColor: 'yellow',
    justifyContent: 'space-evenly',
  },
  container3: {flex: 2},
  subCon1: {
    height: '90%',
    width: '95%',
    backgroundColor: CUSTOM_COLORS.HonoluluBlue,
    borderRadius: scale(15, 'w'),
    alignSelf: 'center',
    flexDirection: 'row',

    paddingHorizontal: scale(15, 'w'),
  },
  subCon2: {
    height: '50%',
    width: '85%',
    borderColor: APP_COLORS.secondaryColor,
    borderWidth: scale(5, 'w'),
    alignSelf: 'center',
    borderStyle: 'dashed',
    borderRadius: scale(15, 'w'),
    justifyContent: 'center',
  },
  imgCon: {
    height: '80%',
    width: '85%',
    alignSelf: 'center',
    borderRadius: scale(15, 'w'),
  },
  txtLabel: {
    color: APP_COLORS.secondaryColor,
    fontSize: CUSTOM_SIZES.x2medium,
    fontFamily: CUSTOM_FONTS.bold,
    alignSelf: 'center',
  },
  btnCon: {
    height: scale(65, 'h'),
    width: scale(270, 'w'),
    backgroundColor: APP_COLORS.primaryColor,
    borderRadius: scale(15, 'w'),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  txtBtn: {
    color: 'white',
    fontSize: CUSTOM_SIZES.medium,
    fontFamily: CUSTOM_FONTS.medium,
    alignSelf: 'center',
  },
});
