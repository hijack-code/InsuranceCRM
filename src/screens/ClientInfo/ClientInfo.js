import * as React from 'react';
import {View, useWindowDimensions, StyleSheet, Image, Text,TouchableOpacity} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {TabView, SceneMap,TabBar} from 'react-native-tab-view';
import {windowWidth} from '../../utils/Dimensions';
import {BackSvg} from '../../assets/svgs/SvgImages';
import LogoViewer from '../../components/common/LogoViewer';
import Policydetails from './Tabscreens/Policydetails';
import Clientdetails from './Tabscreens/Clientdetails';
import Events from './Tabscreens/Events';
import Transaction from './Tabscreens/Transaction';
import Beneficiary from './Tabscreens/Beneficiary';
import { Colors } from '../../assets/colors';

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
    {key: 'first', title: 'Client details'},
    {key: 'second', title: 'Policy details'},
    {key: 'third', title: 'Events'},
    {key: 'fourth', title: 'Transaction'},
    {key: 'fifth', title: 'Beneficiary'},
  ]);




  const CustomTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => props.jumpTo(route.key)}
              key={route.key}
            >
              <Text style={styles.tabTitle}>
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };


  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBar}
      labelStyle={styles.label}
      scrollEnabled={true}
      tabStyle={styles.tab} // Add this line

      // Add more customization here
    />
  );


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
        style={{
          marginTop: 10,
        }}
        // renderTabBar={
        //   ({ route, focused, color }) => (
        //     <Text style={{ color, margin: 8 }}>
        //       HAHA
        //     </Text>
        //   )
        // }
        // renderTabBar={(props) => <CustomTabBar {...props} />}
        renderTabBar={renderTabBar}


      />
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topCtn: {
    backgroundColor: Colors.white,
    display: 'flex',
    flexDirection: 'row',
    width: windowWidth,
    marginTop: responsiveHeight(1),
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
    backgroundColor: Colors.white,
    width: responsiveWidth(50),
    padding: responsiveWidth(0.5),
    marginLeft: responsiveWidth(2),
  },
  nametext: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: 'Rubik-Regular',
    color: 'black',
  },

  tabBar: {
    flexDirection: 'row',
    backgroundColor:Colors.white,

  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  tabTitle: {
    // Styling for tab titles
  },
  label: {
    fontSize: responsiveFontSize(1), // Set the font size for the tab titles
    // Other label styles (e.g., color, fontWeight)
    fontFamily: 'Rubik-Regular',
    color: Colors.activeprimary,
  },
  tab: {
    width: responsiveWidth(28), // Set the width for each tab
    // Other tab styles (e.g., padding, margin)
  },
  indicatorStyle:{
    backgroundColor:Colors.activeprimary,
    width: responsiveWidth(28), // Set the width for each tab

  }
});

export default ClientInfo;
