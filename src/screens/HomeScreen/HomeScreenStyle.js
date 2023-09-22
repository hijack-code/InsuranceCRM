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
            backgroundColor: '#f5f5f5',
      
          },
          logoImgContainer:{
            backgroundColor: 'white',
            marginLeft:responsiveWidth(4),

          },
          logoImg:{
            height:responsiveHeight(9),
            width:responsiveHeight(9),
          },
          nameCtn:{
            backgroundColor:"white",
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
            marginTop:responsiveHeight(1)
          },
          nameText:{
            fontSize:responsiveFontSize(2.4),
            fontFamily:'Rubik-Medium',
            lineHeight:responsiveFontSize(3.4),
            color:"black",
            backgroundColor:"white",
            width:responsiveWidth(70),
            marginLeft:responsiveWidth(1),

           
          },
          counterCtn:{
            backgroundColor:"white",
            display:"flex",
            flexDirection:"row",
            width:windowWidth
          },
          counterlight:{
            backgroundColor:"#dcdcdc",
          },
          counteractive:{
            backgroundColor:"#007FFF",
          },
          totalclienttext:{
            color:"black"
          },
          eventtext:{
            color:"white"
          }

       
 
    })


export default HomeScreenStyle 
