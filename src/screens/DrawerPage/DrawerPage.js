import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import DashBoard from '../Dashboard/Dashboard';
import CustomDrawer from '../../components/molecules/CustomDrawer';
import { Bank, Help, Home } from '../../assets/svgs/SvgImages';
import { Colors } from '../../assets/colors';

const DrawerPage = props => {
  const Drawer = createDrawerNavigator();

  console.log('INSIDE DRAWER');
  return (
    <Drawer.Navigator
      initialRouteName="DashBoard"
      drawerContent={props => <CustomDrawer {...props} />}

      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.activeprimary,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          // marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}
      
      >


      <Drawer.Screen name="DashBoard" component={DashBoard} options={{
          drawerIcon: ({color}) => (
            <Home color={color} />
          ),
        }} />
      {/* <Drawer.Screen name="Pricing" component={PricingScreen}  options={{
          drawerIcon: ({color}) => (
            <Bank color={color} />
          ),
        }}/>
      <Drawer.Screen name="Help" component={HelpScreen}  options={{
          drawerIcon: ({color}) => (
            <Help color={color} />
          ),
        }}/> */}

      
    </Drawer.Navigator>
  );
};

function HelpScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function PricingScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

export default DrawerPage;
