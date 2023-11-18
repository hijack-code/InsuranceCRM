import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import AccountSetupStyle from './AccountSetupStyle';
import HeadingDesc from '../../components/molecules/HeadingDesc';
import HeadingBox from '../../components/molecules/HeadingBox';
import Button from '../../components/common/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountSetup = props => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const [userinfo, setUserinfo] = useState({
    name: '',
    phone: 0,
    agencyname: false,
    email: '',
  });

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
    updateUserdata('phone', text);
  };

  const onNameChange = text => {
    console.log('name change! in account setup ' + text);
    updateUserdata('name', text);

  };

  const onAgencyChange = text => {
    console.log('name change! in account setup ' + text);
    updateUserdata('agencyname', text);

  };



  const onDone = async (value) => {
    try {
      const jsonValue = JSON.stringify(userinfo);
      await AsyncStorage.setItem('userinfo', jsonValue);
      console.log('Done and user data saved!! ');
      props.navigation.navigate('DashBoard');

    } catch (e) {
      // saving error
      console.log('error occured!! ');
      console.log(e);
    }
  };




  useEffect(() => {

      console.log(userinfo , "USEEFFECT UERS INF")


  },[userinfo])


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
          disabled={userinfo.name != '' && userinfo.phone != '' && userinfo.agencyname !='' ? false : true}
          btntext="Done"
          buttonctn={AccountSetupStyle.buttonCtn}
        />
      </View>
    </SafeAreaView>
  );
};

export default AccountSetup;
