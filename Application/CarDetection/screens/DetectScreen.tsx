import {Component, useRef, useState, useCallback} from 'react';
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
  PermissionsAndroid,
  Platform,
  Animated,
  Modal,
  Image,
  Pressable,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import useModel from '../src/useModel';
import {detectObjects} from '../src/ObjectDetection';
import BackButton from '../src/components/buttonBack';
import CUSTOM_FONTS from '../src/constants/fonts';
import scale from '../src/constants/responsive';
import {IC_Close, IC_History, IC_Save} from '../src/assets/icons';
import CUSTOM_COLORS from '../src/constants/color';

import {captureRef} from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
//import Share from 'react-native-share';

const MODEL = require('../src/model/car_detection_yolov5s.ptl');
const MODEL_Classifier = require('../src/model/car_classification_model.ptl');
const classes = require('../src/model/class.json');

function ObjectDetection({navigation}) {
  // zoom
  const [uriImg, setUriImg] = useState('');
  const [dialog, setDialog] = useState(false);

  // create a ref
  const viewRef = useRef();

  // get permission on android
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        '',
        'Your permission is required to save images to your device',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } catch (err) {
      // handle error as you please
      console.log('err', err);
    }
  };

  // download image
  const downloadImage = async () => {
    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });
      setUriImg(uri);

      // if (Platform.OS === 'android') {
      //   const granted = await getPermissionAndroid();
      //   if (!granted) {
      //     return;
      //   }
      // }

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

  // const shareImage = async () => {
  //   try {
  //     const uri = await captureRef(viewRef, {
  //       format: 'png',
  //       quality: 0.8,
  //     });
  //     console.log('uri', uri);
  //     const shareResponse = await Share.open({url: uri});
  //     console.log('shareResponse', shareResponse);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  const [heightCam, setHeightCam] = useState('90%');
  //state for classification
  const [classObj, setClassObj] = useState('');

  // Insets to respect notches and menus to safely render content
  // Load model from a given url.
  const {isReady, model} = useModel(MODEL);
  // Indicates an inference in-flight
  const [isProcessing, setIsProcessing] = useState(false);
  const context2DRef = useRef<CanvasRenderingContext2D | null>(null);

  const CarDetection = useCallback(
    async image => {
      setHeightCam('0%');

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
      console.log('predictCapture: ', topclass);
      //image.release();

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
  if (!isReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={CUSTOM_COLORS.Marianblue} />
        <Text style={styles.loadingText}>Loading Model</Text>
        <Text>~27.0MB</Text>
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
          <Text style={styles.txtHeader}>DETECT CAR</Text>
          <Text style={styles.txtSubHeader}>
            Take a photo to detect the car
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <IC_History />
        </View>
      </View>
      <Camera style={{height: heightCam}} onCapture={CarDetection} />
      <View style={styles.resultContainer}>
        <TouchableOpacity
          style={styles.btnResultContainer}
          onPress={() => setHeightCam('90%')}>
          <IC_Close />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnResultContainer}
          onPress={downloadImage}>
          <IC_Save />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.canvas}
        ref={viewRef}
        onPress={() => setDialog(true)}>
        <Canvas
          //style={StyleSheet.absoluteFill}
          style={styles.imgResult}
          onContext2D={ctx => {
            context2DRef.current = ctx;
          }}
        />
      </TouchableOpacity>
      {isProcessing && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={CUSTOM_COLORS.Lightcyan} />
          <Text style={styles.activityIndicatorLabel}>Detecting car</Text>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={dialog}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          //setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{borderWidth: 5, flexShrink: 1, height: 1000, width: 400}}>
              <ReactNativeZoomableView
                maxZoom={30}
                contentWidth={300}
                contentHeight={150}>
                <Image
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                  source={{uri: 'https://via.placeholder.com/400x200.png'}}
                />
              </ReactNativeZoomableView>
            </View>
            <TouchableOpacity
              style={styles.btnResultContainer}
              onPress={() => setDialog(false)}>
              <IC_Close />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  imgResult: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
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
    backgroundColor: 'red',
    height: '100%',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 20,
    // /padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
