import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, Alert, SafeAreaView, ActivityIndicator, ScrollView} from "react-native";
import useShrVault from "./useShrVault";
import JSONTree from 'react-native-json-tree'


export default function DemoVaultsPage (){
  const {loading, initSuccess, init, login, signup, addDocument, getDocuments, getUserInfo} = useShrVault();

  const [dataJson, setDataJson] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(()=>{
    (async()=>{
     await init();
    })()
  },[]);

  function _onLogin(){
    login(function(){
      Alert.alert('Login success');
      setIsLogged(true);
    })
  }

  // _onSignUp
  function _onSignUp(){
    signup(function(){
      Alert.alert('signUp success');
        setIsLogged(true);
    })
  }

    // _onAddDocs
    function _onAddDocs(){
        addDocument(()=>{
            Alert.alert('add document success')
        });
    }

    // _getAllDocs
   async function _getAllDocs(){
      const data =  await getDocuments();
      setDataJson({result: data.map(d => d.toJSON())})
    }

    // _getUserInfo
   async function _getUserInfo(){
      const userData = await getUserInfo();
       setDataJson(JSON.parse(userData))
    }


    const renderHeader=()=>{
      return(
          <>
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
                  <Text>{isLogged? 'Login again' :'Login'}</Text>
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

              {/*--useInfo--*/}
              <TouchableOpacity
                  onPress={_getUserInfo}
                  style={{
                      height: 50,
                      width: '100%',
                      backgroundColor: '#60a5fa',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: 10,
                  }}>
                  <Text>Get User info</Text>
              </TouchableOpacity>

              {/*--add--*/}
              <TouchableOpacity
                  onPress={_onAddDocs}
                  style={{
                      height: 50,
                      width: '100%',
                      backgroundColor: '#fde047',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: 10,
                  }}>
                  <Text>Add Document</Text>
              </TouchableOpacity>

              {/*--get--*/}
              <TouchableOpacity
                  onPress={_getAllDocs}
                  style={{
                      height: 50,
                      width: '100%',
                      backgroundColor: '#5eead4',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: 10,
                  }}>
                  <Text>Get Docs</Text>
              </TouchableOpacity>
          </>
      )
    }

    const BtnTryAgain =()=>{
      return(
          <TouchableOpacity
          onPress={async()=> await init()}
          style={{
              height: 50,
              width: '100%',
              backgroundColor: '#696969',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
          }}>
          <Text>Try Again</Text>
      </TouchableOpacity>
      )
    }

  return(
    <>
      <SafeAreaView/>
      <ScrollView style={{flex: 1, backgroundColor: '#ffffff', padding: 20}}>
        {/*--*/}
          <Text style={{marginBottom: 50, fontSize: 24, fontWeight: 'bold', color: '#333333'}}>Client Demo Vaults SDK</Text>
          {!initSuccess && !loading && BtnTryAgain()}
          {initSuccess && renderHeader()}
          {loading && <ActivityIndicator size={'large'} color={'#696969'}/>}
          {!!dataJson && <JSONTree  hideRoot data={dataJson}/>}

          <View style={{height: 50}}/>
      </ScrollView>
    </>
  )
}
