import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity,TextInput,ScrollView} from 'react-native';

import HomeScreenStyle from './HomeScreenStyle';
import Button from '../../components/common/Button';

import {NameSvg} from '../../assets/svgs/SvgImages';
import LogoViewer from '../../components/common/LogoViewer';
import Counter from '../../components/common/Counter';
import SearchIcon from '../../assets/svgs/searchicon.svg'

import {COLORS} from '../../assets/colors.js';


import { windowWidth } from '../../utils/Dimensions';





const HomeScreen = () => {
  return (
    <SafeAreaView style={HomeScreenStyle.container}>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>



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
          <TouchableOpacity>
            <Text style={HomeScreenStyle.addClientText}>Add New Client +</Text>
          </TouchableOpacity>
        </View>



        <View style={HomeScreenStyle.searchSection}>
      
            <TextInput
              style={HomeScreenStyle.searchInput}
              placeholder="Search client"
              placeholderTextColor="#d3d3d3" 
              onChangeText={searchString => {

              }}
              underlineColorAndroid="transparent"
            />

            <TouchableOpacity>
              <SearchIcon/>
            </TouchableOpacity>
     
        </View>









            <View  style={HomeScreenStyle.clientlistCtn}>


              
            </View>







      </View>




    
     


</ScrollView>

    </SafeAreaView>
  );
};

export default HomeScreen;
