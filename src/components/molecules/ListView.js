import React from "react";
import { FlatList, View, Text, StyleSheet,Dimensions , TouchableOpacity,Image,SafeAreaView } from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { Colors } from "../assets/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const fontScale = Dimensions.get("window").fontScale;

const ListView = ({
  props,
  data,
 
}) => {



    console.log(props , "Data got in component")

    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => {
       props.props.navigation.navigate('ClientInfo')

      }} style={styles.item}>
          <View style={styles.profileButton}>
              <Image
                style={ styles.image }
                resizeMode='contain'
                source={require('../../assets/images/profileimage.jpg')} /> 
            </View>
            <View style={styles.detailCtn}>
              <Text style={styles.nametext}>{item.title}</Text>
              <Text style={styles.nametext}>{item.phone}</Text>
            </View>
      </TouchableOpacity>
    );


  return (
  

  <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};




const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"white"
  },
  item: {
    backgroundColor: 'white',
    marginVertical: responsiveHeight(1),
    marginHorizontal: responsiveWidth(2),
    display:"flex",
    flexDirection:"row",
    padding:responsiveWidth(1),
    elevation:6,
    borderRadius:responsiveWidth(1),
    alignItems:"center"
  },
  title: {
    fontSize: 32,
  },
  profileButton:{
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    backgroundColor:"white",
    height:responsiveHeight(6),
    width:responsiveHeight(6),
    borderRadius:responsiveHeight(6),
    marginLeft:responsiveWidth(2),
    elevation:10

  },
  image: {
    flex: 1,
    transform: [{ scale: 1.5 }]
  },
  detailCtn:{
    backgroundColor:"white",
    padding:responsiveWidth(0.5),
    marginLeft:responsiveWidth(1)
  },
  nametext:{
    fontSize:responsiveFontSize(1.5),
    fontFamily:'Rubik-Regular',
    color:"black",
  }
});

export default ListView;
