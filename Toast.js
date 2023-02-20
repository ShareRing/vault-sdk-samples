/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Text, Animated, Dimensions} from 'react-native';

const fullWidth = Dimensions.get('window').width;
const heightToast = 110;

function Toast(props) {
  const [data, setData] = useState({
    isShow: false,
    type: 0,
    msg: 'Test',
  });
  const fadeAnim = useRef(new Animated.Value(-heightToast)).current;
  useEffect(() => {
    if (props.isShow !== data.isShow && props.isShow) {
      openToast();
      setData({
        isShow: props.isShow,
        type: props.type,
        msg: props.msg,
      });
    } else {
      closeToast();
    }
  }, [props.isShow]);

  const openToast = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      closeToast();
    }, 3300);
  };

  const closeToast = () => {
    setTimeout(() => {
      setData({
        isShow: false,
        type: 0,
        msg: 'Test',
      });
    }, 1000);
    Animated.timing(fadeAnim, {
      toValue: -heightToast,
      duration: 300,
      useNativeDriver: false,
    }).start();
    props?.onClose && props.onClose();
  };

  const renderSuccessToast = () => {
    return (
      <View style={styles.contaierSuccessToast}>
        <View style={styles.containerContent}>
          <Text style={styles.txtContent}>{data.msg}</Text>
        </View>
      </View>
    );
  };

  const renderErrorToast = () => {
    return (
      <View style={styles.contaierErrorToast}>
        <View style={styles.containerContent}>
          <Text style={styles.txtContent}>{data.msg}</Text>
        </View>
      </View>
    );
  };

  return (
    <Animated.View style={[styles.container, {top: fadeAnim}]}>
      {data.type === 1 && renderSuccessToast()}
      {data.type === 0 && renderErrorToast()}
    </Animated.View>
  );
}

export default Toast;

const styles = StyleSheet.create({
  container: {
    width: fullWidth,
    height: heightToast,
    position: 'absolute',
    alignItems: 'center',
  },
  contaierSuccessToast: {
    width: '90%',
    height: 60,
    borderRadius: 16,
    backgroundColor: '#48C4A1',
    position: 'absolute',
    bottom: 0,
  },
  contaierErrorToast: {
    width: '90%',
    height: 60,
    borderRadius: 16,
    backgroundColor: '#FF6057',
    position: 'absolute',
    bottom: 0,
  },
  containerContent: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  txtContent: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
});
