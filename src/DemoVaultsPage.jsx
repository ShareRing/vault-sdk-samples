import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import useShrVault from "./useShrVault";


export default function DemoVaultsPage (){
  const {init, login, signup} = useShrVault();

  useEffect(()=>{
    init();
  },[]);

  function _onLogin(){
    login(function(){
      Alert.alert('Login success')
    })
  }

  // _onSignUp
  function _onSignUp(){
    signup(function(){
      Alert.alert('signUp success')
    })
  }

  return(
    <>
      <SafeAreaView/>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',  backgroundColor: '#f1f5f9', padding: 20}}>
        {/*--*/}
        <Text style={{marginBottom: 50, fontSize: 24, fontWeight: 'bold'}}>Client Demo Vaults SDK</Text>
        {/*--login--*/}
        <TouchableOpacity
          onPress={_onLogin}
          style={{
            height: 50,
            width: '100%',
            backgroundColor: '#f87171',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <Text>Login</Text>
        </TouchableOpacity>


        {/*--sing up--*/}
        <TouchableOpacity
          onPress={_onSignUp}
          style={{
            height: 50,
            width: '100%',
            backgroundColor: '#22d3ee',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <Text>SignUp</Text>
        </TouchableOpacity>


      </View>
    </>
  )
}
