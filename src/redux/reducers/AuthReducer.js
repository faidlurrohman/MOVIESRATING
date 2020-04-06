const initialState = {
  loadingOpen: false,
  modalLogin: false,
  modalRegister: false,
  statusRegister: null,
  modalProfile: false,
  registerLoading: false,
  loginLoading: false,
  userToken: null,
  alertSignout: false,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_LOADING':
      return {...state, loadingOpen: action.payload};
    case 'SHOW_MODAL_LOGIN':
      return {...state, modalLogin: action.payload};
    case 'SHOW_MODAL_REGISTER':
      return {...state, modalRegister: action.payload};
    case 'REGISTER_SUCCESS':
      return {...state, statusRegister: action.payload};
    case 'REGISTER_FAILED':
      return {...state, statusRegister: action.payload};
    case 'SHOW_MODAL_PROFILE':
      return {...state, modalProfile: action.payload};
    case 'SHOW_REGISTER_LOADING':
      return {...state, registerLoading: action.payload};
    case 'SHOW_LOGIN_LOADING':
      return {...state, loginLoading: action.payload};
    case 'USER_TOKEN':
      return {...state, userToken: action.payload};
    case 'SHOW_ALERT_SIGNOUT':
      return {...state, alertSignout: action.payload};
    default:
      return state;
  }
};
