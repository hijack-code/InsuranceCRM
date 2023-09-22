import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

import HomeScreenStyle from './HomeScreenStyle';
import Button from '../../components/common/Button';




import {
  NameSvg
} from '../../assets/svgs/SvgImages';
import LogoViewer from '../../components/common/LogoViewer';
import Counter from '../../components/common/Counter';






const HomeScreen = () => {


  return (


    <SafeAreaView style={HomeScreenStyle.container}>





          <View style={HomeScreenStyle.nameCtn}>

              <LogoViewer
                  Logosource={NameSvg}
                  containerstyle={HomeScreenStyle.logoImgContainer}
                  logostyle={HomeScreenStyle.logoImg}
                />

                <Text style={HomeScreenStyle.nameText} >Motilal Sharma Insurance Agency Private Limited</Text>
          </View>



          <View style={HomeScreenStyle.counterCtn} >

              <Counter countertitle='Total Clients' countervalue="12000" buttonctn={HomeScreenStyle.counterlight}  clientstyle={HomeScreenStyle.totalclienttext}  clientnumberstyle={HomeScreenStyle.totalclienttext} />

              <Counter countertitle='Today’s Events' countervalue='12' buttonctn={HomeScreenStyle.counteractive}  clientstyle={HomeScreenStyle.eventtext}  clientnumberstyle={HomeScreenStyle.eventtext}   />

          </View>










    </SafeAreaView>


  );
};

export default HomeScreen;
