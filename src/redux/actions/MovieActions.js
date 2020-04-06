import Axios from 'axios';
import {ToastAndroid} from 'react-native';
import {setChooseCategory} from './SearchActions';

export const setDetailMovie = value => {
  return dispatch => {
    dispatch({type: 'SHOW_DETAIL_MOVIE', payload: value});
  };
};

export const setAddMovie = value => {
  return dispatch => {
    dispatch({type: 'SHOW_ADD_MOVIE', payload: value});
  };
};

export const setReviewMovie = value => {
  return dispatch => {
    dispatch({type: 'SHOW_REVIEW_MOVIE', payload: value});
  };
};

export const setShowDelete = value => {
  return dispatch => {
    dispatch({type: 'SHOW_DELETE', payload: value});
  };
};

export const setShowEdit = value => {
  return dispatch => {
    dispatch({type: 'SHOW_EDIT', payload: value});
  };
};

export const addMovie = (
  title,
  poster,
  synopsis,
  release,
  director,
  song,
  category,
  budget,
  token,
) => {
  return async dispatch => {
    try {
      dispatch({type: 'SHOW_LOADING_ADD', payload: true});
      const responseAddMovie = await Axios.post(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/movies`,
        {
          title: title,
          synopsis: synopsis,
          releaseDate: release,
          director: director,
          featuredSong: song,
          category: category,
          budget: budget,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      // console.log('movie', responseAddMovie.data);
      if (poster !== '') {
        let currentIdMovie = responseAddMovie.data.data._id;
        let formPoster = new FormData();
        formPoster.append('image', {
          uri: poster.uri,
          type: poster.type,
          name: poster.fileName,
        });
        try {
          const uploadPoster = await Axios.put(
            `https://yang-keren-gitu-napa.herokuapp.com/api/v1/movies/uploadPhoto/${currentIdMovie}`,
            formPoster,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token,
              },
            },
          );
          await dispatch(getMovie());
          ToastAndroid.show('Movie added!', ToastAndroid.SHORT);
          // console.log('upload', uploadPoster.data);
          dispatch({type: 'SHOW_LOADING_ADD', payload: false});
          dispatch({type: 'SHOW_ADD_MOVIE', payload: false});
        } catch (e) {
          ToastAndroid.show('Please try again!', ToastAndroid.SHORT);
          dispatch({type: 'SHOW_LOADING_ADD', payload: false});
          console.log('error upload poster', e);
        }
      } else {
        await dispatch(getMovie());
        ToastAndroid.show('Movie added!', ToastAndroid.SHORT);
        dispatch({type: 'SHOW_LOADING_ADD', payload: false});
        dispatch({type: 'SHOW_ADD_MOVIE', payload: false});
      }
    } catch (e) {
      dispatch({type: 'SHOW_LOADING_ADD', payload: false});
      ToastAndroid.show('Please try again!', ToastAndroid.SHORT);
      console.log('error add movie', e);
    }
  };
};

export const getMovie = () => {
  return async dispatch => {
    try {
      const responseMovie = await Axios.get(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/movies`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(responseMovie.data.data);
      dispatch({type: 'MOVIE_DATA', payload: responseMovie.data.data.docs});
      dispatch({type: 'LOADING_MOVIE', payload: false});
      if (responseMovie.data.data.hasNextPage === true) {
        // console.log(responseMovie.data.data.hasNextPage);
        dispatch({
          type: 'SHOW_MORE',
          payload: responseMovie.data.data.hasNextPage,
        });
        // console.log(responseMovie.data.data.nextPage);
        dispatch({
          type: 'PAGE_MOVIE',
          payload: responseMovie.data.data.nextPage,
        });
      } else {
        dispatch({type: 'SHOW_MORE', payload: false});
      }
    } catch (e) {
      console.log('error get data movie', e);
    }
  };
};

export const getMoreMovie = moreMovie => {
  return async dispatch => {
    dispatch({type: 'MOVIE_MORE_LOADING', payload: true});
    try {
      const responseMoreMovie = await Axios.get(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/movies?page=${moreMovie}&limit=10`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(responseMoreMovie.data.data);
      dispatch({
        type: 'MOVIE_MORE_DATA',
        payload: responseMoreMovie.data.data.docs,
      });
      dispatch({type: 'MOVIE_MORE_LOADING', payload: false});
      if (responseMoreMovie.data.data.hasNextPage === true) {
        dispatch({
          type: 'SHOW_MORE',
          payload: responseMoreMovie.data.data.hasNextPage,
        });
        dispatch({
          type: 'PAGE_MOVIE',
          payload: responseMoreMovie.data.data.nextPage,
        });
        dispatch({type: 'MOVIE_MORE_LOADING', payload: false});
      } else {
        dispatch({type: 'MOVIE_MORE_LOADING', payload: false});
        dispatch({type: 'SHOW_MORE', payload: false});
      }
    } catch (e) {
      console.log('error get data movie', e);
    }
  };
};

export const getDetail = id => {
  return async dispatch => {
    try {
      dispatch({type: 'SHOW_DETAIL_MOVIE', payload: true});
      dispatch({type: 'SHOW_DETAIL_LOADING', payload: true});
      const responseDetail = await Axios.get(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/movies/show/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(responseDetail.data.data.docs[0]);
      dispatch({
        type: 'MOVIE_DETAIL',
        payload: responseDetail.data.data.docs[0],
      });
      // console.log(responseDetail.data.data.docs[0].title);
      const responseReview = await Axios.get(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/reviews?movie=${responseDetail.data.data.docs[0].title}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(responseReview.data.data);
      dispatch({
        type: 'MOVIE_DETAIL_REVIEW',
        payload: responseReview.data.data,
      });
      dispatch({type: 'SHOW_DETAIL_LOADING', payload: false});
    } catch (e) {
      dispatch({type: 'SHOW_DETAIL_LOADING', payload: false});
      dispatch({type: 'SHOW_DETAIL_MOVIE', payload: false});
      console.log('error get detail movie', e);
    }
  };
};

export const sendRateReview = (idMovie, title, rateReview, comment, token) => {
  // console.log(idMovie, title, rateReview, comment, token);
  return async dispatch => {
    try {
      // let rate = (rateReview / 2) | 0;
      dispatch({type: 'SHOW_LOADING_SEND_REVIEW', payload: true});
      const responseReview = await Axios.post(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/reviews/${idMovie}`,
        {
          movie: title,
          review: comment,
          rating: rateReview,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      // console.log(responseReview.data);
      ToastAndroid.show(
        `Thanks for having a time to sumbit your review!`,
        ToastAndroid.SHORT,
      );
      await dispatch(getMovie());
      dispatch({type: 'SHOW_LOADING_SEND_REVIEW', payload: false});
      dispatch({type: 'SHOW_REVIEW_MOVIE', payload: false});
      dispatch({type: 'SHOW_DETAIL_MOVIE', payload: false});
      dispatch(setChooseCategory(false));
    } catch (e) {
      dispatch({type: 'SHOW_LOADING_SEND_REVIEW', payload: false});
      ToastAndroid.show(
        `Sorry, you've already review for this movie!`,
        ToastAndroid.SHORT,
      );
      console.log('error send rate & review movie', e);
    }
  };
};

export const getEditMovie = id => {
  return async dispatch => {
    try {
      dispatch({type: 'SHOW_LOADING_EDIT', payload: true});
      dispatch({type: 'SHOW_EDIT', payload: true});
      const responseEditData = await Axios.get(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/movies/show/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(responseEditData.data);
      dispatch({type: 'SHOW_LOADING_EDIT', payload: false});
      dispatch({
        type: 'DATA_EDIT',
        payload: responseEditData.data.data.docs[0],
      });
    } catch (e) {
      // dispatch({type: 'SHOW_DELETE_LOADING', payload: false});
      console.log('error get data edit movie', e);
    }
  };
};

export const editMovie = (
  id,
  token,
  titleEdit,
  synopsisEdit,
  dateEdit,
  directorEdit,
  songEdit,
  categoryEdit,
  budgetEdit,
  posterEdit,
  posterOld,
) => {
  return async dispatch => {
    try {
      if (posterOld !== posterEdit) {
        dispatch({type: 'SHOW_LOADING_EDIT', payload: true});
        const responseEditMovie = await Axios.put(
          `https://yang-keren-gitu-napa.herokuapp.com/api/v1/movies/update/${id}`,
          {
            title: titleEdit,
            synopsis: synopsisEdit,
            releaseDate: dateEdit,
            director: directorEdit,
            featuredSong: songEdit,
            category: categoryEdit,
            budget: budgetEdit,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          },
        );
        // console.log('edit data exclude poster', responseEditMovie.data);
        let formEditPoster = new FormData();
        formEditPoster.append('image', {
          uri: posterEdit.uri,
          type: posterEdit.type,
          name: posterEdit.fileName,
        });
        const editPoster = await Axios.put(
          `https://yang-keren-gitu-napa.herokuapp.com/api/v1/movies/uploadPhoto/${id}`,
          formEditPoster,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: token,
            },
          },
        );
        // console.log('edit poster', editPoster.data);
        await dispatch(getMovie());
        ToastAndroid.show('Movie edited!', ToastAndroid.SHORT);
        dispatch({type: 'SHOW_LOADING_EDIT', payload: false});
        dispatch({type: 'SHOW_EDIT', payload: false});
        dispatch({type: 'SHOW_DETAIL_MOVIE', payload: false});
        dispatch(setChooseCategory(false));
      } else {
        dispatch({type: 'SHOW_LOADING_EDIT', payload: true});
        const responseEditMovie = await Axios.put(
          `https://yang-keren-gitu-napa.herokuapp.com/api/v1/movies/update/${id}`,
          {
            title: titleEdit,
            synopsis: synopsisEdit,
            releaseDate: dateEdit,
            director: directorEdit,
            featuredSong: songEdit,
            category: categoryEdit,
            budget: budgetEdit,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          },
        );
        // console.log('edit data exclude poster', responseEditMovie.data);
        await dispatch(getMovie());
        ToastAndroid.show('Movie edited!', ToastAndroid.SHORT);
        dispatch({type: 'SHOW_LOADING_EDIT', payload: false});
        dispatch({type: 'SHOW_EDIT', payload: false});
        dispatch({type: 'SHOW_DETAIL_MOVIE', payload: false});
        dispatch(setChooseCategory(false));
      }
    } catch (e) {
      dispatch({type: 'SHOW_LOADING_EDIT', payload: false});
      ToastAndroid.show(`Edit movie failed!`, ToastAndroid.SHORT);
      console.log('error edit movie', e);
    }
  };
};

export const deleteMovie = (id, token) => {
  return async dispatch => {
    try {
      dispatch({type: 'SHOW_DELETE_LOADING', payload: true});
      const responseDelete = await Axios.delete(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/movies/delete/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      dispatch({type: 'SHOW_DELETE', payload: false});
      dispatch({type: 'SHOW_DELETE_LOADING', payload: false});
      dispatch({type: 'SHOW_DETAIL_MOVIE', payload: false});
      dispatch(setChooseCategory(false));
      if (responseDelete.data.status === true) {
        await dispatch(getMovie());
        ToastAndroid.show(`Movie has been deleted!`, ToastAndroid.SHORT);
      }
    } catch (e) {
      dispatch({type: 'SHOW_DELETE', payload: false});
      dispatch({type: 'SHOW_DELETE_LOADING', payload: false});
      console.log('error delete movie', e);
    }
  };
};
