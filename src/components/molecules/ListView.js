import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../assets/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fontScale = Dimensions.get('window').fontScale;

const ListView = ({props, data}) => {




  const renderStatus = status => {
    switch (status) {
      case 'new_lead':
        return (
          <View style={[styles.detailCtnLead, {backgroundColor: '#3D8BFF'}]}>
            <View style={[styles.leadCtn]}>
              <Text style={styles.statusText}>NEW LEAD</Text>
            </View>
          </View>
        );
      case 'active':
        return (
          <View style={[styles.detailCtnLead, {backgroundColor: '#61A60E'}]}>
            <View style={styles.leadCtn}>
              <Text style={styles.statusText}>ACTIVE</Text>
            </View>
          </View>
        );
      case 'in_progress':
        return (
          <View style={[styles.detailCtnLead, {backgroundColor: '#FF9900'}]}>
            <View style={styles.leadCtn}>
              <Text style={styles.statusText}>IN PROGRESS</Text>
            </View>
          </View>
        );
      case 'cold_lead':
        return (
          <View style={[styles.detailCtnLead, {backgroundColor: '#24B0FF'}]}>
            <View style={styles.leadCtn}>
              <Text style={styles.statusText}>COLD LEAD</Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };


  const getBackgroundColor = (status) => {
    switch (status) {
      case 'new_lead':
        return '#3D8BFF';
      case 'active':
        return '#61A60E';
      case 'in_progress':
        return '#FF9900';
      case 'cold_lead':
        return '#24B0FF';
      default:
        return 'gray'; // Default color if none of the conditions are met
    }
  };

  console.log(data, 'Data got in component');

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        //  props.props.navigation.navigate('ClientInfo')
        props.navigation.navigate('ClientInfo', {clientdata: item});
      }}
      style={styles.item}>
      <View style={[styles.profileButton,{ backgroundColor:   getBackgroundColor(item?.status) }]}>
        {/* <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../../assets/images/profileimage.jpg')}
        /> */}

        {/* <Text style={{color: "gold"}}>ب</Text>
  <Text style={{color: "aqua"}}>ك</Text> */}

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.profileText}>{item?.name[0]}</Text>
        </View>
      </View>
      <View style={styles.detailCtn}>
        <Text style={styles.nametext}>{item?.name}</Text>
        <Text style={styles.nametext}>{item?.phone}</Text>
      </View>

      {renderStatus(item?.status)}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: 'white',
    marginVertical: responsiveHeight(1),
    display: 'flex',
    flexDirection: 'row',
    padding: responsiveWidth(3.5),
    elevation: 2,
    borderRadius: responsiveWidth(1),
    alignItems: 'center',
    marginLeft: responsiveWidth(1),
    marginRight: responsiveWidth(1),
  },
  title: {
    fontSize: 32,
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
    padding: responsiveWidth(0.5),
    marginLeft: responsiveWidth(3),
  },
  nametext: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Rubik-Regular',
    color: 'black',
  },
  detailCtnLead: {
    paddingHorizontal: responsiveWidth(2),
    backgroundColor: 'green',
    position: 'absolute',
    right: responsiveWidth(6),
    bottom: responsiveHeight(2),
    borderRadius: responsiveWidth(4),
  },
  leadCtn: {},
  statusText: {
    fontSize: responsiveFontSize(1.2),
    fontFamily: 'Rubik-Regular',
    color: 'white',
  },

  profileText: {
    fontSize: responsiveFontSize(4),
    fontFamily: 'Rubik-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1
  },
});

export default ListView;
