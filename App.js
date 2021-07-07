import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';

import { Provider } from 'react-redux';

import store from './src/redux/store';

import firebase from 'firebase';
import {firebaseConfig} from './src/constants/firebase_config';

import { AppNavigation } from './src/navigation/drawer.navigation';
import {LoginScreen} from './src/screens/login.screen';
import { AuthScreens, AuthStackScreen } from './src/screens/Auth.screen';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if(firebase.auth().currentUser) {
      setIsAuthenticated(true)
    }
    firebase.auth().onAuthStateChanged(user =>{
      console.log("Checking auth state...")
      let isAuthenticated = false;
      if(user) {
        setIsAuthenticated(true)
      }else {
        setIsAuthenticated(false)
      }
    })
  }, [])

  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium' : require('./assets/fonts/Poppins-Medium.ttf'),
  });

  if(!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
          {/* <AppNavigation /> */}
          {/* <LoginScreen /> */}
          {isAuthenticated ? <AppNavigation /> : <AuthStackScreen />}
      </Provider>
    );
  }
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
// firebase.initializeApp(firebaseConfig);