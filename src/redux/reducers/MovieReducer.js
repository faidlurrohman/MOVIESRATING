const initialState = {
  loadingMovie: true,
  movies: {},
  showMore: false,
  pageMovie: 0,
  loadingMore: false,
  details: {},
  detailReview: {},
  detailMovie: false,
  reviewMovie: false,
  addMovie: false,
  loadingAdd: false,
  loadingSendReview: false,
  detailLoading: true,
  showDelete: false,
  loadingDelete: false,
  showEdit: false,
  loadingEdit: false,
  dataEdit: {},
};

export const MovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_MOVIE':
      return {...state, loadingMovie: action.payload};
    case 'MOVIE_DATA':
      return {...state, movies: action.payload};
    case 'SHOW_MORE':
      return {...state, showMore: action.payload};
    case 'PAGE_MOVIE':
      return {...state, pageMovie: action.payload};
    case 'MOVIE_MORE_LOADING':
      return {...state, loadingMore: action.payload};
    case 'MOVIE_MORE_DATA':
      return {...state, movies: [...state.movies, ...action.payload]};
    case 'SHOW_DETAIL_MOVIE':
      return {...state, detailMovie: action.payload};
    case 'MOVIE_DETAIL':
      return {...state, details: action.payload};
    case 'SHOW_DETAIL_LOADING':
      return {...state, detailLoading: action.payload};
    case 'MOVIE_DETAIL_REVIEW':
      return {...state, detailReview: action.payload};
    case 'SHOW_REVIEW_MOVIE':
      return {...state, reviewMovie: action.payload};
    case 'SHOW_ADD_MOVIE':
      return {...state, addMovie: action.payload};
    case 'SHOW_LOADING_ADD':
      return {...state, loadingAdd: action.payload};
    case 'SHOW_LOADING_SEND_REVIEW':
      return {...state, loadingSendReview: action.payload};
    case 'SHOW_DELETE':
      return {...state, showDelete: action.payload};
    case 'SHOW_DELETE_LOADING':
      return {...state, loadingDelete: action.payload};
    case 'SHOW_EDIT':
      return {...state, showEdit: action.payload};
    case 'SHOW_LOADING_EDIT':
      return {...state, loadingEdit: action.payload};
    case 'DATA_EDIT':
      return {...state, dataEdit: action.payload};
    default:
      return state;
  }
};
