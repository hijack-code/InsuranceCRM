import { NavigationContainer } from "@react-navigation/native";
import React,{useContext} from "react";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "../setup/app-context-manager/Authcontext";
import { View,Text,ActivityIndicator } from "react-native";




const AppNav = () => {

    const {isLoading,userToken}  = useContext(AuthContext);

    console.log("  running appnav js!");


    if(isLoading ){

       return(
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>

        <ActivityIndicator size={"large"}/>
    </View>
       )

    }

    return(
        <NavigationContainer>
        {userToken !== null ? <AppStack/> :<AuthStack/>}
      </NavigationContainer>
    )
}


export default AppNav;