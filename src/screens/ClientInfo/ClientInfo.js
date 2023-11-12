import * as React from 'react';
import {View, useWindowDimensions, StyleSheet, Image, Text} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {TabView, SceneMap} from 'react-native-tab-view';
import {windowWidth} from '../../utils/Dimensions';
import {BackSvg} from '../../assets/svgs/SvgImages';
import LogoViewer from '../../components/common/LogoViewer';
import Policydetails from './Tabscreens/Policydetails';
import Clientdetails from './Tabscreens/Clientdetails';
import Events from './Tabscreens/Events';
import Transaction from './Tabscreens/Transaction';
import Beneficiary from './Tabscreens/Beneficiary';

const renderScene = SceneMap({
  first: Clientdetails,
  second: Policydetails,
  third: Events,
  fourth: Transaction,
  fifth: Beneficiary,
});

const ClientInfo = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
    {key: 'third', title: 'Third'},
    {key: 'fourth', title: 'Fourth'},
    {key: 'fifth', title: 'Fifth'},
  ]);

  return (
    <View style={styles.maincontainer}>
      <View style={styles.topCtn}>
        <LogoViewer
          Logosource={BackSvg}
          containerstyle={styles.logoImgContainer}
          logostyle={styles.logoImg}
        />

        <View style={styles.item}>
          <View style={styles.profileButton}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require('../../assets/images/profileimage.jpg')}
            />
          </View>
        </View>
        <View style={styles.detailCtn}>
          <Text style={styles.nametext}>Gaurav Yadav</Text>
          <Text style={styles.nametext}>7689389230</Text>
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        style={{marginTop: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: 'pink',
  },
  topCtn: {
    backgroundColor: 'green',
    display: 'flex',
    flexDirection: 'row',
    width: windowWidth,
  },
  logoImgContainer: {
    backgroundColor: 'white',
    borderRadius: responsiveWidth(5),
    marginLeft: responsiveWidth(1),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(6),
    width: responsiveWidth(10),
    elevation: 2,
  },
  logoImg: {
    height: responsiveHeight(7),
    width: responsiveWidth(5),
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
    elevation: 10,
  },
  image: {
    flex: 1,
    transform: [{scale: 1.5}],
  },
  detailCtn: {
    backgroundColor: 'blue',
    width: responsiveWidth(50),
    padding: responsiveWidth(0.5),
    marginLeft: responsiveWidth(2),
  },
  nametext: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: 'Rubik-Regular',
    color: 'black',
  },
});

export default ClientInfo;
