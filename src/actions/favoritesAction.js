import {
  ADD_TO_FAVORITES,
  ADD_TO_FAVORITES_ERROR,
  REMOVE_FROM_FAVORITES_SUCCESS,
  REMOVE_FROM_FAVORITES_ERROR,
  FETCH_FAVORITES_ERROR,
  FETCH_FAVORITES_SUCCESS,
  FETCH_REQUEST_FAVORITES
} from './types'

import { requestData } from './functions'

export const addFavorites = (item) => {
  return (dispatch, getState, getFirebase) => {
      const firebase = getFirebase();
      const db = firebase.firestore()

      const userId = getState().firebase.auth.uid;
      const data ={
          name: item.name,
          id: item.id,
          gender: item.gender,
          userId,
          itemId: userId + item.id
      }
      db.collection('favorites').doc(userId + item.id).set(data).then(() => {
         return dispatch({ 
              type: ADD_TO_FAVORITES,
              payload: data
          });
      }).catch(error => {
          return dispatch({ type: ADD_TO_FAVORITES_ERROR }, error);
      });
  }
}

export const removeFavorites = (itemId) => {
  return (dispatch, getState, getFirebase) => {
      const firebase = getFirebase();
      const db = firebase.firestore()
      const userId = getState().firebase.auth.uid;
      db.collection('favorites').doc(userId + itemId).delete().then(() => {
          return dispatch({
              type: REMOVE_FROM_FAVORITES_SUCCESS,
              payload: userId + itemId
          })
      }).catch(error => {
          return dispatch({type: REMOVE_FROM_FAVORITES_ERROR, error})
      });

  }
}

export const fetchFavorites = () => {
  return (dispatch, getState, getFirebase) => {
      dispatch(requestData(FETCH_REQUEST_FAVORITES));
      const firebase = getFirebase();
      const db = firebase.firestore()

      const userId = getState().firebase.auth.uid;
      db.collection("favorites").where("userId", "==", userId)
          .get()
          .then(querySnapshot => {
              const data = []
              querySnapshot.forEach(doc => {
                  //console.log(doc.id, " => ", doc.data());
                  data.push(doc.data())
              });
              return dispatch({
                  type: FETCH_FAVORITES_SUCCESS,
                  payload: data
              })
          })
          .catch(error => {
              return dispatch({
                  type: FETCH_FAVORITES_ERROR,
                  error
              })
          });


  }
}
