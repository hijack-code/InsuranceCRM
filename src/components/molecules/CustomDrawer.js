import React,{useEffect,useState,useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { AuthContext } from '../../setup/app-context-manager/Authcontext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LogoViewer from '../common/LogoViewer';
import { windowWidth } from '../../assets/utils/Dimensions';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Colors } from '../../assets/colors';
import { Logout, Share } from '../../assets/svgs/SvgImages';
import AsyncStorage from '@react-native-async-storage/async-storage';



const CustomDrawer = props => {
  const {logout}  = useContext(AuthContext);


  const [userInfo, setUserInfo] = useState(null);

  const loadUserInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userinfo');
      console.log(jsonValue, 'USERINFO');
      if (jsonValue != null) {
        setUserInfo(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
      console.error(e);
    }
  };

  useEffect(() => {
    loadUserInfo();
  }, []);




  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: Colors.white}}>
        <ImageBackground
          source={require('../../assets/images/profileimage.jpg')}
          style={{padding: 20}}>
          <Image
            source={require('../../assets/images/profileimage.jpg')}
            style={{height: 90, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Poppins-Medium',
              marginBottom: 5,
            }}>
           {userInfo?.agency_name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Regular',
                marginRight: 5,
              }}>
           {userInfo?.name}
            </Text>
            {/* <FontAwesome5 name="coins" size={14} color="#fff" /> */}
          </View>

          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontFamily:'Poppins-Medium',
              marginBottom: 5,
            }}>
           {userInfo?.email}
          </Text>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Ionicons name="share-social-outline" size={22} /> */}
            <LogoViewer
          Logosource={Share}
          containerstyle={styles.logoImgContainer}
          logostyle={styles.logoImg}
        />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {

          logout()
          // props.navigation.popToTop();
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'Onboarding' }],
          });


        }} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Ionicons name="exit-outline" size={22} /> */}
            <LogoViewer
          Logosource={Logout}
          containerstyle={styles.logoImgContainer}
          logostyle={styles.logoImg}
        />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: windowWidth,
  },
  topCtn: {
    backgroundColor: Colors.white,
    display: 'flex',
    flexDirection: 'row',
    width: windowWidth,
    marginTop: responsiveHeight(1),
    alignItems:"center"
  },
  logoImgContainer: {
    backgroundColor: 'white',
    borderRadius: responsiveWidth(5),
    marginLeft: responsiveWidth(1),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(6),
    width: responsiveWidth(10),
  },
  logoImg: {
    height: responsiveHeight(8),
    width: responsiveWidth(6),
  },
  profileButton: {
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white',
    height: responsiveHeight(6),
    width: responsiveHeight(6),
    borderRadius: responsiveHeight(6),
    marginLeft: responsiveWidth(2),
  },
  image: {
    flex: 1,
    transform: [{scale: 1.5}],
  },
  headText:{
    fontSize:responsiveFontSize(2.2),
    fontFamily:'Rubik-Regular',
    color:"black",
    width:responsiveWidth(82),
    marginLeft:responsiveWidth(2),
  }
});


export default CustomDrawer;