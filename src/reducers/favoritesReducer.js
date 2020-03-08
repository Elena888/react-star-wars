
import {
    ADD_TO_FAVORITES,
    ADD_TO_FAVORITES_ERROR,
    REMOVE_FROM_FAVORITES,
} from '../actions/types'

const initState = {}

const favoritesReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_TO_FAVORITES:
            console.log('ADD_TO_FAVORITES success');
            return state;
        case ADD_TO_FAVORITES_ERROR:
            console.log('ADD_TO_FAVORITES error');
            return state;
        default:
            return state;
    }
};

export default favoritesReducer;

