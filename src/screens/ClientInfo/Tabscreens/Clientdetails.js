import React from 'react'
import {Text,View,StyleSheet} from 'react-native'
import TextValue from '../../../components/common/TextValue'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Colors } from '../../../assets/colors'


const Clientdetails = (props) => {


  console.log(props.clientdata , "PROPS GOT IN DETAIS PAGE")


  return (
    <View style={styles.container}>

      <View style={styles.textCtn}>
        <TextValue title='Client name'  value={props.clientdata.clientname}/>
        <TextValue title='Phone number'  value={props.clientdata.clientphone}/>
        <TextValue title='Email ID'  value={props.clientdata.clientemail}/>
        <TextValue title='Age'  value={props.clientdata.clientage}/>
        <TextValue title='Profession'  value={props.clientdata.clientprofession}/>
        <TextValue title='Address'  value={props.clientdata.clientaddress}/>

      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.white
  },
  textCtn:{
      backgroundColor:"lawngreen ",
      marginLeft:responsiveWidth(8),
      marginTop:responsiveHeight(1)
  }
 
});

export default Clientdetails