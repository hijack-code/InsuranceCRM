import React,{ createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";





export const AuthContext = createContext();




export const AuthProvider =  ({children}) => {

    const [isLoading,setIsloading] = useState(false);
    const [userToken,setUserToken] = useState(null);

    console.log("  running authcontext js!");



    const login = () => {

        setIsloading(true);
        setUserToken("jgsh");
        AsyncStorage.setItem('userToken' , "dfsgvs");
        setIsloading(false);

    }

    const logout = () => {
        console.log("  logingg out!");

        setIsloading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userinfo');
        setIsloading(false);
        console.log("  loggedd out!");

    }
    
    const isLoggedIn =  async() => {
        try{

            console.log("checking  logingg in!");
            setIsloading(true);
            let userinfo = await AsyncStorage.getItem('userinfo');
            console.log("user info got!" +  userinfo);

            if (userinfo != null) {

                setUserToken(userinfo?.token);
                setIsloading(false);
                console.log("user token got!" +  userinfo.token);
            }else{
                setIsloading(false);

            }
            




        }
        catch(e){

            console.log("error in logingg in!");
        }
    }




    useEffect(() => {

        isLoggedIn()
    },[])


    return (
        <AuthContext.Provider value={{login,logout,isLoading,userToken}}>
            {children}
        </AuthContext.Provider>
    )
}