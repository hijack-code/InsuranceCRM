import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from "./src/navigation/AuthStack";
import AppStack from "./src/navigation/AppStack";
import { AuthProvider } from "./src/setup/app-context-manager/Authcontext";
import AppNav from "./src/navigation/AppNav";






const App = () => {

  console.log("  running app js!");

  return (

    <AuthProvider>
      <AppNav/>
    </AuthProvider>



  )
}



export default App;