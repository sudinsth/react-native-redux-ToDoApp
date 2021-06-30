import 'react-native-gesture-handler';
import React from 'react';

import { Provider } from 'react-redux';
import store from './src/redux/store';

import {AppNavigation} from './src/navigation/home.navigation';


export default function App() {
  return (
    <Provider store={store}>
        <AppNavigation />
    </Provider>
  );
};

