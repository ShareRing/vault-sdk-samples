/* eslint-disable react/react-in-jsx-scope */
import 'node-libs-react-native/globals';
const temp = Buffer.prototype.subarray;
Buffer.prototype.subarray = function(start, end) {
  return Buffer.from(temp(start, end));
}
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
