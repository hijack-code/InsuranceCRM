import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
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

const HomeScreen = (props) => {

  console.log(props ,"PROPSS")

  const data = [
    { id: '1', title: 'Gaurav kumar yadav', phone:9123141113 },
    { id: '2', title: 'Guarav',phone:928727232 },
    { id: '3', title: 'Shivam',phone:992829829 },
    { id: '4', title: 'abcd',phone :923773722 },
    { id: '5', title: 'Apple', phone :92782922 },
    { id: '6', title: 'Watermelon',phone:92776332 },
    { id: '7', title: 'Pineapple',phone:927662772 },
    { id: '8', title: 'abcd',phone:97872882 },
    { id: '9', title: 'Apple',phone:728376773 },
    { id: '10', title: 'Watermelon', phone:762879422 },
    { id: '11', title: 'Pineapple',phone:827980308 },

    // ... more items
  ];

  return (
    <SafeAreaView style={HomeScreenStyle.container}>
      {/* <ScrollView automaticallyAdjustKeyboardInsets={true}> */}

        <View style={HomeScreenStyle.container} >
        <View style={HomeScreenStyle.nameCtn}>
          <LogoViewer
            Logosource={NameSvg}
            containerstyle={HomeScreenStyle.logoImgContainer}
            logostyle={HomeScreenStyle.logoImg}
          />

          <Text style={HomeScreenStyle.nameText}>
            Motilal Sharma Insurance Agency Private Limited
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
            <TouchableOpacity onPress={() => {     props.props.navigation.navigate('AddClient') }}>
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

            <ListView props={props} data={data} />

          </View>
        </View>
        </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
