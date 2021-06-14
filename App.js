
import React from 'react';

import { Provider } from 'react-redux';
import store from './src/redux/store/index';

import ToDoApp from './src/ToDoApp';

export default function App() {
  return (
    <Provider store={store}>
        <ToDoApp />
    </Provider>
  );
};

