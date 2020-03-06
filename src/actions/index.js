import firebase from "../config/fbConfig";

import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGNOUT_SUCCESS,
  FETCH_SUCCESS, 
  FETCH_FAILURE, 
  FETCH_REQUEST, 
  FETCH_FAILURE_HOMEWORLD, 
  FETCH_SUCCESS_HOMEWORLD, 
  FETCH_REQUEST_HOMEWORLD,
  FETCH_FAILURE_FILMS,
  FETCH_REQUEST_FILMS,
  FETCH_SUCCESS_FILMS,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from './types'

export const signIn = (user) => {
  return (dispatch) => {
    
   
    firebase
    .auth()  
    .signInWithEmailAndPassword(
      user.email,
      user.password
    ).then((res) => {
      console.log('res',res)
      dispatch({ type: SIGN_IN_SUCCESS });
    }).catch((err) => {
      dispatch({ type: SIGN_IN_FAILURE, err });
    });

  }
  
};

export const signOut = () => {
  return (dispatch) => {
   

    firebase.auth().signOut().then(() => {
      console.log('firebaseAuth', firebase)
      dispatch({ type: SIGNOUT_SUCCESS })
    });
  }
}

export const requestError = (type, error) => ({
    type: type,
    error
  });
  
  export const fetchSuccess = (type, data) => {
    return {
      type: type,
      payload: data
    }
  };
  
  export const requestData = (type) => ({
    type: type,
  });
  
  /**
   * Fetch people, fetch hero details action
   */
  export const fetchData = (apiUrl) => {
    return (dispatch) => {
      dispatch(requestData(FETCH_REQUEST));

      return fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                dispatch(fetchSuccess(FETCH_SUCCESS, data));
                return data;
            })
            .catch(error => dispatch(requestError(FETCH_FAILURE, error)))
        }
  }

/**
 * Fetch homeworld data action
 */
  export const fetchDataHomeWorld = (apiUrl) => {
    return (dispatch) => {
      dispatch(requestData(FETCH_REQUEST_HOMEWORLD));

      return fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                dispatch(fetchSuccess(FETCH_SUCCESS_HOMEWORLD, data));
                return data;
            })
            .catch(error => dispatch(requestError(FETCH_FAILURE_HOMEWORLD, error)))
        }
  }

/**
 * Fetch films data action
 */
  export const fetchDataFilms = (arrFilmsUrl) => {
    return (dispatch) => {
      const arr = []
      arrFilmsUrl.map(apiUrl => {
        dispatch(requestData(FETCH_REQUEST_FILMS));
        return fetch(apiUrl)
              .then(res => res.json())
              .then(data => {
                arr.push(data)
                return data;
              })
              .catch(error => dispatch(requestError(FETCH_FAILURE_FILMS, error)))
          })
          dispatch(fetchSuccess(FETCH_SUCCESS_FILMS, arr))  
    }
  }

  /**
   * Add to favorites action
   */
  export const addFavorites = (item) => {
    return dispatch => {
      dispatch({
        type: ADD_TO_FAVORITES,
        payload: item
      })
    }
  }

  export const removeFavorites = (itemUrl) => {
    return dispatch => {
      dispatch({
        type: REMOVE_FROM_FAVORITES,
        payload: itemUrl
      })
    }
  }