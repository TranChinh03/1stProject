import {Component, useRef} from 'react';

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
import {
  IC_Close,
  IC_History,
  IC_Post,
  IC_Save,
  IC_Share,
} from '../src/assets/icons';
import CUSTOM_COLORS from '../src/constants/color';
import {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';
import CameraRoll from '@react-native-community/cameraroll';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';

const MODEL = require('../src/model/best.torchscript.ptl');
const classes = require('../src/model/CocoClasses.json');

function ObjectDetection({navigation}) {
  // create a ref
  const viewRef = useRef();

  // download image
  const downloadImage = async () => {
    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });
      console.log(uri);

      // cameraroll saves image
      const image = CameraRoll.save(uri, 'photo');
      if (image) {
        Alert.alert(
          '',
          'Image saved successfully.',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  // Share image
  const shareImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });
      console.log('uri', uri);
      const shareResponse = await Share.open({
        message:
          'My interesting exploration with ShareHoi.\nDownload Sharehoi at: https://bit.ly/ShareHoi',
        url: uri,
      });
      console.log('shareResponse', shareResponse);
    } catch (error) {
      console.log('error', error);
    }
  };

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
      setHeightCam('0%');

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

      // Detect objects in image
      const results = await detectObjects(model, image);

      // Draw image scaled by a factor or 2.5
      const scale = 1;
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
        {/* <View style={styles.btnContainer}>
          <IC_Post />
        </View> */}
      </View>
      <Camera style={{height: heightCam}} onCapture={CarDetection} />
      <View style={styles.resultContainer}>
        <TouchableOpacity
          style={styles.btnResultContainer}
          onPress={() => setHeightCam('90%')}>
          <IC_Close />
        </TouchableOpacity>
        <View style={styles.rightButton}>
          <TouchableOpacity
            style={styles.btnResultContainer}
            onPress={shareImage}>
            <IC_Share />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnResultContainer}
            onPress={downloadImage}>
            <IC_Save />
          </TouchableOpacity>
        </View>
      </View>
      <ReactNativeZoomableView
        maxZoom={30}
        contentWidth={300}
        contentHeight={150}
        ref={viewRef}>
        <Canvas
          //style={StyleSheet.absoluteFill}
          style={styles.imgResult}
          onContext2D={ctx => {
            context2DRef.current = ctx;
          }}
        />
      </ReactNativeZoomableView>
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
  imgResult: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
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
    marginLeft: scale(25, 'w'),
  },
  rightButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
