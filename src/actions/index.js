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

export const requestError = (error) => ({
    type: FETCH_FAILURE,
    error
  });
  
  export const fetchSuccess = (data) => {
    return {
      type: FETCH_SUCCESS,
      payload: data
    }
  };
  
  export const requestData = () => ({
    type: FETCH_REQUEST,
  });
  
  export const fetchData = (apiUrl) => {
    return (dispatch) => {
      dispatch(requestData());

      return fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                dispatch(fetchSuccess(data));
                return data;
            })
            .catch(error => dispatch(requestError(error)))
        }
  }
/*******************************/
export const requestErrorHomeworld = (error) => ({
    type: FETCH_FAILURE_HOMEWORLD,
    error
  });
  
  export const fetchSuccessHomeworld = (data) => {
    return {
      type: FETCH_SUCCESS_HOMEWORLD,
      payload: data
    }
  };
  
  export const requestDataHomeworld = () => ({
    type: FETCH_REQUEST_HOMEWORLD,
  });
  
  export const fetchDataHomeWorld = (apiUrl) => {
    return (dispatch) => {
      dispatch(requestDataHomeworld());

      return fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                dispatch(fetchSuccessHomeworld(data));
                return data;
            })
            .catch(error => dispatch(requestErrorHomeworld(error)))
        }
  }
/*******************************/
export const requestErrorFilms = (error) => ({
    type: FETCH_FAILURE_FILMS,
    error
  });
  
  export const fetchSuccessFilms = (data) => {
    return {
      type: FETCH_SUCCESS_FILMS,
      payload: data
    }
  };
  
  export const requestDataFilms = () => ({
    type: FETCH_REQUEST_FILMS,
  });
  
  export const fetchDataFilms = (arrFilmsUrl) => {
    return (dispatch) => {
      const arr = []
      arrFilmsUrl.map(apiUrl => {
        dispatch(requestDataFilms());
        return fetch(apiUrl)
              .then(res => res.json())
              .then(data => {
                arr.push(data)
                return data;
              })
              .catch(error => dispatch(requestErrorFilms(error)))
          })
          dispatch(fetchSuccessFilms(arr))  
    }
    
  }