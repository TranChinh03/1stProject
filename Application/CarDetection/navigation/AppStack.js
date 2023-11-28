import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoadingScreens from '../screens/LoadingScreens';
import ClassifyScreen from '../screens/ClassifyScreen';
import ModelScreen from '../screens/ModelScreen';
import HomeScreen from '../screens/HomeScreen';
import IntroduceScreen from '../screens/IntroduceScreen';
import DetectScreen from '../screens/DetectScreen';
import VehicleScreen from '../screens/VehicleScreen';

const Stack = createNativeStackNavigator();
export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Loading">
      <Stack.Screen
        name="Loading"
        component={LoadingScreens}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Classify"
        component={ClassifyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detect"
        component={DetectScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Vehicle"
        component={VehicleScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Model"
        component={ModelScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Intro"
        component={IntroduceScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
