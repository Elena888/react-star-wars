import {combineReducers} from 'redux'
import  data from './peopleReducer'
import authReducer from './authReducer'
import { firebaseReducer } from 'react-redux-firebase'

export default combineReducers({
    auth: authReducer,
    data: data('people'),
    homeWorld: data('homeworld'),
    films: data('films'),
    firebase: firebaseReducer
})
