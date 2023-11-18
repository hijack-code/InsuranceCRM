import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, Text,ToastAndroid} from 'react-native';
import HeadingDesc from '../../components/molecules/HeadingDesc';
import HeadingBox from '../../components/molecules/HeadingBox';
import Button from '../../components/common/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddclientStyle from './AddclientStyle';
import TopBack from '../../components/molecules/TopBack';
import Radiobutton from '../../components/common/Radiobutton';

const AddClient = props => {
  console.log(props, 'PROPS IN ADD CLIENT');

  const showToast = () => {
    ToastAndroid.show('Client added successfully!!', ToastAndroid.SHORT);
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'All Your Base Are Belong To Us',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'A wild toast appeared!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const [addsingle, setAddsingle] = useState(false);

  const [singleclient, setSingleclient] = useState({
    clientname: '',
    clientphone: 0,
    clientemail: '',
    clientage: 0,
    clientprofession: '',
    clientaddress: '',
    clientpolicies:[]
  });

  const updateClientdata = (key, value) => {
    setSingleclient(prevState => {
      return {
        ...prevState, // Spread the previous state to maintain other key-value pairs
        [key]: value, // Update the specific key with the new value
      };
    });
  };


  const storeClientData = async (newClient) => {
    try {
      // Retrieve existing clients from AsyncStorage
      const existingClients = await AsyncStorage.getItem('@clients_array');
      let newClientArray = [];
  
      if (existingClients !== null) {
        // If there are existing clients, parse them and add the new client
        newClientArray = JSON.parse(existingClients);
      }

      newClientArray.push(newClient);

      // Save the updated array back to AsyncStorage
      const jsonValue = JSON.stringify(newClientArray);
      await AsyncStorage.setItem('@clients_array', jsonValue);

      console.log("SAVING DATA DONE")
      showToast()
      props.navigation.goBack();

    } catch (e) {
      // Saving error
      console.error(e);
    }
  };



  const onNameChange = text => {
    console.log('name change! in client setup ' + text);
    updateClientdata('clientname', text);
  };

  const onphoneChange = text => {
    console.log('phone change! in client setup ' + text);
    updateClientdata('clientphone', text);
  };

  const onemailChange = text => {
    console.log('emal change! in client setup ' + text);
    updateClientdata('clientemail', text);
  };

  const onageChange = text => {
    console.log('age change! in client setup ' + text);
    updateClientdata('clientage', text);
  };

  const onprofessionChange = text => {
    console.log('profession change! in client setup ' + text);
    updateClientdata('clientprofession', text);
  };

  const onaddressChange = text => {
    console.log('address change! in client setup ' + text);
    updateClientdata('clientaddress', text);
  };

  return (
    <SafeAreaView style={AddclientStyle.container}>
      <TopBack />

      <ScrollView>
        <View style={AddclientStyle.contentCtn}>
          <Radiobutton
            radioheading="Enter new client details"
            btn1heading="Multiple clients"
            btn2heading="Single client"
            active={addsingle}
            onclickfirst={() => {
              setAddsingle(true);
            }}
            onclicksecond={() => {
              setAddsingle(false);
            }}
          />

          {addsingle ? (
            <View>
              <Text>ADD SINGKE</Text>
            </View>
          ) : (
            <>
              <HeadingBox
                headingText="Client name"
                inputplaceholder="Enter name"
                props={props}
                onInputChange={onNameChange}
              />
              <HeadingBox
                headingText="Phone no."
                inputplaceholder="Enter Phone"
                props={props}
                onInputChange={onphoneChange}
              />

              <HeadingBox
                headingText="Email ID"
                inputplaceholder="Enter Email"
                props={props}
                onInputChange={onemailChange}
              />

              <HeadingBox
                headingText="Age"
                inputplaceholder="Enter Age"
                props={props}
                onInputChange={onageChange}
              />

              <HeadingBox
                headingText="Profession"
                inputplaceholder="Enter Profession"
                props={props}
                onInputChange={onprofessionChange}
              />

              <HeadingBox
                headingText="Address"
                inputplaceholder="Enter Address"
                props={props}
                onInputChange={onaddressChange}
              />
            </>
          )}
        </View>
      </ScrollView>

      <View style={AddclientStyle.view2}>
        <Button
          disabled={singleclient.clientname != '' && singleclient.clientphone != '' && singleclient.clientemail !='' && singleclient.clientage != '' && singleclient.clientprofession != '' && singleclient.clientaddress !='' ? false : true}
          btntext="Save"
          buttonctn={AddclientStyle.buttonCtn}
          onclick={() => { storeClientData(singleclient) }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddClient;
