import "react-native-gesture-handler";
import "react-native-reanimated";
import React, { useState, useEffect } from "react";
import { enableScreens } from "react-native-screens";
import { LogBox } from "react-native";

// Redux imports
import { Provider } from "react-redux";
import store, { persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

// Firebase imports
import firebase from "firebase";
import { firestore } from "firebase";
import { firebaseConfig } from "./src/constants/firebase_config";

// Navigation imports
import { AppNavigation } from "./src/navigation/drawer.navigation";
import { AuthStackScreen } from "./src/navigation/auth.navigation";

// Expo imports
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

LogBox.ignoreLogs(["Setting a timer"]);
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
          {isAuthenticated ? <AppNavigation /> : <AuthStackScreen />}
        </PersistGate>
      </Provider>
    );
  }
}

// firebase Initialization
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
firestore().settings({ experimentalForceLongPolling: true, merge: true });
