import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen.js';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AccountSetup from '../screens/AccountSetup/AccountSetup.js';
import DashBoard from '../screens/Dashboard/Dashboard.js';





const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right' }}>


      <Stack.Screen name="DashBoard" component={DashBoard} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />



    </Stack.Navigator>
  );
};

export default AppStack;