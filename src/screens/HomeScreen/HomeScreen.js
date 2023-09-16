import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';


import HomeScreenStyle from './HomeScreenStyle';
import Button from '../../components/common/Button';







const HomeScreen = () => {




  return (


    <SafeAreaView style={HomeScreenStyle.container}>
    <View style={HomeScreenStyle.view1}>

          <Button disabled = {false}   btntext="Homescreen" />
      </View>
    </SafeAreaView>


  );
};

export default HomeScreen;
