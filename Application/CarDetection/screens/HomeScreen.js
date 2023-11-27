import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {
  IC_Car,
  IC_DrawingArrow,
  IC_Infor,
  IC_Notice,
} from '../src/assets/icons';
import scale from '../src/constants/responsive';
import CUSTOM_FONTS from '../src/constants/fonts';
import CUSTOM_COLORS from '../src/constants/color';
import APP_COLORS from '../src/constants/appcolors';
import Carousel from 'react-native-snap-carousel';
import {
  IMG_CAR,
  IMG_CARWNAME,
  IMG_DETECTCAR,
  IMG_TRAFFIC,
} from '../src/assets/imgs';
import {useNavigation} from '@react-navigation/native';
import ClassifyScreen from './InputScreen';

const data = [
  {
    title: 'Classify',
    text: 'Know car name using real-time camera',
    imgPath: IMG_CARWNAME,
    navigate: 'Classify',
  },
  {
    title: 'Detect',
    text: 'Take a photo and see where the car is!',
    imgPath: IMG_DETECTCAR,
    navigate: 'Detect',
  },
  {
    title: 'Vehicle',
    text: 'Detect vehicles in a traffic photo',
    imgPath: IMG_TRAFFIC,
    navigate: 'Vehicle',
  },
];

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  renderItem({item, index}) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate(item.navigate);
        }}>
        <View style={styles.carouselItem}>
          <View style={styles.imgContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemText}>{item.text}</Text>
            <TouchableOpacity style={styles.itemButton}>
              <Text
                style={styles.txtTrynow}
                onPress={() => {
                  this.props.navigation.navigate(item.navigate);
                }}>
                Try now
              </Text>
            </TouchableOpacity>
            <Image
              source={item.imgPath}
              resizeMode="contain"
              style={styles.imgCon}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <TouchableOpacity style={styles.btnNotice}>
              <IC_Notice style={{alignSelf: 'center'}} />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.btnNotice}>
              <IC_Infor style={{alignSelf: 'center'}} />
            </TouchableOpacity> */}
          </View>
          <Text style={styles.txtTilte}>{'Let’s try our\nnew features!'}</Text>
          <View style={styles.carouselContainer}>
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              loop={true}
              loopClonesPerSide={10}
              data={data}
              renderItem={this.renderItem.bind(this)}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={225}
              itemHeight={308}
              firstItem={1}
              inactiveSlideScale={0.7}
              inactiveSlideOpacity={0.5}
              alignItems="center"
              alignContent="center"
            />
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.txtAppName}>Sharehoi</Text>
            <Text style={styles.txtVersion}>v1.1.0</Text>
            <TouchableOpacity
              style={styles.topContainer}
              onPress={() => this.props.navigation.navigate('Intro')}>
              <IC_Infor />
              <Text style={styles.txtAbout}>
                Discover additional details about us
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  btnNotice: {
    padding: scale(7, 'w'),
  },
  topContainer: {
    marginTop: scale(20, 'h'),
    marginRight: scale(20, 'h'),
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  txtTilte: {
    flex: 2,
    fontSize: scale(40, 'w'),
    fontFamily: CUSTOM_FONTS.bold,
    color: CUSTOM_COLORS.Marianblue,
    marginLeft: scale(20, 'w'),
  },
  carouselContainer: {
    flex: 5,
  },
  bottomContainer: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  txtAppName: {
    fontSize: scale(24, 'w'),
    fontFamily: CUSTOM_FONTS.black,
    color: CUSTOM_COLORS.Marianblue,
    alignSelf: 'center',
  },
  txtVersion: {
    fontSize: scale(16, 'w'),
    fontFamily: CUSTOM_FONTS.regular,
    color: CUSTOM_COLORS.Marianblue,
    alignSelf: 'center',
  },
  imgCon: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    // /backgroundColor: 'red',
  },
  carouselItem: {
    // backgroundColor: CUSTOM_COLORS.BlueGreen,
    // borderRadius: scale(20, 'w'),
    // width: scale(225, 'h'),
    // padding: scale(10, 'w'),
    // height: scale(308, 'h'),
    // justifyContent: 'flex-start',
  },
  imgContainer: {
    height: '80%',
    width: '100%',
    justifyContent: 'flex-start',
  },
  itemTitle: {
    fontFamily: CUSTOM_FONTS.bold,
    color: CUSTOM_COLORS.Marianblue,
    fontSize: scale(36, 'w'),
  },
  itemText: {
    fontFamily: CUSTOM_FONTS.regular,
    color: CUSTOM_COLORS.Marianblue,
    fontSize: scale(18, 'w'),
  },
  itemButton: {
    alignSelf: 'flex-end',
    height: scale(40, 'h'),
    width: scale(111, 'w'),
    backgroundColor: CUSTOM_COLORS.Marianblue,
    borderRadius: scale(15, 'w'),
    justifyContent: 'center',
    marginTop: scale(15, 'h'),
  },
  txtTrynow: {
    color: 'white',
    fontSize: scale(13, 'w'),
    fontFamily: CUSTOM_FONTS.bold,
    alignSelf: 'center',
  },
  txtAbout: {
    color: CUSTOM_COLORS.Marianblue,
    marginLeft: scale(5, 'w'),
    textDecorationLine: 'underline',
  },
});
