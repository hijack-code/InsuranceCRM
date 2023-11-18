import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {windowWidth} from '../../utils/Dimensions';
import {Colors} from '../../assets/colors';

const Radiobutton = ({
  radioheading = 'Radio heading',
  btn1heading = 'Button 1',
  btn2heading = 'Button 2',
  active = true,
  containerstyle,
  onclickfirst =   () => {console.log("checking  default first click in!");},
  onclicksecond =   () => {console.log("checking  default second click in!");}

}) => {






  return (
    <View style={containerstyle}>
      <Text style={styles.headingtext}>{radioheading}</Text>

      <View style={styles.radiobtnCtn}>
        <TouchableOpacity key={1} onPress={() => { onclickfirst() }}>
          <View
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: Colors.activeprimary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {active == true ? (
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: Colors.activeprimary,
                }}
              />
            ) : null}
          </View>
        </TouchableOpacity>

        <Text style={styles.radiobtntext}>{btn1heading}</Text>

        <TouchableOpacity key={2} onPress={() => { onclicksecond()}}>
          <View
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: Colors.activeprimary,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft:responsiveWidth(4)
            }}>
            {active == false ? (
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: Colors.activeprimary,
                }}
              />
            ) : null}
          </View>
        </TouchableOpacity>

        <Text style={styles.radiobtntext}>{btn2heading}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  radiobtnCtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: windowWidth,
  },

  headingtext: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Rubik-Regular',
  },
  radiobtntext: {
    color: 'black',
    fontSize: responsiveFontSize(1.5),
    fontFamily: 'Rubik-Regular',
    marginLeft:responsiveWidth(1.5)
  },
});

export default Radiobutton;
