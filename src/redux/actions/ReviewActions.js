import Axios from 'axios';
import {ToastAndroid} from 'react-native';

export const setShowRateReview = value => {
  return dispatch => {
    dispatch({type: 'SHOW_RATE_REVIEW', payload: value});
  };
};

export const setShowUserReview = value => {
  return dispatch => {
    dispatch({type: 'SHOW_USER_REVIEW', payload: value});
  };
};

export const setShowDeleteReview = value => {
  return dispatch => {
    dispatch({type: 'SHOW_DELETE_REVIEW', payload: value});
  };
};

export const setShowEditReview = value => {
  return dispatch => {
    dispatch({type: 'SHOW_EDIT_REVIEW', payload: value});
  };
};

export const getAllReviewMovieId = movieTitle => {
  return async dispatch => {
    try {
      dispatch({type: 'SHOW_RATE_REVIEW', payload: true});
      dispatch({type: 'SHOW_LOADING_REVIEW', payload: true});
      const responseAllReviewById = await Axios.get(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/reviews?movie=${movieTitle}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(responseAllReviewById.data.data);
      dispatch({
        type: 'REVIEW_DATA',
        payload: responseAllReviewById.data.data.docs,
      });
      if (responseAllReviewById.data.data.hasNextPage === true) {
        // console.log(responseAllReviewById.data.data.hasNextPage);
        dispatch({
          type: 'SHOW_MORE_REVIEW',
          payload: responseAllReviewById.data.data.hasNextPage,
        });
        // console.log(responseAllReviewById.data.data.nextPage);
        dispatch({
          type: 'PAGE_REVIEW',
          payload: responseAllReviewById.data.data.nextPage,
        });
      } else {
        dispatch({type: 'SHOW_MORE_REVIEW', payload: false});
      }
      dispatch({type: 'SHOW_LOADING_REVIEW', payload: false});
    } catch (e) {
      dispatch({type: 'SHOW_LOADING_REVIEW', payload: false});
      console.log('error get review movie id', e);
    }
  };
};

export const getAllReview = () => {
  return async dispatch => {
    try {
      const responseAllReview = await Axios.get(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/reviews`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(responseAllReview.data.data);
      dispatch({
        type: 'ALL_REVIEW_DATA',
        payload: responseAllReview.data.data.docs,
      });
      if (responseAllReview.data.data.hasNextPage === true) {
        // console.log(responseAllReview.data.data.hasNextPage);
        dispatch({
          type: 'SHOW_MORE_ALL_REVIEW',
          payload: responseAllReview.data.data.hasNextPage,
        });
        // console.log(responseAllReview.data.data.nextPage);
        dispatch({
          type: 'PAGE_ALL_REVIEW',
          payload: responseAllReview.data.data.nextPage,
        });
      } else {
        dispatch({type: 'SHOW_MORE_ALL_REVIEW', payload: false});
      }
    } catch (e) {
      console.log('error get all review movie', e);
    }
  };
};

export const getMoreAllReview = moreAllReview => {
  return async dispatch => {
    dispatch({type: 'SHOW_LOADING_MORE_ALL_REVIEW', payload: true});
    try {
      const responseMoreAllReview = await Axios.get(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/reviews?page=${moreAllReview}&limit=10`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(responseAllReview.data.data);
      dispatch({
        type: 'MORE_ALL_REVIEW_DATA',
        payload: responseMoreAllReview.data.data.docs,
      });
      dispatch({type: 'SHOW_LOADING_MORE_ALL_REVIEW', payload: false});
      if (responseMoreAllReview.data.data.hasNextPage === true) {
        dispatch({
          type: 'SHOW_MORE_ALL_REVIEW',
          payload: responseMoreAllReview.data.data.hasNextPage,
        });
        dispatch({
          type: 'PAGE_ALL_REVIEW',
          payload: responseMoreAllReview.data.data.nextPage,
        });
        dispatch({type: 'SHOW_LOADING_MORE_ALL_REVIEW', payload: false});
      } else {
        dispatch({type: 'SHOW_LOADING_MORE_ALL_REVIEW', payload: false});
        dispatch({type: 'SHOW_MORE_ALL_REVIEW', payload: false});
      }
    } catch (e) {
      console.log('error get more all review movie', e);
    }
  };
};

export const getAllUserReview = idUser => {
  return async dispatch => {
    try {
      dispatch({type: 'SHOW_USER_REVIEW', payload: true});
      dispatch({type: 'LOADING_ALL_USER_REVIEW', payload: true});
      const responseAllUserReview = await Axios.get(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/reviews?_id=${idUser}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(responseAllUserReview.data.data);
      dispatch({
        type: 'ALL_USER_REVIEW',
        payload: responseAllUserReview.data.data.docs,
      });
      if (responseAllUserReview.data.data.hasNextPage === true) {
        // console.log(responseAllUserReview.data.data.hasNextPage);
        dispatch({
          type: 'SHOW_MORE_USER_REVIEW',
          payload: responseAllUserReview.data.data.hasNextPage,
        });
        // console.log(responseAllReviewById.data.data.nextPage);
        dispatch({
          type: 'PAGE_USER_REVIEW',
          payload: responseAllUserReview.data.data.nextPage,
        });
      } else {
        dispatch({type: 'SHOW_MORE_USER_REVIEW', payload: false});
      }
      dispatch({type: 'LOADING_ALL_USER_REVIEW', payload: false});
    } catch (e) {
      dispatch({type: 'LOADING_ALL_USER_REVIEW', payload: false});
      console.log('error get all review user movie', e);
    }
  };
};

export const getMoreUserReview = (idUser, moreUserReview) => {
  // console.log(idUser, moreUserReview);
  return async dispatch => {
    dispatch({type: 'SHOW_LOADING_MORE_USER_REVIEW', payload: true});
    try {
      const responseMoreUserReview = await Axios.get(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/reviews?_id=${idUser}&page=${moreUserReview}&limit=10`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(responseMoreUserReview.data.data);
      dispatch({
        type: 'MORE_USER_REVIEW_DATA',
        payload: responseMoreUserReview.data.data.docs,
      });
      dispatch({type: 'SHOW_LOADING_MORE_USER_REVIEW', payload: false});
      if (responseMoreUserReview.data.data.hasNextPage === true) {
        dispatch({
          type: 'SHOW_MORE_USER_REVIEW',
          payload: responseMoreUserReview.data.data.hasNextPage,
        });
        dispatch({
          type: 'PAGE_USER_REVIEW',
          payload: responseMoreUserReview.data.data.nextPage,
        });
        dispatch({type: 'SHOW_LOADING_MORE_USER_REVIEW', payload: false});
      } else {
        dispatch({type: 'SHOW_LOADING_MORE_USER_REVIEW', payload: false});
        dispatch({type: 'SHOW_MORE_USER_REVIEW', payload: false});
      }
    } catch (e) {
      console.log('error get more user review movie', e);
    }
  };
};

export const editUserReview = (token, idEdit, rateEdit, reviewEdit, userId) => {
  // console.log(token, idEdit, rateEdit, reviewEdit);
  return async dispatch => {
    try {
      dispatch({type: 'SHOW_LOADING_EDIT_REVIEW', payload: true});
      const responseEditUserReview = await Axios.put(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/reviews/${idEdit}`,
        {
          review: reviewEdit,
          rating: rateEdit,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      // console.log(responseEditUserReview.data);
      dispatch({type: 'SHOW_LOADING_EDIT_REVIEW', payload: false});
      dispatch({type: 'SHOW_EDIT_REVIEW', payload: false});
      ToastAndroid.show(`Review is edited!`, ToastAndroid.SHORT);
      dispatch(getAllUserReview(userId));
    } catch (e) {
      dispatch({type: 'SHOW_LOADING_EDIT_REVIEW', payload: false});
      ToastAndroid.show(`Edit failed!`, ToastAndroid.SHORT);
      console.log('error edit review user movie', e);
    }
  };
};

export const deleteReviewUser = (token, idReview, userId) => {
  // console.log(token, idReview, userId);
  return async dispatch => {
    try {
      dispatch({type: 'LOADING_ALL_USER_REVIEW', payload: true});
      const responseDeleteUserReview = await Axios.delete(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/reviews/${idReview}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      // console.log(responseDeleteUserReview.data);
      dispatch({type: 'LOADING_ALL_USER_REVIEW', payload: false});
      dispatch({type: 'SHOW_DELETE_REVIEW', payload: false});
      ToastAndroid.show(`Review is deleted!`, ToastAndroid.SHORT);
      dispatch(getAllUserReview(userId));
    } catch (e) {
      dispatch({type: 'LOADING_ALL_USER_REVIEW', payload: false});
      dispatch({type: 'SHOW_DELETE_REVIEW', payload: false});
      ToastAndroid.show(`Delete failed!`, ToastAndroid.SHORT);
      console.log('error delete review user movie', e);
    }
  };
};
