import {combineReducers} from 'redux'
import  data from './peopleReducer'


export default combineReducers({
    data: data('people'),
    homeWorld: data('homeworld'),
    films: data('films')
})
