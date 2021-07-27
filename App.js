import "react-native-gesture-handler";
import "react-native-reanimated";
import React, { useState, useEffect } from "react";
import { enableScreens } from "react-native-screens";

// Redux imports
import { Provider } from "react-redux";
import store, { persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

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
  enableScreens();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
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
    }
    return () => {
      isMounted = false;
    };
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
        <PersistGate loading={null} persistor={persistor}>
          {/* <AppNavigation /> */}
          {/* <LoginScreen /> */}
          {isAuthenticated ? <AppNavigation /> : <AuthStackScreen />}
          {/* {isAuthenticated ? <TabNavigation /> : <AuthStackScreen />} */}
        </PersistGate>
      </Provider>
    );
  }
}

// firebase Initialization
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
// firebase.firestore().settings({ timestampsInSnapshots: true });
// firebase.initializeApp(firebaseConfig);
