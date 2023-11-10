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
//import {detectObjects} from './ObjectDetection';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import APP_MODELS from '../constants/models';

export default async function CarClassification(image) {
  const predictRt = await MobileModel.execute(APP_MODELS.MODEL_Classifier, {
    image,
  });
  image.release();
  return APP_MODELS.classes[predictRt.result.maxIdx];
  //   setClassObj2(topclassRt);
  //   const min = 1;
  //   const max = 100;
  //   const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  //   //console.log('random: ', randomNumber);
  //   setWidthObj(randomNumber);
  //console.log('predict: ', topclassRt);
  //   image.release();
}
