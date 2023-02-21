/* eslint-disable react/react-in-jsx-scope */
import 'node-libs-react-native/globals';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {NativeBaseProvider} from 'native-base';

const newApp = () => (
  <NativeBaseProvider>
    <App />
  </NativeBaseProvider>
);

AppRegistry.registerComponent(appName, () => newApp);
