const initialState = {
  queryCategory: {},
  showChooseCategory: false,
  nameTab: null,
  categoryLoading: false,
  showMoreCategory: false,
  pageCategory: 0,
  loadingMoreCategory: false,

  showSearch: false,
  loadingSearch: false,
  allMovies: {},
};

export const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_CHOOSE_CATEGORY':
      return {...state, showChooseCategory: action.payload};
    case 'QUERY_DATA_CATEGORY':
      return {...state, queryCategory: action.payload};
    case 'NAME_TAB_CATEGORY':
      return {...state, nameTab: action.payload};
    case 'SHOW_LOADING_CATEGORY':
      return {...state, categoryLoading: action.payload};
    case 'SHOW_MORE_CATEGORY':
      return {...state, showMoreCategory: action.payload};
    case 'PAGE_MOVIE_CATEGORY':
      return {...state, pageCategory: action.payload};
    case 'SHOW_LOADING_MORE_CATEGORY':
      return {...state, loadingMoreCategory: action.payload};
    case 'CATEGORY_MORE_DATA':
      return {
        ...state,
        queryCategory: [...state.queryCategory, ...action.payload],
      };
    case 'SHOW_SEARCH':
      return {...state, showSearch: action.payload};
    case 'SHOW_LOADING_SEARCH':
      return {...state, loadingSearch: action.payload};
    case 'ALL_MOVIES':
      return {...state, allMovies: action.payload};
    default:
      return state;
  }
};
