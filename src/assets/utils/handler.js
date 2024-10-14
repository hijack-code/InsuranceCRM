import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axiosrequest = async (method, data, url) => {
  // console.log(method, data, url);
  let userInfo = '';

  const loadUserInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userinfo');

      if (jsonValue != null) {
        return JSON.parse(jsonValue);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  userInfo = await loadUserInfo();

  // axios.defaults.baseURL = "https://api.mypolicymate.in"

  axios.defaults.baseURL = 'http://127.0.0.1:8081'; // Adjust port as needed

  // axios.defaults.baseURL = "https://672c-2401-4900-1c8a-6952-cd84-542f-5596-ef6d.ngrok.io";
  // console.log(userInfo ,"USERINFO OF API HANDLER")

  let token = userInfo?.token;
  // console.log(userInfo?.token , "TOKEN SENDING IN REQUEST")
  let Authorization = `Bearer ${token}`;

  // console.log( `Bearer ${token}` , "Authorization SENDING IN REQUEST")

  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      data,
      headers: {
        // "X-custom header" :  "custom",
        'source-type': 'website',
        Authorization: Authorization,
        agent_id: userInfo?.id,
      },
    })
      .then(res => {
        console.log('API RESPONSE GOT--', res);
        resolve(res);
      })
      .catch(error => {
        console.log('API CATCH BLOCK EROR', error);
        resolve(error.response);
      });
  });
};
