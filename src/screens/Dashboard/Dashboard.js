import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../HomeScreen/HomeScreen';
import AccountSetup from '../AccountSetup/AccountSetup';

//screens

//icons
import HomeIcon from '../../assets/images/tabbar/HomeIcon';
import PortfolioIcon from '../../assets/images/tabbar/PortfolioIcon';
import WatchlistIcon from '../../assets/images/tabbar/WatchlistIcon';
import BellIcon from '../../assets/images/tabbar/BellIcon';
import MessageIcon from '../../assets/images/tabbar/MessageIcon';
import MessageActive from '../../assets/images/tabbar/MessageActive';

//active~
import HomeActive from '../../assets/images/tabbar/homeActive.svg';
import PortFolioActive from '../../assets/images/tabbar/portfolioActive.svg';
import WatchlistActive from '../../assets/images/tabbar/watchlistActive.svg';
import BellActive from '../../assets/images/tabbar/bellActive.svg';
import Notification from '../../components/molecules/Notification';
import PolicyCenter from '../PolicyCenter/PolicyCenter';
import MessageScreen from '../MessageScreen/MessageScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const tabHeight = windowHeight * (10 / 100);

const Tab = createBottomTabNavigator();

const DashBoard = props => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#ffffff',
        tabBarShowLabel: false,
        keyboardHidesTabBar: false,
        tabBarStyle: {
          borderTopWidth: 0,
          position: 'absolute',
          height: tabHeight,
          borderStyle: 'solid',
          borderColor: '#E2E2E2',
          overflow: 'visible',
          elevation: 20,
          shadowColor: '#000000',
          shadowOpacity: 0.8,
          shadowRadius: 2,
          shadowOffset: {
            height: 2,
            width: 2,
          },
        },
      }}>
      <Tab.Screen
        name="Home"
        children={() => <HomeScreen props={props} />}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <HomeActive />;
            } else {
              return <HomeIcon />;
            }
          },
        }}
      />

      {/* <Tab.Screen
        name="Portfolio"
        children={() => <AccountSetup props={props} />}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <PortFolioActive />;
            } else {
              return <PortfolioIcon />;
            }
          },
        }}
      /> */}

      <Tab.Screen
        name="HomeScreen"
        children={() => <PolicyCenter props={props} />}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <WatchlistActive />;
            } else {
              return <WatchlistIcon />;
            }
          },
        }}
      />
      <Tab.Screen
        name="Notification"
        children={() => <Notification props={props} />}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <BellActive />;
            } else {
              return <BellIcon />;
            }
          },
        }}
      />
      <Tab.Screen
        name="MessageScreen"
        children={() => <MessageScreen props={props} />}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <MessageActive />;
            } else {
              return <MessageIcon />;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default DashBoard;
