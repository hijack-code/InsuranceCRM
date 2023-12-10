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
            marginLeft:responsiveWidth(8),
          },
          view2: {
            backgroundColor: Colors.white,
            padding: responsiveWidth(1),
            paddingHorizontal: responsiveWidth(5),
            marginBottom:responsiveHeight(8)

          },
          profileButton:{
            overflow: 'hidden',
            alignItems: 'center',
            position: 'relative',
            backgroundColor:"white",
            borderRadius:responsiveHeight(6),
            marginTop:responsiveHeight(2),
            transform: [{ translateX: -responsiveWidth(5) }], // Move 50 pixels to the left

          },
          image: {
            flex: 1,
            transform: [{ scale: 1.5 }]
          },

          logoImgContainer:{
            backgroundColor:"white",
            alignItems:"center",
            justifyContent:"center"
          },
          loginImg:{
            height:responsiveHeight(22),
            width:responsiveHeight(30.52),
          },
          congratesText:{
            fontSize:responsiveFontSize(4),
            fontFamily:'Rubik-Medium',
            color:"#333333",
            backgroundColor:"white",
            width:responsiveWidth(82),
            marginLeft:responsiveWidth(10),
            marginTop:responsiveHeight(3.79)
          },
          sendTxt: {
            color: Colors.activeprimary,
            fontSize: responsiveFontSize(2),
            fontFamily: 'Rubik-Regular',
            borderBottomWidth: 1,
            borderColor: Colors.activeprimary,
            marginBottom: responsiveHeight(2),
            width:responsiveWidth(44),
            marginLeft:responsiveWidth(20)
          },

       
    })


export default AddclientStyle 
