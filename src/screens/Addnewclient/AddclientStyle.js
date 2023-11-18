import { Platform, StyleSheet } from "react-native";
import { Dimensions } from "react-native";


import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { Colors } from "../../assets/colors";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fontScale = Dimensions.get('window').fontScale;


let AddclientStyle = {};


AddclientStyle = StyleSheet.create({

        container: {
            flex:1,
            backgroundColor: 'white',
          },
          contentCtn:{
            flex:1,
            marginLeft:responsiveWidth(8)
          },
          view2: {
            backgroundColor: Colors.white,
            padding: responsiveWidth(1),
            paddingHorizontal: responsiveWidth(5),
          },
       
    })


export default AddclientStyle 
