

import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native'; 
import { AuthContext } from '../../setup/app-context-manager/Authcontext';
import LogoViewer from '../common/LogoViewer';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Colors } from '../../assets/colors';
import { Help, Logout, Share, BackSvg } from '../../assets/svgs/SvgImages';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = props => {
  const { logout } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();
  
  const loadUserInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userinfo');
      if (jsonValue != null) {
        setUserInfo(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(word => word[0]).slice(0, 2).join('').toUpperCase();
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: Colors.white }}>
        <ImageBackground style={styles.imageBackground}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()} // Go back to the previous screen
            style={styles.backButton}>
            <BackSvg />
          </TouchableOpacity>
          <View style={styles.initialsContainer}>
            <Text style={styles.initialsText}>
              {getInitials(userInfo?.agency_name)}
            </Text>
          </View>
          <Text style={styles.userInfoText}>
            {userInfo?.agency_name}
          </Text>
          <Text style={styles.userMobileText}>
            Phone No.: +91-{userInfo?.mobile}
          </Text>
          <Text style={styles.userEmailText}>
            Email Id: {userInfo?.email}
          </Text>
        </ImageBackground>
        
        <View style={styles.drawerItemsContainer}>
          <DrawerItemList {...props} />
        </View>

        {/* Footer Section Moved Upward */}
        <View style={styles.footerContainer}>
          {/* Help and Support */}
          <TouchableOpacity 
            onPress={() => {}} 
            style={styles.footerButton}>
            <View style={styles.footerButtonContent}>
              <LogoViewer
                Logosource={Help}
                containerstyle={styles.logoImgContainer}
                logostyle={styles.logoImg}
              />
              <Text style={styles.footerButtonText}>
                Help and Support
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.footerDivider}></View>

          {/* Tell a Friend */}
          <TouchableOpacity onPress={() => {}} style={styles.footerButton}>
            <View style={styles.footerButtonContent}>
              <LogoViewer
                Logosource={Share}
                containerstyle={styles.logoImgContainer}
                logostyle={styles.logoImg}
              />
              <Text style={styles.footerButtonText}>
                Tell a Friend
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.footerDivider}></View>

          {/* Sign Out */}
          <TouchableOpacity
            onPress={() => {
              logout();
              props.navigation.reset({
                index: 0,
                routes: [{ name: 'Onboarding' }],
              });
            }}
            style={styles.footerButton}>
            <View style={styles.footerButtonContent}>
              <LogoViewer
                Logosource={Logout}
                containerstyle={styles.logoImgContainer}
                logostyle={styles.logoImg}
              />
              <Text style={styles.footerButtonText}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles for user info
  userInfoText: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: 'Rubik',
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 25,
  },
  backButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 1, // Ensure it appears above other components
    padding: 8, // Add padding for touch area
    borderRadius: 50, // Make the button area round
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Light background for visibility
  },
  imageBackground: {
    padding: 12,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  initialsContainer: {
    backgroundColor: '#007FFF',
    height: 93,
    width: 93,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#007FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  initialsText: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '400',
    textAlign: 'center',
  },
  userMobileText: {
    color: Colors.black,
    fontSize: 13,
    margin: 5,
    fontFamily: 'Rubik',
    textAlign: 'left',
    lineHeight: 18,
    fontWeight: '300',
  },
  userEmailText: {
    color: Colors.black,
    fontSize: 13,
    fontFamily: 'Rubik',
    marginBottom: 5,
    marginTop: 1,
    textAlign: 'left',
    lineHeight: 18,
    fontWeight: '300',
    
  },
  drawerItemsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,
  },
  footerContainer: {
    padding: 2,
    borderTopWidth: 0,
    borderTopColor: 'transparent',
  },
  footerDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    opacity: 0.1,
    marginVertical: 1,
    marginHorizontal: 20,
  },
  footerButton: {
    paddingVertical: 15,
  },
  footerButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 15,
    fontFamily: 'Rubik',
    marginLeft: 5,
    lineHeight: 18,
    fontWeight: '500',
    color: '#333333',
  },
  logoImgContainer: {
    backgroundColor: 'white',
    borderRadius: responsiveWidth(5),
    marginLeft: responsiveWidth(1),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(5),
    width: responsiveWidth(10),
  },
  logoImg: {
    height: responsiveHeight(8),
    width: responsiveWidth(6),
  },
});

export default CustomDrawer;
