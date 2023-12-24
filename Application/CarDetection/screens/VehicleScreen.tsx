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
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
//import useModel from './useModel';
//import {detectObjects} from './ObjectDetection';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import useModel from '../src/useModel';
import {detectObjects} from '../src/ObjectDetection';
import LoadingScreens from './LoadingScreens';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../src/components/buttonBack';
import CUSTOM_FONTS from '../src/constants/fonts';
import scale from '../src/constants/responsive';
import {IC_Close, IC_History, IC_Save} from '../src/assets/icons';
import CUSTOM_COLORS from '../src/constants/color';

const MODEL = require('../src/model/best.torchscript.ptl');
const classes = require('../src/model/CocoClasses.json');

function ObjectDetection({navigation}) {
  const [heightCam, setHeightCam] = React.useState('90%');
  const [showResult, setShowResult] = React.useState(false);
  //state for classification
  const [classObj, setClassObj] = React.useState('');

  // Insets to respect notches and menus to safely render content
  const insets = useSafeAreaInsets();
  // Load model from a given url.
  const {isReady, model} = useModel(MODEL);
  // Indicates an inference in-flight
  const [isProcessing, setIsProcessing] = React.useState(false);
  const context2DRef = React.useRef<CanvasRenderingContext2D | null>(null);

  const CarDetection = React.useCallback(
    async image => {
      setHeightCam('50%');

      if (model == null) {
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

      // // classification car
      // const predict = await MobileModel.execute(MODEL_Classifier, {
      //   image,
      // });
      // let topclass = classes[predict.result.maxIdx];
      // console.log('index class: ', topclass);
      // console.log('predict class: ', predict);
      // console.log('predict class: ', predict);
      // setClassObj(topclass);
      // console.log('predictCapture: ', classes);
      // //image.release();

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

        const label = result.label;
        console.log('label: ', label);
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
  if (!isReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={CUSTOM_COLORS.Marianblue} />
        <Text style={styles.loadingText}>Loading Model</Text>
        <Text>~23.0MB</Text>
      </View>
      // <LoadingScreens />
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton
          style={styles.btnContainer}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.txtContainer}>
          <Text style={styles.txtHeader}>DETECT VEHICLE</Text>
          <Text style={styles.txtSubHeader}>
            Take a photo to detect all vehicles
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <IC_History />
        </View>
      </View>
      <Camera style={{height: heightCam}} onCapture={CarDetection} />
      {/* {showResult ? ( */}
      <View style={styles.resultContainer}>
        <TouchableOpacity
          style={styles.btnResultContainer}
          onPress={() => setHeightCam('90%')}>
          <IC_Close />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnResultContainer}>
          <IC_Save />
        </TouchableOpacity>
      </View>
      <View style={styles.canvas}>
        <Canvas
          style={StyleSheet.absoluteFill}
          onContext2D={ctx => {
            context2DRef.current = ctx;
          }}
        />
      </View>
      {/* ) : null} */}
      {isProcessing && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={CUSTOM_COLORS.Lightcyan} />
          <Text style={styles.activityIndicatorLabel}>Detecting vehicle</Text>
        </View>
      )}
    </View>
  );
}

export default class DetectScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaProvider>
        <ObjectDetection navigation={this.props.navigation} />
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
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
    height: '75%',
    width: '100%',
  },
  canvas: {
    backgroundColor: 'black',
    height: '50%',
    width: '100%',
  },
  loading: {
    alignItems: 'center',
    backgroundColor: 'white',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  loadingText: {
    fontSize: scale(24, 'w'),
    fontWeight: 'bold',
    marginTop: 10,
    color: CUSTOM_COLORS.Marianblue,
  },
  result: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 20,
  },
  resultContainer: {
    marginVertical: scale(10, 'w'),
    // alignItems: 'flex-end',
    // alignSelf: 'flex-end',
    // position: 'absolute', //Here is the trick
    // bottom: 20,
    // right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(25, 'w'),
  },
  btnResultContainer: {
    height: scale(50, 'w'),
    width: scale(50, 'w'),
    borderRadius: scale(50, 'w'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
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
    flex: 0.5,
    alignItems: 'center',
  },
});
