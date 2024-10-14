import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View,ToastAndroid} from 'react-native';
import AccountSetupStyle from './AccountSetupStyle';
import HeadingDesc from '../../components/molecules/HeadingDesc';
import HeadingBox from '../../components/molecules/HeadingBox';
import Button from '../../components/common/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosrequest} from '../../assets/utils/handler';
import Toast from 'react-native-toast-message'; 
import {jwtDecode} from 'jwt-decode';
// import {  StyleSheet } from 'react-native';

// import "core-js/stable/atob"; // <- polyfill here

import {decode} from 'base-64';
global.atob = decode;
const AccountSetup = props => {

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  // const showToast = message => {
  //   ToastAndroid.show(message, ToastAndroid.SHORT);
  // };
 

const showToastNew = (type, heading, message) => {
   if (message && message.trim() !== "") {
      Toast.show({
        type: type,       // Can be 'success', 'error', 'info', etc.
        text1: heading,   // Main heading of the toast
        text2: message    // Detailed message of the toast
      });
    } else {
      Toast.show({
        type: 'error',    // Default type if message is empty
        text1: "Error",   // Default heading
        text2: "Something went wrong!" // Default message
      });
    }
  };


 

  const [userinfo, setUserinfo] = useState({});


  const loadUserInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userinfo');

      console.log(jsonValue, 'USERINFO in account setup');

      if (jsonValue != null) {
        setUserinfo(JSON.parse(jsonValue));
      }

   
    } catch (e) {
      // error reading value
      console.error(e);
    }
  };


  const updateUserdata = (key, value) => {
    setUserinfo(prevState => {
      return {
        ...prevState, // Spread the previous state to maintain other key-value pairs
        [key]: value, // Update the specific key with the new value
      };
    });

    console.log(userinfo, 'user DATAA');
  };

  const onPhoneChange = text => {
    console.log('phone change! in account setup ' + text);
    updateUserdata('mobile', text);
  };

  const onNameChange = text => {
    console.log('name change! in account setup ' + text);
    updateUserdata('name', text);
  };

  const onAgencyChange = text => {
    console.log('name change! in account setup ' + text);
    updateUserdata('agency_name', text);
  };

  const onDone = async value => {
    try {
      const jsonValue = JSON.stringify(userinfo);
      await AsyncStorage.setItem('userinfo', jsonValue);
      console.log('Done and user data saved!! ');
      updateProfile();
    } catch (e) {
      // saving error
      console.log('error occured!! ');
      console.log(e);
    }
  };

  const updateProfile = async () => {
    console.log('CALLING update profile API');
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'DrawerPage' }],
    });
    try {
      // Block of code to try
      let endpoint = `/update-profile`;
      const res = await axiosrequest(
        'put',
        {
          mobile: userinfo.mobile,
          email: userinfo.email,
          name: userinfo.name,
          agency_name: userinfo.agency_name,
        },
        endpoint,
      );

      console.log('Response got in update  profile--> ', res.data);

      if (res != '' && res.status == 200) {
        console.log("inside success 200 response");

        const decoded = jwtDecode(res?.data?.token);

        console.log(decoded, 'DECODED IN UPDATE PROFILE TOKEN');
        decoded["token"] = res?.data?.token ;


        const jsonValue = JSON.stringify(decoded);
        await AsyncStorage.setItem('userinfo', jsonValue);
        // showToast('Success in updating token!');

        // showToast(res?.data?.message);
        showToastNew('success', 'Success', 'Token updated successfully!');
        showToastNew('info', 'Info', res?.data?.message);
  


        props.navigation.reset({
          index: 0,
          routes: [{ name: 'DrawerPage' }],
        });
      
      } else {
        console.log("inside else sccount setup  of 200 response");
        // showToast("Some error occurred");
        showToastNew('error', 'Error', "Some error occurred");

        // showToast(res?.data?.message);
      }
    } catch (err) {
      // Block of code to handle errors
      // showToast("Some error occurred");
      showToastNew('error', 'Error', "Some error occurred");

      console.log(err, 'catch block of api');
    }
  };

  useEffect(() => {
    console.log(userinfo, 'USEEFFECT UERS INF');
    loadUserInfo();

  }, []);






  return (
    <SafeAreaView style={AccountSetupStyle.container}>
      <View style={AccountSetupStyle.view1}>
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
          <HeadingDesc props={props} mainCtn={AccountSetupStyle.headingCtn} />

          <HeadingBox
            props={props}
            headingText={'Name'}
            inputplaceholder={'Enter name'}
            onInputChange={onNameChange}
            containerstyle={AccountSetupStyle.fieldCtn}
          />

          <HeadingBox
            props={props}
            headingText={'Phone no.'}
            inputplaceholder={'Enter phone number'}
            onInputChange={onPhoneChange}
            containerstyle={AccountSetupStyle.fieldCtn}
            keyboardtype='phone-pad'
          />

          <HeadingBox
            props={props}
            headingText={'Agency Name'}
            inputplaceholder={'Enter Agency Name '}
            onInputChange={onAgencyChange}
            containerstyle={AccountSetupStyle.fieldCtn}
          />
        </ScrollView>
      </View>

      <View style={AccountSetupStyle.view2}>
        <Button
          onclick={onDone}
          disabled={
            userinfo.name != '' &&     
            userinfo.phone != '' &&
            userinfo.agencyname != ''
              ? false
              : true
          }
          btntext="Done"
          buttonctn={AccountSetupStyle.buttonCtn}
        />
      </View>
    </SafeAreaView>
  );
};

export default AccountSetup;
