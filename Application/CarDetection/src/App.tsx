//RUN THIS FIRST
// set NODE_OPTIONS=--openssl-legacy-provider

import * as React from 'react';
import {
  Camera,
  Canvas,
  CanvasRenderingContext2D,
  MobileModel,
} from 'react-native-pytorch-core';
import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import useModel from './useModel';
import {detectObjects} from './ObjectDetection';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

// const MODEL =
//   'https://drive.google.com/file/d/1epJz59_D6LCDRg6cqUVN8u-et7rEwVSC/view?usp=share_link';
const MODEL = require('./bestYolov5Gh.torchscript.ptl');
const MODEL_Classifier = require('./classification/car_classification_model.ptl');
const classes = require('./classification/class.json');

function ObjectDetection() {
  //state for classification
  const [classObj, setClassObj] = React.useState('');
  const [widthObj, setWidthObj] = React.useState(50);

  // Insets to respect notches and menus to safely render content
  const insets = useSafeAreaInsets();
  // Load model from a given url.
  const {isReady, model} = useModel(MODEL);
  //const {isReady2, model2} = useModel(MODEL);
  // Indicates an inference in-flight
  const [isProcessing, setIsProcessing] = React.useState(false);
  const context2DRef = React.useRef<CanvasRenderingContext2D | null>(null);

  const handleImage = React.useCallback(
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
      console.log('predict: ', topclass);
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

        const label = result.label;
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
        <ActivityIndicator size="small" color="tomato" />
        <Text style={styles.loadingText}>Loading YOLOv5 Model</Text>
        <Text>~28.1 MB</Text>
      </View>
    );
  }

  return (
    <View style={insets}>
      <Camera style={styles.camera} onCapture={handleImage} />
      <View style={styles.canvas}>
        <Canvas
          style={StyleSheet.absoluteFill}
          onContext2D={ctx => {
            context2DRef.current = ctx;
          }}
        />
        <Text>{classObj}</Text>
      </View>
      {isProcessing && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="small" color="tomato" />
          <Text style={styles.activityIndicatorLabel}>Detecting objects</Text>
        </View>
      )}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ObjectDetection />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
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
    height: '50%',
    width: '100%',
  },
  canvas: {
    backgroundColor: 'black',
    height: '50%',
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
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
