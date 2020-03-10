import {
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_FAILURE_HOMEWORLD,
  FETCH_SUCCESS_HOMEWORLD,
  FETCH_REQUEST_HOMEWORLD,
  FETCH_FAILURE_FILMS,
  FETCH_REQUEST_FILMS,
  FETCH_SUCCESS_FILMS,
} from './types'

import { requestData, requestError, fetchSuccess } from './functions'
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
