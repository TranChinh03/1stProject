import {Component} from 'react';

import * as React from 'react';
import {Camera, MobileModel} from 'react-native-pytorch-core';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import scale from '../src/constants/responsive';
import BackButton from '../src/components/buttonBack';
import {IC_History} from '../src/assets/icons';
import CUSTOM_FONTS from '../src/constants/fonts';
import CUSTOM_COLORS from '../src/constants/color';

const MODEL_Classifier = require('../src/model/car_classification_model.ptl');
const classes = require('../src/model/class.json');

function CarClassification({navigation}) {
  //state for classification
  const [classObj, setClassObj] = React.useState('');

  async function CarClassification(image) {
    const predictRt = await MobileModel.execute(MODEL_Classifier, {
      image,
    });

    let topclassRt = classes[predictRt.result.maxIdx];
    setClassObj(topclassRt);
    image.release();
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <BackButton
          style={styles.btnContainer}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.txtContainer}>
          <Text style={styles.txtHeader}>CAR CLASSIFICATION</Text>
          <Text style={styles.txtSubHeader}>
            This function classifies cars in real time
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <IC_History />
        </View>
      </View>
      <Camera
        style={styles.camera}
        hideCaptureButton={true}
        onFrame={CarClassification}
      />

      <View style={styles.resultContainer}>
        <Text style={styles.result}>{classObj}</Text>
      </View>
    </View>
  );
}

export default class ModelScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaProvider>
        <CarClassification navigation={this.props.navigation} />
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  activityIndicatorContainer: {
    alignItems: 'center',
    backgroundColor: 'black',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  activityIndicatorLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  camera: {
    height: '70%',
    width: '100%',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  result: {
    color: CUSTOM_COLORS.Marianblue,
    fontSize: scale(20, 'w'),
    fontFamily: CUSTOM_FONTS.medium,
    textAlign: 'center',
    paddingHorizontal: scale(15, 'w'),
  },
  resultContainer: {
    height: '10%',
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: scale(50, 'w'),
    marginBottom: scale(15, 'h'),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: scale(10, 'w'),
  },
  txtHeader: {
    color: 'white',
    textAlign: 'center',
    fontFamily: CUSTOM_FONTS.bold,
    fontSize: scale(24, 'w'),
  },
  txtSubHeader: {
    color: 'white',
    textAlign: 'center',
  },
  txtContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    flex: 0.4,
    alignItems: 'center',
  },
});
