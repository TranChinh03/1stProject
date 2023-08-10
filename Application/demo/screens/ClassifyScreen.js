import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator, 
  Button
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {custom_styles} from '../src/constants/style';
import CUSTOM_COLORS from '../src/constants/color';
import APP_COLORS from '../src/constants/appcolors';
import scale from '../src/constants/responsive';
import {IC_Car} from '../src/assets/icons';
import {launchImageLibrary} from 'react-native-image-picker';
import {IMG_CAR} from '../src/assets/imgs';
import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as cocossd from '@tensorflow-models/coco-ssd'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as jpeg from 'jpeg-js'
import { useNavigation } from '@react-navigation/native';

const ClassifyScreen = () => {
  const navigation = useNavigation();
  const [isTfReady, setIsTfReady] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [result, setResult] = useState('');
  const [pickedImage, setPickedImage] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      if (result.uri.slice(-4) === "jpeg" || result.uri.slice(-3) === "jpg") {
        setPickedImage(result.uri);
        setIsStarted(true);
      }
      else
      {
        Alert.alert('Error', 'Vui lòng tải ảnh định dạng JPEG (.JPG)!')
        setIsStarted(false)
      }
    }
  };

  const classifyUsingMobilenet = async () => {
  try {
    // Load mobilenet.
    await tf.ready();
    const model = await mobilenet.load();
    setIsTfReady(true);
    console.log("starting inference with picked image: " + pickedImage)

    // Convert image to tensor
    const imgB64 = await FileSystem.readAsStringAsync(pickedImage, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer)
    const imageTensor = decodeJpeg(raw);
    // Classify the tensor and show the result
    const prediction = await model.classify(imageTensor);
    if (prediction && prediction.length > 0) {
      setResult(
        `${prediction[0].className} (${prediction[0].probability.toFixed(3)})`
      );
      setIsStarted(false);
      navigation.navigate('Result', {imgPath: pickedImage, result: `${prediction[0].className} (${prediction[0].probability.toFixed(3)})`})
    }
  } 
  catch (err) {
    console.log(err);
    }
  };
  useEffect(() => {
    classifyUsingMobilenet()
  }, [pickedImage]);

  return (
    <SafeAreaView style={custom_styles.mainContainer}>
      {!isTfReady && 
      <View style={styles.container1}>
        <Text style={{textAlign: 'center'}}>Loading TFJS model...</Text>
      </View>}
      {isTfReady && <View style={styles.container1}>
        <Text
          style={[
            custom_styles.txtDiscription,
            {color: APP_COLORS.primaryColor},
          ]}>
          {'Choose an image of the car\n from your device'}
        </Text>
      </View>}
      <View style={styles.container1} ></View>
      <View style={styles.container2}>
        {isTfReady && !isStarted && <TouchableOpacity
          style={styles.btnImport}
          onPress={pickImage}>
          <IC_Car style={{alignSelf: 'center'}} />
        </TouchableOpacity>}
        {isTfReady && !isStarted && <Text
          style={[
            custom_styles.txtDiscription,
            {color: APP_COLORS.primaryColor},
          ]}>
          Import image
        </Text>}
        <Image
            source={{ uri: pickedImage }}
            style={{width: 200, height: 200, alignSelf: 'center' }}
          />
      </View>

      <View style={styles.container1}>
            {isStarted && isTfReady && <Text style={[
              custom_styles.txtDiscription,
              {color: APP_COLORS.primaryColor},
            ]}>Processing...</Text>}
            {isStarted && isTfReady && <ActivityIndicator size="large" color={APP_COLORS.primaryColor} />}
      </View>
    

    </SafeAreaView>
  );

}

export default ClassifyScreen

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    //backgroundColor: 'red',
    justifyContent: 'flex-end',
  },
  container2: {
    flex: 3,
    justifyContent: 'flex-start',
  },
  btnImport: {
    height: scale(125, 'w'),
    width: scale(125, 'w'),
    borderRadius: scale(125 / 2, 'w'),
    backgroundColor: APP_COLORS.primaryColor,
    alignSelf: 'center',
    marginBottom: scale(20, 'h'),
    justifyContent: 'center',
  },
});
