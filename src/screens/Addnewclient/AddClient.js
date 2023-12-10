import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ToastAndroid,
  Image,
  TouchableOpacity,
} from 'react-native';
import HeadingBox from '../../components/molecules/HeadingBox';
import Button from '../../components/common/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddclientStyle from './AddclientStyle';
import TopBack from '../../components/molecules/TopBack';
import Radiobutton from '../../components/common/Radiobutton';
import {Success} from '../../assets/svgs/SvgImages';
import LogoViewer from '../../components/common/LogoViewer';
import { Upload } from '../../assets/svgs/SvgImages';
import { axiosrequest } from '../../assets/utils/handler';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';


const AddClient = props => {

  const showToast = (text) => {
    ToastAndroid.show(text);
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'All Your Base Are Belong To Us',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };


  const [addsingle, setAddsingle] = useState(false);
  const [successAdd, setSuccessAdd] = useState(false);

  const [singleclient, setSingleclient] = useState({
    name: '',
    phone: 0,
    email: '',
    age: 0,
    profession: '',
    address: '',
    clientpolicies: [],
  });

  const updateClientdata = (key, value) => {
    setSingleclient(prevState => {
      return {
        ...prevState, // Spread the previous state to maintain other key-value pairs
        [key]: value, // Update the specific key with the new value
      };
    });
  };

  const storeClientData = async newClient => {
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
      console.log('SAVING DATA DONE');
      addnewclient()
      // showToast("Client added successfully!!");
    } catch (e) {
      // Saving error
      console.error(e);
    }
  };

  const addnewclient = async () => {

    console.log("ADDITION OF CLIENT!!");

    try {
      // Block of code to try
      let endpoint = `/client`;
      const res = await axiosrequest('post',{"name":singleclient.clientname, "phone":singleclient.clientphone, "email":singleclient.clientemail, "age": parseInt(singleclient.clientage) , "profession":singleclient.clientprofession, "address":singleclient.clientaddress}, endpoint);

      console.log('Response got in add cilient otp--> ', res?.data);

      if (res != '' && res.status == 200) {
        
        showToast(res?.data?.message);
        // props.navigation.navigate('OtpVerify', { email: email });
      } else {
        showToast(res?.data?.message);

      }
    } catch (err) {
      // Block of code to handle errors
      showToast("Some error occured");

      console.log(err, 'catch block of api');
    }


  }

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
      <View style={{marginBottom: responsiveHeight(2)}}>
        <TopBack props={props} />
      </View>

      <ScrollView>
        <View style={AddclientStyle.contentCtn}>
          {!successAdd ? (
            <>
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
            </>
          ) : (
            <></>
          )}

          {addsingle ? (
            <View style={{ display:"flex" , justifyContent:"center" , alignItems:"center"}}>
              <TouchableOpacity>
              <LogoViewer
                Logosource={Upload}
                containerstyle={AddclientStyle.loginImgContainer}
                logostyle={AddclientStyle.loginImg}
              />

              </TouchableOpacity>
           
            </View>
          ) : successAdd != true ? (
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
                keyboardtype='phone-pad'
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
          ) : (
            <>
              <View style={AddclientStyle.profileButton}>
                <LogoViewer
                  Logosource={Success}
                  containerstyle={AddclientStyle.loginImgContainer}
                  logostyle={AddclientStyle.loginImg}
                />
              </View>

              <View>
                <Text style={AddclientStyle.congratesText}>
                  Congratulations!
                </Text>
                <Text
                  style={[
                    AddclientStyle.congratesText,
                    {
                      fontSize: responsiveFontSize(2),
                      marginLeft: responsiveWidth(15),
                    },
                  ]}>
                  Client is added successfully!
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View style={AddclientStyle.view2}>
        {successAdd ? (
          <>
            <TouchableOpacity
              onPress={() => {
                setSuccessAdd(false);
                setSingleclient({
                  clientname: '',
                  clientphone: 0,
                  clientemail: '',
                  clientage: 0,
                  clientprofession: '',
                  clientaddress: '',
                  clientpolicies: [],
                });
              }}>
              <Text style={AddclientStyle.sendTxt}>Add new client details</Text>
            </TouchableOpacity>
            <Button
              disabled={false}
              btntext="Go to Dashboard"
              buttonctn={AddclientStyle.buttonCtn}
              onclick={() => {
                props.navigation.goBack();
              }}
            />
          </>
        ) : (
          <>
            <Button
              disabled={
                singleclient.clientname != '' &&
                singleclient.clientphone != '' &&
                singleclient.clientemail != '' &&
                singleclient.clientage != '' &&
                singleclient.clientprofession != '' &&
                singleclient.clientaddress != ''
                  ? false
                  : true
              }
              btntext="Save"
              buttonctn={AddclientStyle.buttonCtn}
              onclick={() => {


                setSuccessAdd(true);
                setSingleclient({
                  clientname: '',
                  clientphone: 0,
                  clientemail: '',
                  clientage: 0,
                  clientprofession: '',
                  clientaddress: '',
                  clientpolicies: [],
                });

                storeClientData(singleclient);
              }}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddClient;
