import Axios from 'axios';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {logoutAction} from './ProfileActions';

export const setLoadingOpen = value => {
  return dispatch => {
    dispatch({type: 'SHOW_LOADING', payload: value});
  };
};

export const setModalLogin = value => {
  return dispatch => {
    dispatch({type: 'SHOW_MODAL_LOGIN', payload: value});
  };
};

export const setModalProfile = value => {
  return dispatch => {
    dispatch({type: 'SHOW_MODAL_PROFILE', payload: value});
  };
};

export const setModalRegister = value => {
  return dispatch => {
    dispatch({type: 'SHOW_MODAL_REGISTER', payload: value});
  };
};

export const setAlertSignout = value => {
  return dispatch => {
    dispatch({type: 'SHOW_ALERT_SIGNOUT', payload: value});
  };
};

export const registerUser = (fullname, username, email, password) => {
  return async dispatch => {
    try {
      dispatch({type: 'SHOW_REGISTER_LOADING', payload: true});
      const responseRegister = await Axios.post(
        'https://yang-keren-gitu-napa.herokuapp.com/api/v1/users',
        {
          fullname: fullname,
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {'Content-Type': 'application/json'},
        },
      );
      // console.log(responseRegister.data);
      await AsyncStorage.setItem(
        '@token',
        JSON.stringify(responseRegister.data.data.token),
      );
      dispatch({type: 'USER_TOKEN', payload: responseRegister.data.data.token});
      dispatch({type: 'SHOW_MODAL_LOGIN', payload: false});
      dispatch({type: 'SHOW_REGISTER_LOADING', payload: false});
    } catch (e) {
      dispatch({type: 'SHOW_REGISTER_LOADING', payload: false});
      dispatch({type: 'REGISTER_FAILED', payload: 'Failed'});
      console.log('error register', e);
    }
  };
};

export const loginUser = (usernameOrEmail, password) => {
  return async dispatch => {
    // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // console.log(re.test(String(usernameOrEmail).toLowerCase()));
    try {
      dispatch({type: 'SHOW_LOGIN_LOADING', payload: true});
      if (usernameOrEmail.includes('@')) {
        const responseLogin = await Axios.put(
          'https://yang-keren-gitu-napa.herokuapp.com/api/v1/users',
          {
            email: usernameOrEmail,
            password: password,
          },
          {
            headers: {'Content-Type': 'application/json'},
          },
        );
        // console.log(responseLogin.data);
        await AsyncStorage.setItem(
          '@token',
          JSON.stringify(responseLogin.data.data),
        );
        ToastAndroid.show('Success login!', ToastAndroid.SHORT);
        dispatch({type: 'USER_TOKEN', payload: responseLogin.data.data});
        dispatch({type: 'SHOW_LOGIN_LOADING', payload: false});
        dispatch({type: 'SHOW_MODAL_LOGIN', payload: false});
      } else {
        const responseLogin = await Axios.put(
          'https://yang-keren-gitu-napa.herokuapp.com/api/v1/users',
          {
            username: usernameOrEmail,
            password: password,
          },
          {
            headers: {'Content-Type': 'application/json'},
          },
        );
        // console.log(responseLogin.data);
        await AsyncStorage.setItem(
          '@token',
          JSON.stringify(responseLogin.data.data),
        );
        ToastAndroid.show('Success login!', ToastAndroid.SHORT);
        dispatch({type: 'USER_TOKEN', payload: responseLogin.data.data});
        dispatch({type: 'SHOW_LOGIN_LOADING', payload: false});
        dispatch({type: 'SHOW_MODAL_LOGIN', payload: false});
      }
    } catch (e) {
      ToastAndroid.show('Please try again!', ToastAndroid.SHORT);
      dispatch({type: 'SHOW_LOGIN_LOADING', payload: false});
      console.log('error login', e);
    }
  };
};

export const setCredential = () => {
  return async dispatch => {
    await AsyncStorage.getItem('@token', (error, response) => {
      if (response) {
        let resultToken = JSON.parse(response);
        dispatch({type: 'USER_TOKEN', payload: resultToken});
      }
    });
  };
};

export const deleteCredential = () => {
  return async dispatch => {
    try {
      await AsyncStorage.clear();
      await dispatch(logoutAction());
      dispatch({type: 'USER_TOKEN', payload: null});
      dispatch({type: 'SHOW_MODAL_PROFILE', payload: false});
      dispatch({type: 'SHOW_ALERT_SIGNOUT', payload: false});
    } catch (e) {
      console.log('error clear token', e);
    }
  };
};
