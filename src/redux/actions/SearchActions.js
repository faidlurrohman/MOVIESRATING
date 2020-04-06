import Axios from 'axios';

export const setChooseCategory = value => {
  return dispatch => {
    dispatch({type: 'SHOW_CHOOSE_CATEGORY', payload: value});
  };
};

export const setShowSearch = value => {
  return dispatch => {
    dispatch({type: 'SHOW_SEARCH', payload: value});
  };
};

export const getCategory = (category, name) => {
  return async dispatch => {
    dispatch({type: 'SHOW_LOADING_CATEGORY', payload: true});
    dispatch({type: 'SHOW_CHOOSE_CATEGORY', payload: true});
    try {
      const responseCategory = await Axios.get(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/movies?category=${category}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(responseCategory.data.data.docs);
      dispatch({
        type: 'QUERY_DATA_CATEGORY',
        payload: responseCategory.data.data.docs,
      });
      dispatch({type: 'SHOW_LOADING_CATEGORY', payload: false});
      dispatch({type: 'NAME_TAB_CATEGORY', payload: name});
      if (responseCategory.data.data.hasNextPage === true) {
        dispatch({
          type: 'SHOW_MORE_CATEGORY',
          payload: responseCategory.data.data.hasNextPage,
        });
        dispatch({
          type: 'PAGE_MOVIE_CATEGORY',
          payload: responseCategory.data.data.nextPage,
        });
      } else {
        dispatch({type: 'SHOW_MORE_CATEGORY', payload: false});
      }
    } catch (e) {
      console.log('error get category movie', e);
    }
  };
};

export const getMoreCategory = (name, moreCategory) => {
  return async dispatch => {
    dispatch({type: 'SHOW_LOADING_MORE_CATEGORY', payload: true});
    try {
      const responseMoreCategory = await Axios.get(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/movies?category=${name}&page=${moreCategory}&limit=10`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(responseMoreMovie.data.data);
      dispatch({
        type: 'CATEGORY_MORE_DATA',
        payload: responseMoreCategory.data.data.docs,
      });
      dispatch({type: 'SHOW_LOADING_MORE_CATEGORY', payload: false});
      if (responseMoreCategory.data.data.hasNextPage === true) {
        dispatch({
          type: 'SHOW_MORE_CATEGORY',
          payload: responseMoreCategory.data.data.hasNextPage,
        });
        dispatch({
          type: 'PAGE_MOVIE_CATEGORY',
          payload: responseMoreCategory.data.data.nextPage,
        });
        dispatch({type: 'SHOW_LOADING_MORE_CATEGORY', payload: false});
      } else {
        dispatch({type: 'SHOW_LOADING_MORE_CATEGORY', payload: false});
        dispatch({type: 'SHOW_MORE_CATEGORY', payload: false});
      }
    } catch (e) {
      console.log('error get data movie', e);
    }
  };
};

export const getAllMovies = () => {
  return async dispatch => {
    try {
      dispatch({type: 'SHOW_LOADING_SEARCH', payload: true});
      dispatch({type: 'ALL_MOVIES', payload: {}});
      const getAllMovies = await Axios.get(
        `https://yang-keren-gitu-napa.herokuapp.com/api/v1/movies`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(getAllMovies.data);
      let arrCatch = [];
      if (getAllMovies.data.data.totalPages > 1) {
        let pageCounter = getAllMovies.data.data.totalPages;
        for (let i = 1; i <= pageCounter; i++) {
          const getNextAllMovies = await Axios.get(
            `https://yang-keren-gitu-napa.herokuapp.com/api/v1/movies?page=${i}&limit=10`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          console.log(getNextAllMovies.data.data.docs);
          arrCatch.push(...getNextAllMovies.data.data.docs);
        }
        console.log(arrCatch);
        dispatch({
          type: 'ALL_MOVIES',
          payload: arrCatch,
        });
        dispatch({type: 'SHOW_LOADING_SEARCH', payload: false});
      } else {
        dispatch({type: 'SHOW_LOADING_SEARCH', payload: false});
        dispatch({
          type: 'ALL_MOVIES',
          payload: getAllMovies.data.data.docs,
        });
      }
    } catch (e) {
      dispatch({type: 'SHOW_LOADING_SEARCH', payload: false});
      console.log('error get all data movie', e);
    }
  };
};
