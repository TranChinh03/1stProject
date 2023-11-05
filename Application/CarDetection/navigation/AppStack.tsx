import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useNavigation} from '@react-navigation/native';

import {View, StyleSheet, Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import LoadingScreens from '../screens/LoadingScreens';
import ClassifyScreen from '../screens/ClassifyScreen';
import ResultScreen from '../screens/ResultScreen';
import {IMG_CAR, IMG_CAR01164} from '../src/assets/imgs';
import {MyStackParamList} from './type';

// type RootStackParamList = {
//   Home: undefined;
//   Login: undefined;
//   MemberDashboard: NavigatorScreenParams<MemberDashboarDrawerParamList>;
// };
const Stack = createNativeStackNavigator();
export default function AppStack() {
  //const navigation = useNavigation();

  //   const [initializing, setInitializing] = useState(true);
  //   const [user, setUser] = useState();

  //   function onAuthStateChanged(user) {
  //     setUser(user);
  //     if (initializing) setInitializing(false);
  //   }

  //   useEffect(() => {
  //     const subcriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
  //     // console.log(user);
  //     return subcriber;
  //   }, [user]);

  //   if (initializing) return null;

  //   if (!user) {
  return (
    <Stack.Navigator initialRouteName="Loading">
      <Stack.Screen
        name="Loading"
        component={LoadingScreens}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Classify"
        component={ClassifyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{headerShown: false}}
        initialParams={{imgPath: IMG_CAR01164}}
      />
    </Stack.Navigator>
  );
}
