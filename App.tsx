import React, {useEffect} from 'react';
import {AuthProvider} from './src/setup/app-context-manager/Authcontext';
import AppNav from './src/navigation/AppNav';
import SplashScreen from 'react-native-splash-screen';
import RNUxcam from 'react-native-ux-cam';

const App = () => {
  const configuration = {
    userAppKey: 'mjoylwvml09vft0',
    enableAutomaticScreenNameTagging: false,
    enableImprovedScreenCapture: true,
  };

  try {
    RNUxcam.optIntoSchematicRecordings(); // Add this line to enable iOS screen recordings
    RNUxcam.startWithConfiguration(configuration);
  } catch (error) {}

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

export default App;
