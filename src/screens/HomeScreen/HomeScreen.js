import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image
} from 'react-native';

import HomeScreenStyle from './HomeScreenStyle';
import Button from '../../components/common/Button';

import {NameSvg} from '../../assets/svgs/SvgImages';
import LogoViewer from '../../components/common/LogoViewer';
import Counter from '../../components/common/Counter';
import SearchIcon from '../../assets/svgs/searchicon.svg';

import {COLORS} from '../../assets/colors.js';

import {windowWidth} from '../../utils/Dimensions';
import ListView from '../../components/molecules/ListView';
import AsyncStorage from '@react-native-async-storage/async-storage';





const HomeScreen = props => {


  const [userInfo, setUserInfo] = useState(null);
  const[clientlist , setClientlist] = useState([]);




  console.log(props, 'PROPSS');

  // const data = [
  //   {id: '1', title: 'Gaurav kumar yadav', phone: 9123141113},
  //   {id: '2', title: 'Guarav', phone: 928727232},
  //   {id: '3', title: 'Shivam', phone: 992829829},
  //   {id: '4', title: 'abcd', phone: 923773722},
  //   {id: '5', title: 'Apple', phone: 92782922},
  //   {id: '6', title: 'Watermelon', phone: 92776332},
  //   {id: '7', title: 'Pineapple', phone: 927662772},
  //   {id: '8', title: 'abcd', phone: 97872882},
  //   {id: '9', title: 'Apple', phone: 728376773},
  //   {id: '10', title: 'Watermelon', phone: 762879422},
  //   {id: '11', title: 'Pineapple', phone: 827980308},

  //   // ... more items
  // ];


  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userinfo');
        const existingList = await AsyncStorage.getItem('@clients_array');

        if (jsonValue != null) {
          setUserInfo(JSON.parse(jsonValue));
        }

        if(existingList != null){
          setClientlist(JSON.parse(existingList));
        }


      } catch (e) {
        // error reading value
        console.error(e);
      }
    };

    loadUserInfo();
  }, []);

  return (
    <SafeAreaView style={HomeScreenStyle.container}>
      {/* <ScrollView automaticallyAdjustKeyboardInsets={true}> */}

      <View style={HomeScreenStyle.container}>
        <View style={HomeScreenStyle.nameCtn}>
     
            <View style={HomeScreenStyle.profileButton}>
              <Image
                style={HomeScreenStyle.image}
                resizeMode="contain"
                source={require('../../assets/images/profileimage.jpg')}
              />
            </View>

          <Text style={HomeScreenStyle.nameText}>
            {userInfo?.name}
          </Text>
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
