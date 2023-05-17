import React from "react";
import {DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DemoVaultsPage from "./DemoVaultsPage";
import VaultStack, {navigationRef } from 'shr-vaults/stack';

const Stack = createNativeStackNavigator();

export default function AppNav(){
  return(
    <NavigationContainer
      theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#ffffff' } }}
      ref={navigationRef}>
      <Stack.Navigator>
        {/*---your screens--*/}
        <Stack.Screen
          name={'DemoVaultsPage'}
          component={DemoVaultsPage}
          options={{
            headerShown: false,
          }}
        />
        {VaultStack}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
