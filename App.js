/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, ActivityIndicator, StatusBar} from 'react-native';
import SHRSignup from 'shr-signup';
import SHRLogin from 'shr-login';
import * as SHRSdk from 'shr-vaults';
import ScanQRcode from 'shr-login/ScanQRcode';
// import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from './Toast';
import Crypto from 'shr-vaults/utils/Crypto';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [msgToast, setMsgToast] = useState({isShow: false, type: 0, msg: 'Test'});
  const [isCheckLogin, setCheckLogin] = useState(false);
  const [isCheckListDoc, setCheckListDoc] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [isVault, setVault] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
  const [isScanQR, setScanQR] = useState(false);
  const [contentQR, setContentQR] = useState('');
  const [isShowDialog, setShowDialog] = useState(false);
  const [isInit, setInit] = useState(false);
  const clientId = 'b273a90e-582d-4252-8a97-e71977c4ee7b';
  const clientSecret = '692a5c43b9952f4d1310129c7497d1ad14e0bd7bc10dda69425fcacf3a1eb3a8';

  useEffect(() => {
    if (!isInit){
      setInit(true);
      init();
    }
  }, [isInit]);

  const init = async () => {
    // test
    try {
      const pubKey = '02d7c7e5a5936c533e474f01b3ff18091e89da41af8f70212a535c9f874548872e';
      await Crypto.encryptWithPublicKey(pubKey, 'test test');
    } catch (error) {
      console.warn('encryptWithPublicKey error', error);
    }
    // end test
    await SHRSdk.init(clientId, clientSecret);
    SHRSdk.checkIsLogin().then(async val => {
      const list_doc = await SHRSdk.getAllDocuments();
      setCheckListDoc(typeof list_doc !== 'string' && list_doc.length > 0);
      setCheckLogin(val);
    });
    setLoading(false);
  };

  const renderVault = () => {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <SHRSdk.SHRVault
          enableBackButton={true}                                                                     //enable show back buttton
          isIdentityConfirm={false}                                                                   //enable show screen IdentityConfirm
          isRecordVideo={false}                                                                       //enable show screen RecordVideo
          isVerifyEmail={false}                                                                       //enable show screen VerifyEmail
          onGoBack={()=>{setVault(false);}}                                                            //function callback when click back button
          onUpdateSelfieSuccess={()=>{console.log('Update Selfie Success');}}                          //function callback when screen RecordVideo record success
          onUpdateIdentityConfirmSuccess={()=>{console.log('Update Identity Confirm Success');}}       //function callback when screen IdentityConfirm confirm success
          onVerifyEmailSuccess={()=>{                                                                 //function callback when screen VerifyEmail verify success
            setToast('Verify Email Success');
            setVault(false);
            setCheckListDoc(true);
            console.log('Verify Email Success');
          }}
        />
      </View>
    );
  };

  const setToast = (msg, type = 1) => {
    setMsgToast({type, msg});
    setShowToast(true);
  };

  const renderSignUp = () => {
    return <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <SHRSignup
        enableBackButton={true}                                                                     //enable show back buttton
        copyPhrase={()=>{console.log("Copy Phrase"); setToast('Copy Phrase');}}                     //function callback when click copy phrase
        onSuccess={(wallet, obj_data)=>{                                                            //function callback when sign up success
          setToast('Sign up onSuccess');
          setCheckLogin(true);
          console.log("Sign up onSuccess", JSON.stringify({wallet, obj_data}));                    //* wallet is a object, it includes wallet account information
        }}                                                                                          //* obj_data is a object, it include informations to process
        onTermsAndConditions={()=>{console.log("Terms And Conditions");}}                            //function callback when press "Terms And Conditions"
        onPrivacyPolicy={()=>{console.log("Privacy Policy");}}                                       //function callback when press "Privacy Policy"
        onImportWallet={()=>{console.log("Import Wallet");}}                                         //function callback when press "Import Wallet"
        onCreateAccount={()=>{                                                                       //function callback when click "Create Account" button
          setVault(true);
          setSignUp(false);
          console.log("Create Account");
        }}
        onCreateBasicAccount={()=>{console.log("Create Basic Account");}}                            //function callback when press "Create Basic Account"
        onGoBack={()=>{setSignUp(false);}}                                                           //function callback when click back button
      />
    </View>;
  };

  const renderLogin = () => {
    return <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <SHRLogin
        isImport={true}
        keyPhrase={__DEV__ ? 'gorilla moral salon tube bread avoid garment lunch survey unusual believe fruit' : null}
        enableBackButton={true}                                                                      //enable show back buttton
        copyPhrase={()=>{console.log("Copy Phrase"); setToast('Copy Phrase');}}                                               //function callback when click back button
        onRegisterSuccess={(wallet, obj_data)=>{                                                     //function callback when sign up success
          setToast('Sign up onSuccess');
          console.log("Sign up Success", JSON.stringify({wallet, obj_data}));                      //* wallet is a object, it includes wallet account information
        }}                                                                                           //* obj_data is a object, it include informations to process
        onSuccess={(data)=>{                                                                         //function callback when login success
          setToast('Login Success');
          setLogin(false);
          setCheckLogin(true);
          console.log("Login Success", JSON.stringify(data));
        }}
        onTermsAndConditions={()=>{console.log("Terms And Conditions");}}                            //function callback when press "Terms And Conditions"
        onPrivacyPolicy={()=>{console.log("Privacy Policy");}}                                       //function callback when press "Privacy Policy"
        onImportWallet={()=>{console.log("Import Wallet");}}                                         //function callback when press "Import Wallet"
        onCreateAccount={()=>{console.log("Create Account");}}                                       //function callback when click "Create Account" button
        onCreateBasicAccount={()=>{console.log("Create Basic Account");}}                            //function callback when press "Create Basic Account"
        onGoback={()=>{setLogin(false);}}                                                            //function callback when click back button
      />
    </View>;
  };

  const renderScanQR = () => {
    return (
      <View style={{flex:1, position: 'absolute', width: '100%', height: '100%'}}>
        <ScanQRcode
          goBack={() => {setScanQR(false);}}
          onScanSuccess={async (data) => {
            setContentQR(data);
            setScanQR(false);
            setShowDialog(true);
          }}
        />
      </View>
    );
  };

  const signUp = () => {
    setSignUp(true);
    setLogin(false);
    setVault(false);
  };

  const login = () => {
    setSignUp(false);
    setLogin(true);
    setVault(false);
  };

  const addDocument = () => {
    setSignUp(false);
    setLogin(false);
    setVault(true);
  };

  const vql = () => {
    setScanQR(true);
  };

  const test = async () => {
    // const licenseInfo = await AsyncStorage.getItem('licenseInfo');
    // console.log("Quang log test licenseInfo", licenseInfo);
    const userInfo = await SHRSdk.getUserInfo();
    console.log("Quang log test userInfo", userInfo);
  };

  const renderButton = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={[styles.btn, item?.disable ? {backgroundColor: '#DDDDDD'} : {}]}
        onPress={item.onPress}
        disabled={item.disable}
      >
        <Text style={styles.btnText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const listButton = [
    {name: 'Sign Up', onPress: signUp},
    {name: 'Login', onPress: login},
    {name: 'Add Document', onPress: addDocument, disable: !isCheckLogin},
    {name: 'VQL', onPress: vql, disable: !isCheckLogin || !isCheckListDoc},
    // {name: 'Test', onPress: test},
  ];

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"#fff"}
        translucent={true}
      />
      {
        !isVault && !isLogin && !isSignUp && <View style={styles.container}>
          {
            listButton.map((item, index) => {
              return renderButton(item, index);
            })
          }
        </View>
      }
      {isVault && renderVault()}
      {isLogin && renderLogin()}
      {isSignUp && renderSignUp()}
      {isScanQR && renderScanQR()}
      {
        isLoading && <View style={styles.containerLoading}>
          <View style={{width: 90, height: 90, borderRadius: 16, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#666666" style={{width: "100%", height: 40}}/>
          </View>
        </View>
      }
      <SHRSdk.DialogCheckQuery
        showDialog={isShowDialog}
        id={contentQR}
        onPressOk={(data)=>{console.log("onPressOk data", data);}}
      />
      <Toast
        isShow={showToast}
        type={msgToast.type}
        msg={msgToast.msg}
        onClose={() => {
          setShowToast(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: "100%",
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
  },
  btn: {
    width: "80%",
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#33f',
    marginTop:20,
  },
  btnText: {color: "#fff", fontWeight: "bold"},
  containerLoading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#00000050',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
