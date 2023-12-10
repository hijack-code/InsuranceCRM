import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axiosrequest = (method, data, url) => {
  console.log("api handler started");
  console.log(method, data, url);
  let userInfo = "";


  const loadUserInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userinfo');
      console.log(jsonValue, 'USERINFO in handler');

      if (jsonValue != null) {
        userInfo = JSON.parse(jsonValue)
      }

   
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  loadUserInfo();

  axios.defaults.baseURL = "https://api.mypolicymate.in"
  // axios.defaults.baseURL = "https://672c-2401-4900-1c8a-6952-cd84-542f-5596-ef6d.ngrok.io";
  console.log(userInfo.token ,"USERINFO OF API HANDLER")

  let token = userInfo?.token;
  let Authorization = `Bearer ${token}`;

  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      data,
      headers: {
        // "X-custom header" :  "custom",
        "source-type": "website",
        Authorization : Authorization,
        agent_id : userInfo?.id
      },
    })
      .then((res) => {
        console.log("API RESPONSE GOT--", res);
        resolve(res);
      })
      .catch((error) => {
        console.log("API CATCH BLOCK EROR", error);
        resolve(error.response);
      });
  });
};
