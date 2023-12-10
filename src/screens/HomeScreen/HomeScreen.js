import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ToastAndroid
} from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { axiosrequest } from '../../assets/utils/handler';
import HomeScreenStyle from './HomeScreenStyle';
import Button from '../../components/common/Button';

import {NameSvg} from '../../assets/svgs/SvgImages';
import LogoViewer from '../../components/common/LogoViewer';
import Counter from '../../components/common/Counter';
import SearchIcon from '../../assets/svgs/searchicon.svg';

import {COLORS} from '../../assets/colors.js';

import {windowWidth} from '../../assets/utils/Dimensions';
import ListView from '../../components/molecules/ListView';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = props => {
  const [userInfo, setUserInfo] = useState(null);
  const [clientlist, setClientlist] = useState([]);

  console.log(props, 'PROPSS');

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userinfo');

        console.log(jsonValue, 'USERINFO in homescreen');

        if (jsonValue != null) {
          setUserInfo(JSON.parse(jsonValue));
        }

     
      } catch (e) {
        // error reading value
        console.error(e);
      }
    };

    loadUserInfo();

    getclients()
  }, [getclients]);


  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };



  const getclients= async () => {

    console.log("fetchig OF CLIENT!!");

    try {
      // Block of code to try
      let endpoint = `/client`;
      const res = await axiosrequest('get',{}, endpoint);

      console.log('Response got in fetcings clints--> ', res.data);

      if (res != '' && res.status == 200) {
        // props.navigation.navigate('OtpVerify', { email: email });
        setClientlist(res?.data?.data);

      } else {
      }
    } catch (err) {
      // Block of code to handle errors
      showToast("Some error occured");
      console.log(err, 'catch block of api');
    }


  }

  return (
    <SafeAreaView style={HomeScreenStyle.container}>
      {/* <ScrollView automaticallyAdjustKeyboardInsets={true}> */}

      <View style={HomeScreenStyle.subcontainer}>
        <View style={HomeScreenStyle.nameCtn}>
          <TouchableOpacity
            onPress={() => {
              // props.props.navigation.dispatch(DrawerActions.openDrawer());
              props.props.navigation.openDrawer();



            }}
            style={HomeScreenStyle.profileButton}>
            <Image
              style={HomeScreenStyle.image}
              resizeMode="contain"
              source={require('../../assets/images/profileimage.jpg')}
            />
          </TouchableOpacity>

          <Text style={HomeScreenStyle.nameText}>{userInfo?.agency_name}</Text>
        </View>

        <View style={HomeScreenStyle.counterCtn}>
          <Counter
            countertitle="Total Clients"
            countervalue="12000"
            buttonctn={HomeScreenStyle.counterlight}
            clientstyle={HomeScreenStyle.totalclienttext}
            clientnumberstyle={HomeScreenStyle.totalclienttext}
          />

          <Counter
            countertitle="Today’s Events"
            countervalue="12"
            buttonctn={HomeScreenStyle.counteractive}
            clientstyle={HomeScreenStyle.eventtext}
            clientnumberstyle={HomeScreenStyle.eventtext}
          />
        </View>

        <View style={HomeScreenStyle.listingMainCtn}>
          <View style={HomeScreenStyle.listingTitleCtn}>
            <Text style={HomeScreenStyle.titleText}>Clients</Text>
            <TouchableOpacity
              onPress={() => {
                props.props.navigation.navigate('AddClient');
              }}>
              <Text style={HomeScreenStyle.addClientText}>
                Add New Client +
              </Text>
            </TouchableOpacity>
          </View>

          <View style={HomeScreenStyle.searchSection}>
            <TextInput
              style={HomeScreenStyle.searchInput}
              placeholder="Search client"
              placeholderTextColor="#d3d3d3"
              onChangeText={searchString => {}}
              underlineColorAndroid="transparent"
            />

            <TouchableOpacity>
              <SearchIcon />
            </TouchableOpacity>
          </View>

          <View style={HomeScreenStyle.clientlistCtn}>
            <ListView props={props} data={clientlist} />
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
