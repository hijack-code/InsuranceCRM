import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  // ToastAndroid,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {Colors} from '../../../assets/colors';
import {EmptyDocSvg} from '../../../assets/svgs/SvgImages';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Button from '../../../components/common/Button';
import {windowHeight, windowWidth} from '../../../assets/utils/Dimensions';
import HeadingBox from '../../../components/molecules/HeadingBox';
import Radiobutton from '../../../components/common/Radiobutton';
import SaveCancelBtn from '../../../components/common/SavecancelBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {axiosrequest} from '../../../assets/utils/handler';
import {Dropdown} from 'react-native-element-dropdown';

const Events = props => {

  // const showToast = text => {
  //   ToastAndroid.show(text, ToastAndroid.SHORT);
  // };

  const showToastNew = (type, heading, message) => {
    if (message && message.trim() !== "") {
      Toast.show({
        type: type,       // Can be 'success', 'error', 'info', etc.
        text1: heading,   // Main heading of the toast
        text2: message    // Detailed message of the toast
      });
    } else {
      Toast.show({
        type: 'error',    // Default type if message is empty
        text1: "Error",   // Default heading
        text2: "Something went wrong!" // Default message
      });
    }
  };


  const [addpolicy, setaddPolicy] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [clientData, setClientData] = useState(
    // props.clientdata?.clientpolicies,
    [],
  );

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentDatebox, setcurrentDatebox] = useState('');

  const data = [
    {label: 'Birthday', value: 'birthday'},
    {label: 'Anniversary', value: 'anniversary'},
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    const d = x1[2] + '/' + x1[1] + '/' + x1[0];

    if (currentDatebox == 'date_of_event') {
      eventdate(d);
    }
    hideDatePicker();
  };

  const [policydata, setPolicyData] = useState({
    date_of_event: 'Date',
    event_type: '',
    description: '',
  });

  useEffect(() => {
    getAllpolicy();
  }, []);

  const updateEventData = (key, value) => {
    setPolicyData(prevState => {
      return {
        ...prevState, // Spread the previous state to maintain other key-value pairs
        [key]: value, // Update the specific key with the new value
      };
    });
  };

  const onDescriptionChange = text => {
    updateEventData('description', text);
  };

  const eventdate = text => {
    updateEventData('date_of_event', text);
  };

  const addpolicydatabackend = async () => {
    console.log(
      'ADD EVENT DATA',
      policydata.date_of_event,
      '--',
      value,
      '---',
      policydata.description,
    );

    if (
      policydata.date_of_event &&
      policydata.date_of_event != 0 &&
      value != '' &&
      policydata.description &&
      policydata.description != ''
    ) {
      try {
        // Block of code to try
        let endpoint = `/event`;
        const res = await axiosrequest(
          'post',
          {
            description: policydata.description,
            event_type: value,
            date_of_event: policydata.date_of_event,
            client_id: props?.clientdata?.id,
          },
          endpoint,
        );
        console.log('Response got in add evebt --> ', res);
        if (res != '' && res.status == 200) {
          setaddPolicy(!addpolicy);
          showToastNew('success', 'Success', 'Event added successfully!');
          // showToast('Event added successfully!');
          // showToast(res?.data?.message);
          // props.navigation.navigate('OtpVerify', { email: email });
          setPolicyData({
            description: '',
            event_type: '',
            date_of_event: 'Date',
          });
          getAllpolicy();
        } else {
          showToastNew('error', 'Error', res?.data?.message || 'Some error occurred');
          // showToast(res?.data?.message);
          // showToast(res?.data?.message);
        }
      } catch (err) {
        // Block of code to handle errors

        // showToast('Some error occured');
        showToastNew('error', 'Error', 'Some error occurred');
        console.log(err, 'catch block of api');
      }
    } else {
      // showToast('Fill all fields!');
      showToastNew('info', 'Info', 'Fill all fields!');
    }
  };

  const getAllpolicy = async () => {
    try {
      // Block of code to try
      let endpoint = `/event/${props?.clientdata?.id}`;
      const res = await axiosrequest('get', {}, endpoint);

      // console.log('Response got get all  evebts --> ', res.data);

      if (res != '' && res.status == 200) {
        if (res.data.data != null && res.data.data != undefined) {
          setPolicyData(res.data.data);
          setClientData(res.data.data);
        }
        // showToast(res?.data?.message);
        // props.navigation.navigate('OtpVerify', { email: email });
      } else {
        // showToast(res?.data?.message);
      }
    } catch (err) {
      // Block of code to handle errors
      showToast('Some error occured');

      console.log(err, 'catch block of api');
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.detail}>Event Type: {item.event_type}</Text>
      <Text style={styles.detail}>Date of Event: {item.date_of_event}</Text>
    </View>
  );

  return (
    <View style={styles.maincontainer}>
      {addpolicy ? (
        <View style={styles.emptyCtn}>
          <ScrollView>
            <Text style={styles.headingText}>Date of event</Text>

            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => {
                setcurrentDatebox('date_of_event');
                showDatePicker();
              }}>
              <Text>{policydata.date_of_event}</Text>
            </TouchableOpacity>

            <HeadingBox
              props={props}
              headingText={'Description'}
              inputplaceholder={'Description'}
              onInputChange={onDescriptionChange}
              containerstyle={styles.headingboxctn}
            />

            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select' : '...'}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
              itemTextStyle={{color: Colors.black}}
            />
          </ScrollView>

          <View style={styles.view2}>
            <SaveCancelBtn
              onSave={() => {
                // addPolicyData();
                addpolicydatabackend();
              }}
              buttonctn={styles.savebuttonCtn}
              onCancel={() => {
                // showToast('Cancelled!!');
                showToastNew('error', 'Error', 'Cancelled!!');
                setaddPolicy(false);
              }}
            />
          </View>
        </View>
      ) : clientData.length > 0 ? (
        <View style={styles.policymainctn}>
          <View style={{flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {clientData.map((item, index) => {
                console.log(item, 'ITEM', index, 'INDEX');

                return (
                  <View key={index} style={styles.containerouterlist}>
                    <View style={styles.containerlist}>
                      {/* Repeat this item to see the two-column layout */}

                      <View style={styles.item}>

                      <Text style={styles.detail}>
                          Event Type: {item.event_type}
                        </Text>

                        <Text style={styles.description}>
                          {item.description}
                        </Text>
                      
                        <Text style={styles.description}>
                          Date: {item.date_of_event}
                        </Text>
                      </View>

                      {/* <View style={styles.ctn1}>
                        <Text style={styles.listheadtext}>
                          Policy Holder name
                        </Text>
                        <Text style={styles.listvaltext}>{item.name}</Text>

                        <Text style={styles.listheadtext}>Product name</Text>
                        <Text style={styles.listvaltext}>{item.name}</Text>

                        <Text style={styles.listheadtext}>Inception date</Text>
                        <Text style={styles.listvaltext}>
                          {item.inception_date}
                        </Text>

                        <Text style={styles.listheadtext}>Next due date</Text>
                        <Text style={styles.statustext}>
                          {item.next_due_date}
                        </Text>

                        <TouchableOpacity>
                          <View style={{alignSelf: 'center'}}>
                            <Text style={styles.sendTxt}>
                              Send policy discription
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.ctn2}>
                        <Text style={styles.listheadtext}>Current Status</Text>
                        <Text style={styles.statustext}>{`${
                          item.status ? 'Active' : 'Inactive'
                        }`}</Text>

                        <Text style={styles.listheadtext}>Proposed amount</Text>
                        <Text style={styles.listvaltext}>₹{item.amount}</Text>

                        <Text style={styles.listheadtext}>
                          Premium frequency
                        </Text>
                        <Text style={styles.statustext}>{`${
                          item.frequency ? 'Yearly' : 'Monthly'
                        }`}</Text>

                        <Text style={styles.listheadtext}>Maturity Date</Text>
                        <Text style={styles.listvaltext}>
                          {item.maturity_date}
                        </Text>

                        <TouchableOpacity>
                          <View style={{alignSelf: 'center'}}>
                            <Text style={styles.sendTxt}>Edit details</Text>
                          </View>
                        </TouchableOpacity>
                      </View> */}

                      {/* Add more items as needed */}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.view2}>
            <Button
              disabled={false}
              btntext="Add new Event details"
              buttonctn={styles.buttonCtn}
              onclick={() => {
                setaddPolicy(true);
              }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.emptyCtn}>
          <View style={styles.textctn}>
            <EmptyDocSvg />

            <Text style={styles.emptytext}>
              There no Event details found. Please enter the details.
            </Text>
          </View>

          <View style={styles.view2}>
            <Button
              disabled={false}
              btntext="Add new Event details"
              buttonctn={styles.buttonCtn}
              onclick={() => {
                setaddPolicy(true);
              }}
            />
          </View>
        </View>
      )}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  emptyCtn: {
    display: 'flex',
    flex: 1,
    height: responsiveHeight(82),
    backgroundColor: 'white',
  },
  emptytext: {
    textAlign: 'center',
    width: responsiveWidth(60),
    fontSize: responsiveFontSize(1.5),
    fontFamily: 'Rubik-Regular',
    color: 'black',
  },
  textctn: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view2: {
    backgroundColor: Colors.white,
    padding: responsiveWidth(1),
    paddingHorizontal: responsiveWidth(5),
    marginBottom: responsiveHeight(8),
  },

  headingboxctn: {
    marginLeft: responsiveWidth(4),
  },

  radiobtnctn: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    marginLeft: responsiveWidth(4),
    marginTop: responsiveHeight(2),
  },
  savebuttonCtn: {
    backgroundColor: 'white',
  },
  containerouterlist: {
    backgroundColor: 'white',
    width: responsiveWidth(82),
    // height: responsiveHeight(40),
    marginTop: responsiveHeight(3),
    borderRadius: responsiveWidth(4),
    margin: responsiveWidth(4),
    elevation: 2,
  },
  containerlist: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: responsiveHeight(2),

  },
  item: {
    flexBasis: '40%',
    backgroundColor:"white"
    // You can also use width: '50%' instead of flexBasis
    // Add padding, margin, etc., as needed for spacing and layout
  },
  policymainctn: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  ctn1: {
    backgroundColor: 'white',
  },
  ctn2: {
    backgroundColor: 'white',
  },
  listheadtext: {
    color: '#a9a9a9',
    fontSize: responsiveFontSize(1.6),
    fontFamily: 'Rubik-Regular',
    marginTop: responsiveHeight(2),
  },
  listvaltext: {
    color: 'black',
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Rubik-Regular',
  },
  statustext: {
    color: '#3EA400',
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Rubik-Regular',
  },
  sendCtn: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sendTxt: {
    color: Colors.activeprimary,
    fontSize: responsiveFontSize(1.6),
    fontFamily: 'Rubik-Regular',
    borderBottomWidth: 1,
    borderColor: Colors.activeprimary,
    marginTop: responsiveHeight(3),
  },
  buttonCtn: {},
  dateBtn: {
    backgroundColor: 'white',
    marginLeft: responsiveWidth(4),
    padding: responsiveWidth(1.5),
    borderBottomWidth: responsiveWidth(0.2),
    width: responsiveWidth(80),
  },
  headingText: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Rubik-Light',
    color: 'black',
    backgroundColor: 'white',
    width: responsiveWidth(82),
    marginTop: responsiveHeight(3.7),
    marginLeft: responsiveWidth(4),
  },

  dropdown: {
    height: responsiveHeight(4),
    width: responsiveWidth(80),
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    borderRadius: responsiveWidth(1),
    paddingHorizontal: 8,
    marginTop: responsiveHeight(1),
    backgroundColor: Colors.white,
    marginLeft: responsiveWidth(4),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: Colors.white,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: Colors.black,
  },
  placeholderStyle: {
    fontSize: responsiveFontSize(2),
    color: Colors.black,
  },
  selectedTextStyle: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Rubik-Light',
    color: Colors.black,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: Colors.black,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: responsiveWidth(2),
    marginVertical: 8,
    marginHorizontal: responsiveWidth(2),
    backgroundColor:"white",
    width:responsiveWidth(70)
},
description: {
  fontSize: responsiveFontSize(1.8),
  fontFamily: 'Rubik-Light',
  color: Colors.black,
  marginBottom:responsiveHeight(1)
},
detail: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Rubik-Regular',
    color: Colors.black,
    marginBottom:responsiveHeight(1)
},
});

export default Events;
