/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppNav from "./src/AppNav";
import {NativeBaseProvider} from 'native-base'

function App(){
  return(
    <NativeBaseProvider>
      <AppNav/>
    </NativeBaseProvider>
  )
}

export default App;
