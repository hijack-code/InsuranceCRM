import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import OnboardingStyle from './OnboardingStyle';

import LoginImg from '../../assets/images/LoginImg.svg';
import LogoViewer from '../../components/common/LogoViewer';
import {axiosrequest} from '../../assets/utils/handler';
import {
  AppleSvg,
  GoogleSvg,
  LoginImage,
  LogoImage,
} from '../../assets/svgs/SvgImages';
import Button from '../../components/common/Button';
import ButtonIcon from '../../components/common/ButtonIcon';
import InputBox from '../../components/common/InputBox';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const OnboardingScreen = (props, {navigation}) => {
  const [email, setEmail] = useState('');
  const [isValid, setValid] = useState(false);

  const emailTextHandler = text => {
    console.log('EMAIL TEXT HANDLER' + text);

    // setEmail(text);

    const isEmail = validateEmail(text);

    if (isEmail == true) {
      console.log('email if in correct format');
      setEmail(text);
      setValid(true);
    } else {
      setValid(false);
      console.log('email if in not in  correct format');
    }
  };

  function validateEmail(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  }

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const callOtp = async () => {
    props.navigation.navigate('OtpVerify', {email: email});

    console.log('CALLING OTP API');

    try {
      // Block of code to try
      let endpoint = `/login`;
      const res = await axiosrequest('post', {email: email}, endpoint);

      console.log('Response got in email otp--> ', res);

      if (res != '' && res.status == 200) {
        
        showToast(res?.data?.message);
        props.navigation.navigate('OtpVerify', { email: email });
      } else {
        showToast(res?.data?.message);

      }
    } catch (err) {
      // Block of code to handle errors
      showToast("Some error occured");

      console.log(err, 'catch block of api');
    }
  };

  return (
    <SafeAreaView style={OnboardingStyle.container}>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <LogoViewer
          Logosource={LogoImage}
          containerstyle={OnboardingStyle.logoImgContainer}
          logostyle={OnboardingStyle.logoImg}
        />
        <LogoViewer
          Logosource={LoginImage}
          containerstyle={OnboardingStyle.loginImgContainer}
          logostyle={OnboardingStyle.loginImg}
        />

        <Text style={OnboardingStyle.loginText}>Log in</Text>

        <View style={{marginLeft: responsiveWidth(8)}}>

          <InputBox
            inputplaceholder={'Enter Email ID'}
            onChangeText={emailTextHandler}
          />
        </View>

        <Button
          btntext="Send OTP"
          disabled={email != '' && isValid == true ? false : true}
          onclick={() => {
            callOtp();
            // props.navigation.navigate('AccountSetup');
          }}
          buttonctn={OnboardingStyle.buttonCtn}
        />

        <View
          style={[OnboardingStyle.buttonCtn, {marginTop: responsiveHeight(7)}]}>
          <ButtonIcon
            disabled={false}
            Logosource={AppleSvg}
            title={'Sign in with Google'}
          />
        </View>

        <View style={[OnboardingStyle.buttonCtn, {marginTop: 0}]}>
          <ButtonIcon
            disabled={false}
            Logosource={GoogleSvg}
            title={'Sign in with Apple'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
