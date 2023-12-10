import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';




const InputBox = ({
  props,
  inputplaceholder = 'default placeholder',
  onChangeText = text => {
    console.log('Default On texthandler  ' + text);
  },
  keyboardtype = 'default'
}) => {





  return (

    <View>
      <TextInput
        onChangeText={onChangeText}
        style={InputBoxstyles.textInput}
        placeholder={inputplaceholder}
        keyboardType= {keyboardtype}
      />
    </View>

    
  );
};

const InputBoxstyles = StyleSheet.create({
  textInput: {
    // marginTop: responsiveHeight(1),
    height:responsiveHeight(5),
    width: responsiveWidth(80),
    borderBottomColor: 'white',
    padding:0,
    margin:0,
    borderBottomWidth: 1,
    marginBottom: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    borderBottomWidth: responsiveWidth(0.2),
    borderBottomColor: "black",
  },
});

export default InputBox;
