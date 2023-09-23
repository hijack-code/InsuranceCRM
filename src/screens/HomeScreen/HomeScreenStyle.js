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
import { Colors } from './../../assets/colors';


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
          },

          listingMainCtn:{
            margin:responsiveWidth(2.2)
          },
          listingTitleCtn:{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:'center'
          },
          titleText:{
            fontSize:responsiveFontSize(2),
            fontFamily:'Rubik-Regular',
            lineHeight:responsiveFontSize(3.4),
            color:"black",
          },
          addClientText:{
            fontSize:responsiveFontSize(2),
            fontFamily:'Rubik-Regular',
            lineHeight:responsiveFontSize(3.4),
            color:"#007FFF",
          },
          searchSection: {
            flex: 1,
            marginTop:responsiveHeight(2),
            borderRadius:responsiveWidth(2.5),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            elevation:2,
            paddingRight: responsiveHeight(1),


        },
        searchIcon: {
            padding: 10,
        },
        searchInput: {
            flex: 1,
            paddingTop: responsiveHeight(1),
            paddingBottom:  responsiveHeight(1),
            backgroundColor: '#fff',
            color: '#424242',
            paddingLeft: responsiveHeight(1),
            paddingRight: responsiveHeight(1),
            borderRadius:responsiveWidth(2.5),

        },
        clientlistCtn:{
          backgroundColor:"lightseagreen"
        }

       
 
    })


export default HomeScreenStyle 
