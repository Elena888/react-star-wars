
import {
    ADD_TO_FAVORITES,
    ADD_TO_FAVORITES_ERROR,
    REMOVE_FROM_FAVORITES_SUCCESS,
    REMOVE_FROM_FAVORITES_ERROR,
    FETCH_FAVORITES_ERROR,
    FETCH_FAVORITES_SUCCESS,
    FETCH_REQUEST_FAVORITES,
} from '../actions/types'

const initState = {
    data: [],
    error: null,
    loading: false,
}

const favoritesReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_REQUEST_FAVORITES:
            return {...state, loading: true}
        case FETCH_FAVORITES_SUCCESS:
            return {...state, data: action.payload, error: null, loading: false}
        case FETCH_FAVORITES_ERROR:
            return {...state, error: action.error}
        case ADD_TO_FAVORITES:
            return {
                ...state,
                data: [...state.data, action.payload],
                error: null
            };
        case ADD_TO_FAVORITES_ERROR:
            return {...state, error: action.error}
        case REMOVE_FROM_FAVORITES_SUCCESS:            
            return {
                ...state,
                data: state.data.filter(item => item.itemId !== action.payload ),
                error: null
            }
        case REMOVE_FROM_FAVORITES_ERROR:
            return {...state, error: action.error}
        default:
            return state;
    }
};

export default favoritesReducer;

