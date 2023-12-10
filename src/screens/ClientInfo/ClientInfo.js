import * as React from 'react';
import {View, useWindowDimensions, StyleSheet, Image, Text,TouchableOpacity} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {TabView, SceneMap,TabBar} from 'react-native-tab-view';
import {windowWidth} from '../../assets/utils/Dimensions';
import {BackSvg} from '../../assets/svgs/SvgImages';
import LogoViewer from '../../components/common/LogoViewer';
import Policydetails from './Tabscreens/Policydetails';
import Clientdetails from './Tabscreens/Clientdetails';
import Events from './Tabscreens/Events';
import Transaction from './Tabscreens/Transaction';
import Beneficiary from './Tabscreens/Beneficiary';
import { Colors } from '../../assets/colors';



const ClientInfo = (props) => {

  const layout = useWindowDimensions();

  const { clientdata } = props.route.params;


  console.log(props ,"PROPSS")

  console.log(clientdata ,"clients dataa  PROPSS")



  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <Clientdetails clientdata={clientdata} />;
      case 'second':
        return <Policydetails clientdata={clientdata} />;
      case 'third':
        return <Events clientdata={clientdata} />;
      case 'fourth':
        return <Transaction clientdata={clientdata} />;
      case 'fifth':
        return <Beneficiary clientdata={clientdata} />;
      default:
        return null;
    }
  };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Client details'},
    {key: 'second', title: 'Policy details'},
    {key: 'third', title: 'Events'},
    {key: 'fourth', title: 'Transaction'},
    {key: 'fifth', title: 'Beneficiary'},
  ]);






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
        <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
        <LogoViewer
          Logosource={BackSvg}
          containerstyle={styles.logoImgContainer}
          logostyle={styles.logoImg}
        />
        </TouchableOpacity>
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
    marginTop: responsiveHeight(2),
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
    fontSize: responsiveFontSize(1.8),
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
    fontSize: responsiveFontSize(1.6), // Set the font size for the tab titles
    // Other label styles (e.g., color, fontWeight)
    fontFamily: 'Rubik-Regular',
    color: Colors.activeprimary,
  },
  tab: {
    width: responsiveWidth(34), // Set the width for each tab
    // Other tab styles (e.g., padding, margin)
  },
  indicatorStyle:{
    backgroundColor:Colors.activeprimary,
    width: responsiveWidth(34), // Set the width for each tab

  }
});

export default ClientInfo;
