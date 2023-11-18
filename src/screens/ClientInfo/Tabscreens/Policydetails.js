import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Colors} from '../../../assets/colors';
import {EmptyDocSvg} from '../../../assets/svgs/SvgImages';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Button from '../../../components/common/Button';
import {windowHeight} from '../../../utils/Dimensions';
import HeadingBox from '../../../components/molecules/HeadingBox';
import Radiobutton from '../../../components/common/Radiobutton';
import SaveCancelBtn from '../../../components/common/SavecancelBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Policydetails = (props) => {
  console.log(props.clientdata, 'CLIENT ALL got id policy derail page');

  const showToast = text => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  const [addpolicy, setaddPolicy] = useState(false);

  const [statusactive, setStatusactive] = useState(false);
  const [premiumYearly, serPremiumyearly] = useState(false);
  const [clientData, setClientData] = useState(
    props.clientdata?.clientpolicies,
  );

  const [policydetails, setPolicydetails] = useState([]);

  const [policydata, setPolicyData] = useState({
    productname: '',
    amount: 0,
    status: false,
    indate: '',
    frequency: false,
    nextdate: '',
  });

  const addPolicyData = () => {
    setClientData(prevDetails => [...prevDetails, policydata]);

    console.log('AFTER SAVING DATA', clientData);

    updateClientPolicies();
  };

  const updateClientPolicies = async () => {
    try {
      // Retrieve the existing clients array from AsyncStorage
      const existingClientsJson = await AsyncStorage.getItem('@clients_array');
      let clientsArray = existingClientsJson
        ? JSON.parse(existingClientsJson)
        : [];
      console.log('CLIENTS ARRAY', clientsArray);

      // Find the index of the client to be updated
      const clientIndex = clientsArray.findIndex(
        client => client.clientname === props.clientdata.clientname,
      );

      if (clientIndex !== -1) {
        console.log(clientIndex, 'INDEX FOUND!');
        // Update the clientpolicies array for the specific client
        clientsArray[clientIndex].clientpolicies = [
          ...clientsArray[clientIndex].clientpolicies,
          policydata,
        ];

        console.log(clientsArray, 'CLIENTS ARRAY AFTER INSERTING NET POLICY!');
        // Save the updated array back to AsyncStorage
        const updatedClientsJson = JSON.stringify(clientsArray);
        await AsyncStorage.setItem('@clients_array', updatedClientsJson);

        showToast('Policy added successfully!');
      } else {
        console.log('Client not found');
      }
    } catch (e) {
      console.error('Error updating client policies', e);
    }
  };

  const updatePolicyData = (key, value) => {
    setPolicyData(prevState => {
      return {
        ...prevState, // Spread the previous state to maintain other key-value pairs
        [key]: value, // Update the specific key with the new value
      };
    });

    console.log(policydata, 'POLICY DATAA');
  };

  const onproductNameChange = text => {
    console.log(' product name change! in account setup ' + text);

    updatePolicyData('productname', text);
  };

  const amountChange = text => {
    console.log(' amount change ' + text);

    updatePolicyData('amount', text);
  };

  const inceptiondate = text => {
    console.log(' inceptiondate change ' + text);
    updatePolicyData('indate', text);
  };

  const nextduedate = text => {
    console.log(' nextduedate  changed' + text);
    updatePolicyData('nextdate', text);
  };

  return (
    <View style={styles.maincontainer}>
      {addpolicy ? (
        <View style={styles.emptyCtn}>
          <ScrollView>
            <HeadingBox
              props={props}
              headingText={'Product name'}
              inputplaceholder={'Product name'}
              onInputChange={onproductNameChange}
              containerstyle={styles.headingboxctn}
            />

            <HeadingBox
              props={props}
              headingText={'Proposed amount'}
              inputplaceholder={'amount'}
              onInputChange={amountChange}
              containerstyle={styles.headingboxctn}
            />

            <Radiobutton
              radioheading="Status"
              btn1heading="Active"
              btn2heading="Inactive"
              active={statusactive}
              containerstyle={styles.radiobtnctn}
              onclickfirst={() => {
                setStatusactive(true);
                updatePolicyData('status', true);
              }}
              onclicksecond={() => {
                setStatusactive(false);
                updatePolicyData('status', false);
              }}
            />

            <HeadingBox
              props={props}
              headingText={'Inception date'}
              inputplaceholder={'date'}
              onInputChange={inceptiondate}
              containerstyle={styles.headingboxctn}
            />

            <Radiobutton
              radioheading="Premium frequency"
              btn1heading="Yearly"
              btn2heading="Monthly"
              containerstyle={styles.radiobtnctn}
              active={premiumYearly}
              onclickfirst={() => {
                serPremiumyearly(true);
                updatePolicyData('frequency', true);
              }}
              onclicksecond={() => {
                serPremiumyearly(false);
                updatePolicyData('frequency', false);
              }}
            />

            <HeadingBox
              props={props}
              headingText={'Next due date'}
              inputplaceholder={'date'}
              onInputChange={nextduedate}
              containerstyle={styles.headingboxctn}
            />
          </ScrollView>

          <View style={styles.view2}>
            {/* <Button
              disabled={false}
              btntext="Add new policy details"
              buttonctn={styles.buttonCtn}
            /> */}
            <SaveCancelBtn
              onSave={() => {
                setaddPolicy(!addpolicy);
                addPolicyData();
              }}
              buttonctn={styles.savebuttonCtn}
              onCancel={() => {
                showToast('Cancelled!!');
                setaddPolicy(false)
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

                      <View style={styles.ctn1}>
                        <Text style={styles.listheadtext}>
                          Policy Holder name
                        </Text>
                        <Text style={styles.listvaltext}>
                          {item.productname}
                        </Text>

                        <Text style={styles.listheadtext}>Product name</Text>
                        <Text style={styles.listvaltext}>
                          {item.productname}
                        </Text>

                        <Text style={styles.listheadtext}>Inception date</Text>
                        <Text style={styles.listvaltext}>{item.indate}</Text>

                        <Text style={styles.listheadtext}>Next due date</Text>
                        <Text style={styles.statustext}>{item.nextdate}</Text>

                        <TouchableOpacity>
                          <Text style={styles.sendTxt}>
                            Send policy discription
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.ctn2}>
                        <Text style={styles.listheadtext}>Current Status</Text>
                        <Text
                          style={styles.statustext}>{`${item.status}`}</Text>

                        <Text style={styles.listheadtext}>Proposed amount</Text>
                        <Text style={styles.listvaltext}>₹{item.amount}</Text>

                        <Text style={styles.listheadtext}>
                          Premium frequency
                        </Text>
                        <Text
                          style={styles.statustext}>{`${item.frequency}`}</Text>

                        <Text style={styles.listheadtext}>Maturity Date</Text>
                        <Text style={styles.listvaltext}>{item.indate}</Text>

                        <TouchableOpacity>
                          <Text style={styles.sendTxt}>Edit details</Text>
                        </TouchableOpacity>
                      </View>

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
              btntext="Add new policy details"
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
              There no policy details found. Please enter the details.
            </Text>
          </View>

          <View style={styles.view2}>
            <Button
              disabled={false}
              btntext="Add new policy details"
              buttonctn={styles.buttonCtn}
              onclick={() => {
                setaddPolicy(true);
              }}
            />
          </View>
        </View>
      )}
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
  },

  headingboxctn: {
    marginLeft: responsiveWidth(4),
  },

  radiobtnctn: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    marginLeft: responsiveWidth(4),
  },
  savebuttonCtn: {
    backgroundColor: 'white',
  },
  containerouterlist: {
    backgroundColor: 'white',
    width: responsiveWidth(80),
    height: responsiveHeight(40),
    marginTop: responsiveHeight(3),
    borderRadius: responsiveWidth(4),
    margin: responsiveWidth(4),
    elevation: 2,
  },
  containerlist: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    flexBasis: '40%',
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
    fontSize: responsiveFontSize(1.2),
    fontFamily: 'Rubik-Regular',
    marginTop: responsiveHeight(2),
  },
  listvaltext: {
    color: 'black',
    fontSize: responsiveFontSize(1.4),
    fontFamily: 'Rubik-Regular',
  },
  statustext: {
    color: '#3EA400',
    fontSize: responsiveFontSize(1.4),
    fontFamily: 'Rubik-Regular',
  },
  sendCtn: {
    backgroundColor: 'green',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sendTxt: {
    color: Colors.activeprimary,
    fontSize: responsiveFontSize(1.2),
    fontFamily: 'Rubik-Regular',
    borderBottomWidth: 1,
    borderColor: Colors.activeprimary,
    marginTop: responsiveHeight(3),
  },
});

export default Policydetails;
