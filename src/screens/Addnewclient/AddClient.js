import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View,Text} from 'react-native';
import HeadingDesc from '../../components/molecules/HeadingDesc';
import HeadingBox from '../../components/molecules/HeadingBox';
import Button from '../../components/common/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddclientStyle from './AddclientStyle';
import TopBack from '../../components/molecules/TopBack';
import Radiobutton from '../../components/common/Radiobutton';

const AddClient = (props) => {
  console.log(props, 'PROPS IN ADD CLIENT');

  return (
    <SafeAreaView style={AddclientStyle.container}>

            <TopBack/>

            <ScrollView>

           
            <View style={AddclientStyle.contentCtn}>
                <Radiobutton radioheading='Enter new client details'  btn1heading='Multiple clients' btn2heading='Single client'/>

                <HeadingBox headingText="Phone no."  inputplaceholder='Enter Phone' />

                <HeadingBox headingText="Email ID"  inputplaceholder='Enter Email' />


                <HeadingBox headingText="Age"  inputplaceholder='Enter Age' />


                <HeadingBox headingText="Profession"  inputplaceholder='Enter Profession' />


                <HeadingBox headingText="Address"  inputplaceholder='Enter Address' />

            </View>
            </ScrollView>

            <View style={AddclientStyle.view2}>
            <Button
              disabled={false}
              btntext="Add new policy details"
              buttonctn={AddclientStyle.buttonCtn}
              onclick={() => {
              }}
            />
          </View>
    </SafeAreaView>
  );
};

export default AddClient;
