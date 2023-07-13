import React, {useState} from 'react';
import * as SHRSdk from 'shr-vaults';
import { saveShareRingOther } from 'shr-vaults/helpers/common';
import { Alert } from "react-native";


const options = {
  iosPathGroup: '',
  primaryColor: '#EF5DA8',
  secondaryColor: '#ffffff',
  headerLogo: require('./assets/SAMPLE_LOGO.png'),
};
const clientId = "791bb781-e29f-4c76-843e-621e2789df41";
const clientSecret = "cf9e5f55f86d9a9662e114b790d01089e6e81017c96dff83edfd5580f531b2cf";
const HOST ='https://api.testenv.sharetoken.io';

//
export default function () {
  const [initSuccess, setInitSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // init
  async function init() {
    try {
      setLoading(true);
      const isSuccess = await SHRSdk.init(clientId, clientSecret, options, HOST);
      console.log('-------------init', isSuccess);
      setInitSuccess(isSuccess);
      setLoading(false);
    } catch (e) {
      console.error('------------------init error', e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  //login
  function login(onSuccess) {
    try {
      SHRSdk.login(async (isSuccess) => {
        if (isSuccess) {
          onSuccess && onSuccess();
        } else {
          Alert.alert('Login failed')
        }
      });
    } catch (e) {
      console.log('---login:ER', e);
    }
  }

  // signup
  function signup(onSuccess) {
    try {
      SHRSdk.signup(async (isSuccess) => {
        if (isSuccess) {
          //
          onSuccess && onSuccess();
        } else {
          Alert.alert('Create failed')
        }
      });
    } catch (e) {
      console.log('---signup:ER', e);
    }
  }

  // removeData
  async function removeAccount() {
    try {
      await SHRSdk.removeAccount();
    } catch (e) {
      console.log('---removeData', e);
    }
  }

  // addDocument
  function addDocument(onSuccess) {
    SHRSdk.addDocument(async ({ success, error }) => {
      if (success) {
        onSuccess && onSuccess();
      } else {
        console.log('---addDocument', error);
      }
    });
  }

  // getDocuments
 async function getDocuments() {
   try {
     return await SHRSdk.getAllDocuments();
   }catch (e) {
     console.error('----getAllDocuments',e)
   }
  }

  //
  async function updateKycBasicInfo(data) {
    try {
      await saveShareRingOther(data, 'basic');
    } catch (e) {
      console.error('---saveShareRingOther', e);
    }
  }

  // getBasicInfo
  async function getBasicInfo() {
    try {
      return await SHRSdk.getBasicInfo();
    } catch (e) {
      return null;
    }
  }

  // getUserInfo
  async function getUserInfo() {
    try {
      return await SHRSdk.getUserInfo();
    } catch (e) {
      console.log('---getUserInfo', e);
      return null;
    }
  }

  //------------>RETURN
  return {
    initSuccess,
    getDocuments,
    login,
    signup,
    init,
    getUserInfo,
    getBasicInfo,
    updateKycBasicInfo,
    addDocument,
    removeAccount,
    loading
  };
}
