import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import APP_COLORS from '../src/constants/appcolors';
import {IMG_INTRO} from '../src/assets/imgs';
import scale from '../src/constants/responsive';
import CUSTOM_FONTS from '../src/constants/fonts';
import {IC_Back} from '../src/assets/icons';

export default class IntroduceScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <View style={{height: '20%'}} /> */}
        <ImageBackground
          source={IMG_INTRO}
          style={styles.image}
          resizeMode="cover">
          <TouchableOpacity
            style={{margin: scale(20, 'w')}}
            onPress={() => this.props.navigation.goBack()}>
            <IC_Back />
          </TouchableOpacity>
          <View>
            <View style={styles.textContainer}>
              <Text style={styles.Heading}>About us</Text>
              <Text style={styles.Body}>
                <Text style={styles.Body}>Welcome to </Text>
                <Text style={styles.imBody}>Sharehoi,{'\n'}</Text>
                <Text style={styles.Body}>We are student of the </Text>
                <Text style={styles.imBody}>2021 (K16) </Text>
                <Text style={styles.Body}>class at </Text>
                <Text style={styles.imBody}>
                  University of Information Technology{' '}
                </Text>
                <Text style={styles.Body}>Ho Chi Minh city.{'\n'}</Text>
                <Text style={styles.Body}>
                  This application is our 1st project, developed under the
                  guidance of our instructor,{' '}
                </Text>
                <Text style={styles.imBody}>Nguyen Tan Tran Minh Khang.</Text>
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.Heading}>About this app</Text>
              <Text style={styles.Body}>
                {
                  'Sharehoi is an application developed for everyone to apply Artificial Intelligience to real life. The main problem is "Car Detection". Nonetheless, we have tried to develop more interesting functions for you such as: "Realtime Car Model Classification", "Car Model Detection". These functions are developed based on YOLO and ResNet model.'
                }
              </Text>
              <View style={{height: scale(35, 'h')}} />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: APP_COLORS.primaryColor,
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
  },
  Heading: {
    color: 'white',
    fontSize: scale(36, 'w'),
    fontFamily: CUSTOM_FONTS.bold,
  },
  Body: {
    color: 'white',
    fontSize: scale(14, 'w'),
    fontFamily: CUSTOM_FONTS.medium,
    textAlign: 'justify',
  },
  imBody: {
    color: 'white',
    fontSize: scale(14, 'w'),
    fontFamily: CUSTOM_FONTS.bold,
    textAlign: 'justify',
  },
  Body: {
    color: 'white',
    fontSize: scale(14, 'w'),
    fontFamily: CUSTOM_FONTS.medium,
    textAlign: 'justify',
  },
  textContainer: {
    margin: scale(20, 'w'),
  },
});
