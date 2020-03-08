import {combineReducers} from 'redux'
import  data from './peopleReducer'
import authReducer from './authReducer'
import favoritesReducer from './favoritesReducer'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

export default combineReducers({
    auth: authReducer,
    data: data('people'),
    homeWorld: data('homeworld'),
    films: data('films'),
    favorites: favoritesReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})
