const initialState = {
  user: {},
  userLoading: false,
  userImage: undefined,
  imageLoading: false,
  editModal: false,
};

export const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOADING':
      return {...state, userLoading: action.payload};
    case 'USER_DATA':
      return {...state, user: action.payload};
    case 'IMAGE_USER':
      return {...state, userImage: action.payload};
    case 'IMAGE_LOADING':
      return {...state, imageLoading: action.payload};
    case 'SHOW_EDIT_MODAL':
      return {...state, editModal: action.payload};
    default:
      return state;
  }
};
