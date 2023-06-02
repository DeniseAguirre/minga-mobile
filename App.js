import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/store/store';
import MingaDrawer from './src/navigation/Drawer';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MingaDrawer />
      </NavigationContainer>
    </Provider>
  );
}

export default App;