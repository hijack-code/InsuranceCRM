import { Platform, StyleSheet } from "react-native";
import { Dimensions } from "react-native";


import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fontScale = Dimensions.get('window').fontScale;


let HomeScreenStyle = {};


HomeScreenStyle = StyleSheet.create({

        container: {
            flex:1,
            backgroundColor: 'pink',
      
          },

          view1:{
            flex:1,
            backgroundColor:"grey",
            justifyContent:"center",
            padding:6
          }
       
 
    })


export default HomeScreenStyle 
