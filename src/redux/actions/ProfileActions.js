import Axios from 'axios';

export const setEditModal = value => {
  return dispatch => {
    dispatch({type: 'SHOW_EDIT_MODAL', payload: value});
  };
};

export const logoutAction = () => {
  return dispatch => {
    dispatch({type: 'USER_DATA', payload: {}});
  };
};

export const getUser = token => {
  return async dispatch => {
    try {
      dispatch({type: 'USER_LOADING', payload: true});
      const responseUser = await Axios.get(
        'https://yang-keren-gitu-napa.herokuapp.com/api/v1/users',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      // console.log(responseUser.data.data);
      dispatch({type: 'USER_LOADING', payload: false});
      dispatch({type: 'USER_DATA', payload: responseUser.data.data});
    } catch (e) {
      dispatch({type: 'USER_LOADING', payload: false});
      console.log('error get data user', e);
    }
  };
};

export const editProfile = (fullname, username, password, token) => {
  console.log(password);
  return async dispatch => {
    try {
      dispatch({type: 'USER_LOADING', payload: true});
      if (password !== null) {
        console.log('editpass');
        const editPass = await Axios.put(
          'https://yang-keren-gitu-napa.herokuapp.com/api/v1/users/update',
          {
            password: password,
          },
          {
            headers: {'Content-Type': 'application/json', Authorization: token},
          },
        );
        // console.log('editPass', editPass);
      }
      const editAllName = await Axios.put(
        'https://yang-keren-gitu-napa.herokuapp.com/api/v1/users/update',
        {
          fullname: fullname,
          username: username,
        },
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
      // console.log('editAllName', editAllName);
      const responseUser = await Axios.get(
        'https://yang-keren-gitu-napa.herokuapp.com/api/v1/users',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      // console.log(responseUser.data);
      dispatch({type: 'USER_DATA', payload: responseUser.data.data});
      dispatch({type: 'SHOW_EDIT_MODAL', payload: false});
      dispatch({type: 'USER_LOADING', payload: false});
    } catch (e) {
      dispatch({type: 'SHOW_EDIT_MODAL', payload: false});
      dispatch({type: 'USER_LOADING', payload: false});
      console.log('error edit data user', e);
    }
  };
};

export const uploadImage = (token, response) => {
  return async dispatch => {
    try {
      dispatch({type: 'IMAGE_LOADING', payload: true});
      const dataForm = new FormData();
      dataForm.append('image', {
        uri: response.uri,
        type: response.type,
        name: response.fileName,
      });
      const uploadImageProfile = await Axios.put(
        'https://yang-keren-gitu-napa.herokuapp.com/api/v1/users/uploadPhoto',
        dataForm,
        {
          headers: {
            accept: 'image/png',
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        },
      );
      // console.log(uploadImageProfile.data.data.image);
      const responseUser = await Axios.get(
        'https://yang-keren-gitu-napa.herokuapp.com/api/v1/users',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      // console.log(responseUser.data);
      dispatch({type: 'IMAGE_LOADING', payload: false});
      dispatch({type: 'USER_DATA', payload: responseUser.data.data});
    } catch (e) {
      dispatch({type: 'IMAGE_LOADING', payload: false});
      console.log('error upload image', e);
    }
  };
};
