const initialState = {
  reviews: {},
  showRateReview: false,
  loadingReview: false,
  showMoreReview: false,
  pageReview: 0,
  loadingMoreReview: false,
  allReviews: {},
  showMoreAllReview: false,
  pageAllReview: 0,
  loadingMoreAllReview: false,
  userReviews: {},
  deleteReview: false,
  editReview: false,
  loadingEditReview: false,
  showUserReview: false,
  loadingUserReview: false,
  showMoreUserReview: false,
  pageUserReview: 0,
  loadingMoreUserReview: false,
};

export const ReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REVIEW_DATA':
      return {...state, reviews: action.payload};
    case 'SHOW_MORE_REVIEW':
      return {...state, showMoreReview: action.payload};
    case 'PAGE_REVIEW':
      return {...state, pageReview: action.payload};
    case 'SHOW_LOADING_REVIEW':
      return {...state, loadingReview: action.payload};
    case 'SHOW_RATE_REVIEW':
      return {...state, showRateReview: action.payload};
    case 'ALL_REVIEW_DATA':
      return {...state, allReviews: action.payload};
    case 'MORE_ALL_REVIEW_DATA':
      return {...state, allReviews: [...state.allReviews, ...action.payload]};
    case 'SHOW_MORE_ALL_REVIEW':
      return {...state, showMoreAllReview: action.payload};
    case 'PAGE_ALL_REVIEW':
      return {...state, pageAllReview: action.payload};
    case 'SHOW_LOADING_MORE_ALL_REVIEW':
      return {...state, loadingMoreAllReview: action.payload};
    case 'SHOW_USER_REVIEW':
      return {...state, showUserReview: action.payload};
    case 'ALL_USER_REVIEW':
      return {...state, userReviews: action.payload};
    case 'MORE_USER_REVIEW_DATA':
      return {...state, userReviews: [...state.userReviews, ...action.payload]};
    case 'SHOW_MORE_USER_REVIEW':
      return {...state, showMoreUserReview: action.payload};
    case 'PAGE_USER_REVIEW':
      return {...state, pageUserReview: action.payload};
    case 'SHOW_LOADING_MORE_USER_REVIEW':
      return {...state, loadingMoreUserReview: action.payload};
    case 'SHOW_DELETE_REVIEW':
      return {...state, deleteReview: action.payload};
    case 'LOADING_ALL_USER_REVIEW':
      return {...state, loadingUserReview: action.payload};
    case 'SHOW_EDIT_REVIEW':
      return {...state, editReview: action.payload};
    case 'SHOW_LOADING_EDIT_REVIEW':
      return {...state, loadingEditReview: action.payload};
    default:
      return state;
  }
};
