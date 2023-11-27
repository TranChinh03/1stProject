// import {Text, StyleSheet, View} from 'react-native';
import {Component} from 'react';
// import {SafeAreaProvider} from 'react-native-safe-area-context';

import * as React from 'react';
import {
  Camera,
  Canvas,
  CanvasRenderingContext2D,
  MobileModel,
} from 'react-native-pytorch-core';
import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
//import useModel from './useModel';
//import {detectObjects} from './CarClassification';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import useModel from '../src/useModel';
import LoadingScreens from './LoadingScreens';
import {useNavigation} from '@react-navigation/native';
import scale from '../src/constants/responsive';
import BackButton from '../src/components/buttonBack';
import {IC_History} from '../src/assets/icons';
import CUSTOM_FONTS from '../src/constants/fonts';
import CUSTOM_COLORS from '../src/constants/color';

// const MODEL =
//   'https://drive.google.com/file/d/1epJz59_D6LCDRg6cqUVN8u-et7rEwVSC/view?usp=share_link';
const MODEL = require('../src/model/bestYolov5Gh.torchscript.ptl');
//const MODEL = require('../src/model/best.torchscript.ptl');
const MODEL_Classifier = require('../src/model/car_classification_model.ptl');
const classes = require('../src/model/class.json');

function CarClassification({navigation}) {
  //state for classification
  const [classObj, setClassObj] = React.useState('');
  const [classObj2, setClassObj2] = React.useState('');
  const [widthObj, setWidthObj] = React.useState(50);

  // Insets to respect notches and menus to safely render content
  const insets = useSafeAreaInsets();
  // Load model from a given url.
  const {isReady, model} = useModel(MODEL);
  // console.log('download model: ', model);
  //const {isReady2, model2} = useModel(MODEL);
  // Indicates an inference in-flight
  const [isProcessing, setIsProcessing] = React.useState(false);
  const context2DRef = React.useRef<CanvasRenderingContext2D | null>(null);
  async function CarClassification(image) {
    const predictRt = await MobileModel.execute(MODEL_Classifier, {
      image,
    });

    let topclassRt = classes[predictRt.result.maxIdx];
    setClassObj2(topclassRt);
    const min = 1;
    const max = 100;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    //console.log('random: ', randomNumber);
    setWidthObj(randomNumber);
    //console.log('predict: ', topclassRt);
    image.release();
  }
  const CarDetection = React.useCallback(
    async image => {
      // Show feedback to the user if the model hasn't loaded. This shouldn't
      // happen because the isReady variable is only true when the model loaded
      // and isReady. However, this is a safeguard to provide user feedback in
      // unknown edge cases ;)
      if (model == null || MODEL_Classifier == null) {
        Alert.alert('Model not loaded', 'The model has not been loaded yet');
        return;
      }

      const ctx = context2DRef.current;
      if (ctx == null) {
        Alert.alert('Canvas', 'The canvas is not initialized');
        return;
      }

      // Show activity view
      setIsProcessing(true);

      // Clear previous result
      ctx.clear();
      await ctx.invalidate();

      // classification car
      const predict = await MobileModel.execute(MODEL_Classifier, {
        image,
      });
      let topclass = classes[predict.result.maxIdx];
      setClassObj(topclass);
      const min = 1;
      const max = 100;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log('random: ', randomNumber);
      setWidthObj(randomNumber);
      console.log('predictCapture: ', topclass);
      //image.release();

      // Detect objects in image
      const results = await detectObjects(model, image);

      // Draw image scaled by a factor or 2.5
      const scale = 2.5;
      const width = image.getWidth();
      const height = image.getHeight();
      ctx.drawImage(image, 0, 0, width / scale, height / scale);

      // Draw bounding boxes and label on top of image, also scaled
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'red';
      ctx.font = '16px sans-serif';
      ctx.lineWidth = 3;
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        ctx.beginPath();
        const rect = result.rect;
        const left = rect[0] / scale;
        const top = rect[1] / scale;
        const right = rect[2] / scale;
        const bottom = rect[3] / scale;
        ctx.rect(left, top, right - left, bottom - top);
        ctx.stroke();

        const label = classObj;
        console.log(label);
        ctx.fillText(label, left, top);
      }

      // Paint canvas and wait for completion
      await ctx.invalidate();

      // Release image from memory
      await image.release();

      // Hide activity view
      setIsProcessing(false);
    },
    [model, setIsProcessing],
  );
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
        <Text style={styles.result}>{classObj2}</Text>
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
