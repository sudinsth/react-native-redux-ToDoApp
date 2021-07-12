import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";

// Redux imports
import { Provider } from "react-redux";
import store from "./src/redux/store";

// Firebase imports
import firebase from "firebase";
// import firebase from "@react-native-firebase/app";
import { firebaseConfig } from "./src/constants/firebase_config";

// Navigation imports
import { AppNavigation } from "./src/navigation/drawer.navigation";
import { LoginScreen } from "./src/screens/login.screen";
import { AuthScreens, AuthStackScreen } from "./src/screens/Auth.screen";
import { TabNavigation } from "./src/navigation/tab.navigation";

// Expo imports
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (firebase.auth().currentUser) {
      setIsAuthenticated(true);
    }
    firebase.auth().onAuthStateChanged((user) => {
      console.log("Checking auth state...");
      let isAuthenticated = false;
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  let [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        {/* <AppNavigation /> */}
        {/* <LoginScreen /> */}
        {/* {isAuthenticated ? <AppNavigation /> : <AuthStackScreen />} */}
        {isAuthenticated ? <TabNavigation /> : <AuthStackScreen />}
      </Provider>
    );
  }
}

// firebase Initialization
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
// firebase.firestore().settings({ timestampsInSnapshots: true });
// firebase.initializeApp(firebaseConfig);
